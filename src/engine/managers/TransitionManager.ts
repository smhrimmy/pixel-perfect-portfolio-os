import gsap from "gsap";

export class GsapTransitionManager implements TransitionManager {
  private isTransitioning = false;
  private currentSection = "";
  private transitionCallbacks: Map<string, () => void> = new Map();

  init(): void {
    // Ready for transitions
  }

  onTransition(section: string, callback: () => void): void {
    this.transitionCallbacks.set(section, callback);
  }

  async transitionTo(section: string, duration = 1.2): Promise<void> {
    if (this.isTransitioning || section === this.currentSection) return;

    this.isTransitioning = true;

    // Fire transition callback
    const callback = this.transitionCallbacks.get(section);
    if (callback) {
      callback();
    }

    // Wait for transition
    await new Promise<void>((resolve) => {
      gsap.delayedCall(duration, resolve);
    });

    this.currentSection = section;
    this.isTransitioning = false;
  }

  getCurrentSection(): string {
    return this.currentSection;
  }

  isCurrentlyTransitioning(): boolean {
    return this.isTransitioning;
  }

  destroy(): void {
    this.transitionCallbacks.clear();
  }
}

interface TransitionManager {
  init(): void;
  onTransition(section: string, callback: () => void): void;
  transitionTo(section: string, duration?: number): Promise<void>;
  getCurrentSection(): string;
  isCurrentlyTransitioning(): boolean;
  destroy(): void;
}
