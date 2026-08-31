import type { PortfolioData } from "../domain/portfolio";

// ============================================================
// CORE THEME CONTRACT
// ============================================================

export interface PortfolioTheme {
  id: string;
  name: string;
  metaphor: string;
  environment: EnvironmentConfig;
  camera: CameraConfig;
  navigation: NavigationConfig;
  hero: HeroConfig;
  projects: ProjectInteractionConfig;
  skills: SkillInteractionConfig;
  experience: ExperienceInteractionConfig;
  contact: ContactInteractionConfig;
  audio: AudioConfig;
  loading: LoadingConfig;
  mobileFallback: MobileFallbackConfig;
  colors: ThemeColors;
}

// ============================================================
// ENVIRONMENT
// ============================================================

export interface EnvironmentConfig {
  /** Background color (hex) */
  backgroundColor: number;
  /** Fog configuration */
  fog?: FogConfig;
  /** Ambient light settings */
  ambientLight: LightConfig;
  /** Directional light settings */
  directionalLight: LightConfig[];
  /** Point lights */
  pointLights?: PointLightConfig[];
  /** Environment objects to spawn */
  objects: EnvironmentObject[];
  /** Floor configuration */
  floor: FloorConfig;
  /** Sky/environment map (optional) */
  environmentMap?: string;
  /** Particle system configuration */
  particles?: ParticleConfig;
}

export interface FogConfig {
  color: number;
  near: number;
  far: number;
}

export interface LightConfig {
  color: number;
  intensity: number;
  position?: [number, number, number];
  castShadow?: boolean;
}

export interface PointLightConfig extends LightConfig {
  distance: number;
  decay: number;
}

export interface EnvironmentObject {
  type: "box" | "sphere" | "cylinder" | "cone" | "plane" | "torus" | "custom";
  position: [number, number, number];
  rotation?: [number, number, number];
  scale: [number, number, number];
  color: number;
  metalness?: number;
  roughness?: number;
  opacity?: number;
  emissive?: number;
  emissiveIntensity?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

export interface FloorConfig {
  type: "grid" | "plane" | "custom";
  color: number;
  size?: number;
  opacity?: number;
}

export interface ParticleConfig {
  count: number;
  color: number;
  size: number;
  speed: number;
  opacity: number;
  spread: number;
}

// ============================================================
// CAMERA
// ============================================================

export interface CameraConfig {
  /** Initial camera position */
  initialPosition: [number, number, number];
  /** Camera look-at target */
  initialTarget: [number, number, number];
  /** Field of view */
  fov: number;
  /** Near clip plane */
  near: number;
  /** Far clip plane */
  far: number;
  /** Camera transition settings */
  transitions: CameraTransitionConfig;
  /** Orbit controls settings */
  orbit?: OrbitConfig;
  /** Auto-rotate settings */
  autoRotate?: AutoRotateConfig;
}

export interface CameraTransitionConfig {
  /** Default transition duration in seconds */
  duration: number;
  /** Default easing function */
  easing: string;
  /** Damping factor for smooth following */
  damping: number;
}

export interface OrbitConfig {
  enabled: boolean;
  enableDamping: boolean;
  dampingFactor: number;
  minDistance: number;
  maxDistance: number;
  minPolarAngle: number;
  maxPolarAngle: number;
  autoRotate: boolean;
  autoRotateSpeed: number;
}

export interface AutoRotateConfig {
  enabled: boolean;
  speed: number;
  /** Positions to cycle through */
  keyframes: CameraKeyframe[];
}

export interface CameraKeyframe {
  position: [number, number, number];
  target: [number, number, number];
  duration: number;
  easing?: string;
}

// ============================================================
// NAVIGATION
// ============================================================

export interface NavigationConfig {
  /** Sections in navigation order */
  sections: NavigationSection[];
  /** Whether to show guided tour on first visit */
  showTourOnFirstVisit: boolean;
  /** Tour waypoints */
  tourWaypoints: TourWaypoint[];
}

export interface NavigationSection {
  id: string;
  name: string;
  /** Camera position when viewing this section */
  cameraPosition: [number, number, number];
  /** Camera target when viewing this section */
  cameraTarget: [number, number, number];
}

export interface TourWaypoint {
  sectionId: string;
  /** Duration to停留 at this waypoint (ms) */
  dwellTime: number;
  /** Description to show */
  description: string;
}

// ============================================================
// HERO
// ============================================================

export interface HeroConfig {
  /** Hero title text */
  title: string;
  /** Hero subtitle */
  subtitle: string;
  /** Camera position for hero */
  cameraPosition: [number, number, number];
  /** Camera target for hero */
  cameraTarget: [number, number, number];
  /** Animation settings */
  animation: HeroAnimation;
}

export interface HeroAnimation {
  type: "fade" | "slide" | "scale" | "rotate" | "custom";
  duration: number;
  delay: number;
}

// ============================================================
// PROJECTS
// ============================================================

export interface ProjectInteractionConfig {
  /** How projects are represented in 3D */
  representation: "card" | "object" | "floating" | "orbital" | "physical";
  /** Layout pattern */
  layout: "grid" | "orbital" | "linear" | "scattered" | "stacked";
  /** Interaction distance */
  interactionDistance: number;
  /** Camera offset when inspecting a project */
  inspectOffset: [number, number, number];
  /** Animation when hovering */
  hoverAnimation: InteractionAnimation;
  /** Animation when selecting */
  selectAnimation: InteractionAnimation;
}

export interface InteractionAnimation {
  type: "scale" | "glow" | "rotate" | "float" | "pulse" | "slide" | "none";
  duration: number;
  intensity: number;
}

// ============================================================
// SKILLS
// ============================================================

export interface SkillInteractionConfig {
  /** How skills are represented */
  representation: "bar" | "orb" | "node" | "card" | "physical";
  /** Layout pattern */
  layout: "grid" | "circular" | "linear" | "clustered";
  /** Whether skills are grouped by category */
  grouped: boolean;
  /** Animation when viewing */
  revealAnimation: InteractionAnimation;
}

// ============================================================
// EXPERIENCE
// ============================================================

export interface ExperienceInteractionConfig {
  /** How experience is represented */
  representation: "timeline" | "cards" | "book" | "drawer" | "path";
  /** Layout pattern */
  layout: "vertical" | "horizontal" | "spiral" | "circular";
  /** Animation for scrolling through experience */
  scrollAnimation: InteractionAnimation;
}

// ============================================================
// CONTACT
// ============================================================

export interface ContactInteractionConfig {
  /** How contact form is represented */
  representation: "form" | "letter" | "terminal" | "physical";
  /** Animation on submit */
  submitAnimation: InteractionAnimation;
  /** Success state visual */
  successVisual: "checkmark" | "stamp" | "animation" | "none";
}

// ============================================================
// AUDIO
// ============================================================

export interface AudioConfig {
  /** Ambient sound settings */
  ambient: AmbientSound;
  /** Interaction sounds */
  interactions: InteractionSounds;
  /** Whether audio starts muted */
  startsMuted: boolean;
}

export interface AmbientSound {
  /** Base frequency for procedural generation */
  baseFrequency: number;
  /** Wave type */
  waveType: "sine" | "triangle" | "sawtooth" | "square";
  /** Volume (0-1) */
  volume: number;
  /** Filter settings */
  filter?: {
    type: "lowpass" | "highpass" | "bandpass";
    frequency: number;
    Q: number;
  };
}

export interface InteractionSounds {
  hover: SoundConfig;
  click: SoundConfig;
  drag: SoundConfig;
  open: SoundConfig;
  close: SoundConfig;
  submit: SoundConfig;
  navigate: SoundConfig;
}

export interface SoundConfig {
  /** Frequency in Hz */
  frequency: number;
  /** Duration in seconds */
  duration: number;
  /** Wave type */
  waveType: "sine" | "triangle" | "sawtooth" | "square";
  /** Volume (0-1) */
  volume: number;
  /** Envelope */
  envelope: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  };
}

// ============================================================
// LOADING
// ============================================================

export interface LoadingConfig {
  /** Loading screen type */
  type: "spinner" | "progress" | "skeleton" | "theme-specific";
  /** Background color during loading */
  backgroundColor: number;
  /** Loading text */
  text: string;
}

// ============================================================
// MOBILE FALLBACK
// ============================================================

export interface MobileFallbackConfig {
  /** Whether to use 2D fallback on mobile */
  use2DFallback: boolean;
  /** Reduced quality settings */
  reducedQuality: {
    pixelRatio: number;
    shadowMapSize: number;
    maxLights: number;
  };
}

// ============================================================
// THEME COLORS
// ============================================================

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

// ============================================================
// RUNTIME TYPES
// ============================================================

export interface ThemeRuntimeState {
  currentTheme: PortfolioTheme | null;
  isLoaded: boolean;
  isLoading: boolean;
  loadingProgress: number;
  currentSection: string;
  isTourActive: boolean;
  tourStep: number;
  isMuted: boolean;
  quality: "low" | "medium" | "high";
}

export interface ThemeContext {
  data: PortfolioData;
  theme: PortfolioTheme;
  state: ThemeRuntimeState;
  managers: {
    audio: AudioManager;
    camera: CameraManager;
    interaction: InteractionManager;
    performance: PerformanceManager;
    persistence: PersistenceManager;
    physics: PhysicsManager;
    transition: TransitionManager;
  };
}

// ============================================================
// MANAGER INTERFACES
// ============================================================

export interface AudioManager {
  init(): void;
  playAmbient(): void;
  stopAmbient(): void;
  playSound(sound: SoundConfig): void;
  setMuted(muted: boolean): void;
  destroy(): void;
}

export interface CameraManager {
  init(config: CameraConfig, camera?: any): void;
  flyTo(position: [number, number, number], target: [number, number, number], duration?: number): void;
  flyToKeyframe?(keyframe: CameraKeyframe): void;
  reset(): void;
  startAutoRotate?(keyframes: CameraKeyframe[]): void;
  stopAutoRotate?(): void;
  update(delta?: number): void;
  destroy(): void;
}

export interface InteractionManager {
  init(canvas?: HTMLCanvasElement, camera?: any, scene?: any): void;
  addInteractable?(object: any): void;
  removeInteractable?(object: any): void;
  clearInteractables?(): void;
  onHover(callback: (objectId: string | null) => void): void;
  onClick(callback: (objectId: string) => void): void;
  onDrag(callback: (objectId: string, delta: { x: number; y: number }) => void): void;
  destroy(): void;
}

export interface PerformanceManager {
  init(): void;
  recordFrameTime?(): void;
  getQuality(): "low" | "medium" | "high";
  setQuality(quality: "low" | "medium" | "high"): void;
  enableAutoAdapt?(): void;
  getPixelRatio(): number;
  shouldRenderShadows(): boolean;
  shouldEnablePostProcessing?(): boolean;
  getMaxLights(): number;
  getParticleMultiplier?(): number;
  getSettings?(): any;
  destroy(): void;
}

export interface PersistenceManager {
  init(themeId: string): void;
  hasSeenTour(): boolean;
  markTourSeen(): void;
  getTourStep(): number;
  setTourStep(step: number): void;
  getPreference(key: string): unknown;
  setPreference(key: string, value: unknown): void;
  destroy(): void;
}

export interface PhysicsManager {
  init(): void;
  update(delta: number): void;
  destroy(): void;
}

export interface TransitionManager {
  init(): void;
  transitionTo(section: string, duration?: number): Promise<void>;
  destroy(): void;
}
