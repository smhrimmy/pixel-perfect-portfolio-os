// Core Types
export type {
  PortfolioTheme,
  ThemeColors,
  EnvironmentConfig,
  CameraConfig,
  NavigationConfig,
  HeroConfig,
  ProjectInteractionConfig,
  SkillInteractionConfig,
  ExperienceInteractionConfig,
  ContactInteractionConfig,
  AudioConfig,
  SoundConfig,
  LoadingConfig,
  MobileFallbackConfig,
  ThemeRuntimeState,
} from "./types";

// Runtime
export { ThemeRuntime } from "./ThemeRuntime";

// Managers
export { ProceduralAudioManager } from "./managers/AudioManager";
export { ThreeCameraManager } from "./managers/CameraManager";
export { ThreeInteractionManager } from "./managers/InteractionManager";
export { AdaptivePerformanceManager } from "./managers/PerformanceManager";
export { LocalPersistenceManager } from "./managers/PersistenceManager";
export { SimplePhysicsManager } from "./managers/PhysicsManager";
export { GsapTransitionManager } from "./managers/TransitionManager";

// Components
export { ThemeWorld } from "./components/ThemeWorld";
export { PortfolioWorld } from "./components/PortfolioWorld";
export { ThemeLoader } from "./components/ThemeLoader";
export { GuidedTour } from "./components/GuidedTour";
export { ProjectInspector } from "./components/ProjectInspector";

// Themes
export { allThemes, themeMap, getThemeById } from "./themes/configs";
