import type {
  PortfolioTheme,
  ThemeRuntimeState,
  AudioManager,
  CameraManager,
  InteractionManager,
  PerformanceManager,
  PersistenceManager,
  PhysicsManager,
  TransitionManager,
} from "./types";
import type { PortfolioData } from "../domain/portfolio";
import { ProceduralAudioManager } from "./managers/AudioManager";
import { ThreeCameraManager } from "./managers/CameraManager";
import { ThreeInteractionManager } from "./managers/InteractionManager";
import { AdaptivePerformanceManager } from "./managers/PerformanceManager";
import { LocalPersistenceManager } from "./managers/PersistenceManager";
import { SimplePhysicsManager } from "./managers/PhysicsManager";
import { GsapTransitionManager } from "./managers/TransitionManager";

export class ThemeRuntime {
  private state: ThemeRuntimeState = {
    currentTheme: null,
    isLoaded: false,
    isLoading: false,
    loadingProgress: 0,
    currentSection: "hero",
    isTourActive: false,
    tourStep: 0,
    isMuted: true,
    quality: "high",
  };

  private managers = {
    audio: null as unknown as AudioManager,
    camera: null as unknown as CameraManager,
    interaction: null as unknown as InteractionManager,
    performance: null as unknown as PerformanceManager,
    persistence: null as unknown as PersistenceManager,
    physics: null as unknown as PhysicsManager,
    transition: null as unknown as TransitionManager,
  };

  private data: PortfolioData;
  private stateListeners: Set<(state: ThemeRuntimeState) => void> = new Set();

  constructor(data: PortfolioData) {
    this.data = data;
  }

  getState(): ThemeRuntimeState {
    return { ...this.state };
  }

  subscribe(listener: (state: ThemeRuntimeState) => void): () => void {
    this.stateListeners.add(listener);
    return () => this.stateListeners.delete(listener);
  }

  private notifyStateChange(): void {
    this.stateListeners.forEach((listener) => listener({ ...this.state }));
  }

  async loadTheme(theme: PortfolioTheme): Promise<void> {
    this.state.isLoading = true;
    this.state.loadingProgress = 0;
    this.notifyStateChange();

    // Initialize managers
    this.managers.audio = new ProceduralAudioManager(theme.audio);
    this.managers.camera = new ThreeCameraManager();
    this.managers.interaction = new ThreeInteractionManager();
    this.managers.performance = new AdaptivePerformanceManager();
    this.managers.persistence = new LocalPersistenceManager(theme.id);
    this.managers.physics = new SimplePhysicsManager();
    this.managers.transition = new GsapTransitionManager();

    // Initialize each manager
    this.managers.performance.init();
    this.managers.persistence.init(theme.id);
    this.managers.physics.init();
    this.managers.transition.init();

    this.state.loadingProgress = 50;
    this.notifyStateChange();

    // Initialize audio (requires user gesture)
    this.managers.audio.init();

    this.state.currentTheme = theme;
    this.state.isLoaded = true;
    this.state.isLoading = false;
    this.state.loadingProgress = 100;
    this.state.quality = this.managers.performance.getQuality();
    this.notifyStateChange();
  }

  getManagers() {
    return this.managers;
  }

  getData(): PortfolioData {
    return this.data;
  }

  setData(data: PortfolioData): void {
    this.data = data;
  }

  toggleMute(): void {
    this.state.isMuted = !this.state.isMuted;
    this.managers.audio?.setMuted(this.state.isMuted);
    this.notifyStateChange();
  }

  startTour(): void {
    this.state.isTourActive = true;
    this.state.tourStep = 0;
    this.managers.persistence?.markTourSeen();
    this.notifyStateChange();
  }

  nextTourStep(): void {
    this.state.tourStep++;
    this.managers.persistence?.setTourStep(this.state.tourStep);
    this.notifyStateChange();
  }

  endTour(): void {
    this.state.isTourActive = false;
    this.managers.persistence?.markTourSeen();
    this.notifyStateChange();
  }

  navigateTo(section: string): void {
    this.state.currentSection = section;
    this.notifyStateChange();
  }

  destroy(): void {
    Object.values(this.managers).forEach((manager) => {
      manager?.destroy();
    });
    this.stateListeners.clear();
  }
}
