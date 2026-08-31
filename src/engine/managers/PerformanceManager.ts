type QualityLevel = "low" | "medium" | "high";

interface QualitySettings {
  pixelRatio: number;
  shadowMapSize: number;
  maxLights: number;
  enablePostProcessing: boolean;
  enableShadows: boolean;
  particleMultiplier: number;
}

const QUALITY_PRESETS: Record<QualityLevel, QualitySettings> = {
  low: {
    pixelRatio: 1,
    shadowMapSize: 512,
    maxLights: 2,
    enablePostProcessing: false,
    enableShadows: false,
    particleMultiplier: 0.25,
  },
  medium: {
    pixelRatio: 1.5,
    shadowMapSize: 1024,
    maxLights: 4,
    enablePostProcessing: true,
    enableShadows: true,
    particleMultiplier: 0.5,
  },
  high: {
    pixelRatio: 2,
    shadowMapSize: 2048,
    maxLights: 8,
    enablePostProcessing: true,
    enableShadows: true,
    particleMultiplier: 1,
  },
};

export class AdaptivePerformanceManager implements PerformanceManager {
  private quality: QualityLevel = "high";
  private frameTimeSamples: number[] = [];
  private lastFrameTime = 0;
  private autoAdapt = true;
  private adaptInterval: ReturnType<typeof setInterval> | null = null;

  init(): void {
    // Detect initial quality from device
    this.quality = this.detectInitialQuality();
    this.lastFrameTime = performance.now();

    // Start frame time monitoring
    this.startMonitoring();
  }

  private detectInitialQuality(): QualityLevel {
    const gl = document.createElement("canvas").getContext("webgl2");
    if (!gl) return "low";

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : "";

    // Heuristic: check GPU vendor and memory
    const isMobile =
      /Mobi|Android/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 0 && window.innerWidth < 1024);

    if (isMobile) return "medium";

    // Check for high-end GPU indicators
    const highEnd =
      /RTX|GTX|RX|Apple|Adreno 7|Xclipse/i.test(renderer) ||
      navigator.hardwareConcurrency >= 8;

    return highEnd ? "high" : "medium";
  }

  private startMonitoring(): void {
    // Monitor frame times every 2 seconds
    this.adaptInterval = setInterval(() => {
      if (!this.autoAdapt) return;

      const avgFrameTime =
        this.frameTimeSamples.reduce((a, b) => a + b, 0) /
        this.frameTimeSamples.length;

      // Target 33ms for 30fps, 16ms for 60fps
      if (avgFrameTime > 40 && this.quality !== "low") {
        // Performance is poor, downgrade
        this.quality =
          this.quality === "high" ? "medium" : "low";
        console.log(`[Performance] Downgraded to ${this.quality}`);
      } else if (avgFrameTime < 14 && this.quality !== "high") {
        // Performance is great, upgrade
        this.quality =
          this.quality === "low" ? "medium" : "high";
        console.log(`[Performance] Upgraded to ${this.quality}`);
      }

      this.frameTimeSamples = [];
    }, 2000);
  }

  recordFrameTime(): void {
    const now = performance.now();
    const delta = now - this.lastFrameTime;
    this.lastFrameTime = now;
    this.frameTimeSamples.push(delta);

    // Keep only last 60 samples
    if (this.frameTimeSamples.length > 60) {
      this.frameTimeSamples.shift();
    }
  }

  getQuality(): QualityLevel {
    return this.quality;
  }

  getSettings(): QualitySettings {
    return QUALITY_PRESETS[this.quality];
  }

  setQuality(quality: QualityLevel): void {
    this.quality = quality;
    this.autoAdapt = false; // Manual override disables auto-adapt
  }

  enableAutoAdapt(): void {
    this.autoAdapt = true;
  }

  getPixelRatio(): number {
    return QUALITY_PRESETS[this.quality].pixelRatio;
  }

  shouldRenderShadows(): boolean {
    return QUALITY_PRESETS[this.quality].enableShadows;
  }

  shouldEnablePostProcessing(): boolean {
    return QUALITY_PRESETS[this.quality].enablePostProcessing;
  }

  getMaxLights(): number {
    return QUALITY_PRESETS[this.quality].maxLights;
  }

  getParticleMultiplier(): number {
    return QUALITY_PRESETS[this.quality].particleMultiplier;
  }

  destroy(): void {
    if (this.adaptInterval) {
      clearInterval(this.adaptInterval);
      this.adaptInterval = null;
    }
  }
}

interface PerformanceManager {
  init(): void;
  recordFrameTime(): void;
  getQuality(): QualityLevel;
  getSettings(): QualitySettings;
  setQuality(quality: QualityLevel): void;
  enableAutoAdapt(): void;
  getPixelRatio(): number;
  shouldRenderShadows(): boolean;
  shouldEnablePostProcessing(): boolean;
  getMaxLights(): number;
  getParticleMultiplier(): number;
  destroy(): void;
}
