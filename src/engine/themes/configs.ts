import type { PortfolioTheme } from "../types";

// ============================================================
// SHARED HELPERS
// ============================================================

const defaultCamera = (pos: [number, number, number], target: [number, number, number]) => ({
  initialPosition: pos,
  initialTarget: target,
  fov: 60,
  near: 0.1,
  far: 100,
  transitions: { duration: 1.2, easing: "power3.inOut", damping: 0.95 },
  orbit: {
    enabled: true,
    enableDamping: true,
    dampingFactor: 0.05,
    minDistance: 3,
    maxDistance: 20,
    minPolarAngle: 0.3,
    maxPolarAngle: Math.PI / 2 - 0.1,
    autoRotate: false,
    autoRotateSpeed: 0.5,
  },
});

const defaultProjectConfig = (rep: "card" | "object" | "floating" | "orbital" | "physical" = "card") => ({
  representation: rep,
  layout: "grid" as const,
  interactionDistance: 5,
  inspectOffset: [0, 1, 3] as [number, number, number],
  hoverAnimation: { type: "scale" as const, duration: 0.3, intensity: 1.1 },
  selectAnimation: { type: "scale" as const, duration: 0.4, intensity: 1.2 },
});

const defaultSkillConfig = (rep: "bar" | "orb" | "node" | "card" | "physical" = "bar") => ({
  representation: rep,
  layout: "grid" as const,
  grouped: true,
  revealAnimation: { type: "scale" as const, duration: 0.5, intensity: 1 },
});

const defaultExperienceConfig = (rep: "timeline" | "cards" | "book" | "drawer" | "path" = "timeline") => ({
  representation: rep,
  layout: "vertical" as const,
  scrollAnimation: { type: "slide" as const, duration: 0.3, intensity: 1 },
});

const defaultContactConfig = (rep: "form" | "letter" | "terminal" | "physical" = "form") => ({
  representation: rep,
  submitAnimation: { type: "scale" as const, duration: 0.5, intensity: 1 },
  successVisual: "checkmark" as const,
});

const defaultLoading = (bg: number) => ({
  type: "theme-specific" as const,
  backgroundColor: bg,
  text: "Entering world...",
});

const defaultMobile = () => ({
  use2DFallback: false,
  reducedQuality: { pixelRatio: 1, shadowMapSize: 512, maxLights: 2 },
});

const defaultTour = (waypoints: { sectionId: string; description: string }[]) => ({
  sections: [
    { id: "hero", name: "Hero", cameraPosition: [0, 2, 5] as [number, number, number], cameraTarget: [0, 0, 0] as [number, number, number] },
    { id: "projects", name: "Projects", cameraPosition: [5, 2, 5] as [number, number, number], cameraTarget: [3, 0, 0] as [number, number, number] },
    { id: "skills", name: "Skills", cameraPosition: [-5, 2, 5] as [number, number, number], cameraTarget: [-3, 0, 0] as [number, number, number] },
    { id: "experience", name: "Experience", cameraPosition: [0, 2, -5] as [number, number, number], cameraTarget: [0, 0, -3] as [number, number, number] },
    { id: "contact", name: "Contact", cameraPosition: [0, 3, 0] as [number, number, number], cameraTarget: [0, 0, 0] as [number, number, number] },
  ],
  showTourOnFirstVisit: true,
  tourWaypoints: waypoints.map((w) => ({ ...w, dwellTime: 3000 })),
});

// ============================================================
// 1. THE WORKSHOP
// ============================================================

const workshop: PortfolioTheme = {
  id: "the-workshop",
  name: "The Workshop",
  metaphor: "Master craftsman's workbench",
  colors: {
    primary: "#D4A574",
    secondary: "#8B6914",
    accent: "#C7A252",
    background: "#1a1410",
    surface: "#2a2018",
    text: "#F5E6D3",
    textMuted: "#A89078",
    border: "#3D2E1E",
    success: "#7CB342",
    warning: "#FFB74D",
    error: "#E57373",
  },
  environment: {
    backgroundColor: 0x1a1410,
    fog: { color: 0x1a1410, near: 8, far: 25 },
    ambientLight: { color: 0xF5E6D3, intensity: 0.3 },
    directionalLight: [
      { color: 0xFFE4B5, intensity: 1.2, position: [5, 8, 3], castShadow: true },
      { color: 0xD4A574, intensity: 0.4, position: [-3, 5, -2] },
    ],
    pointLights: [
      { color: 0xFFD700, intensity: 0.8, position: [0, 3, 0], distance: 8, decay: 2 },
    ],
    objects: [
      // Workbench
      { type: "box", position: [0, 0.4, 0], scale: [4, 0.1, 2], color: 0x5C3A1E, roughness: 0.8, metalness: 0.1, castShadow: true, receiveShadow: true },
      // Workbench legs
      { type: "box", position: [-1.8, 0, -0.8], scale: [0.1, 0.8, 0.1], color: 0x4A2E14, roughness: 0.9 },
      { type: "box", position: [1.8, 0, -0.8], scale: [0.1, 0.8, 0.1], color: 0x4A2E14, roughness: 0.9 },
      { type: "box", position: [-1.8, 0, 0.8], scale: [0.1, 0.8, 0.1], color: 0x4A2E14, roughness: 0.9 },
      { type: "box", position: [1.8, 0, 0.8], scale: [0.1, 0.8, 0.1], color: 0x4A2E14, roughness: 0.9 },
      // Pegboard on wall
      { type: "box", position: [0, 2, -2], scale: [3, 2, 0.05], color: 0x3D2E1E, roughness: 0.9 },
      // Hanging bulb
      { type: "cylinder", position: [0, 3.5, 0], scale: [0.15, 0.3, 0.15], color: 0xFFE4B5, emissive: 0xFFE4B5, emissiveIntensity: 0.5, roughness: 0.3, metalness: 0.8 },
      // Glass jar
      { type: "cylinder", position: [1.5, 0.55, 0.3], scale: [0.2, 0.3, 0.2], color: 0x88CCFF, opacity: 0.4, roughness: 0.1, metalness: 0.3 },
      // Blueprint papers
      { type: "plane", position: [-0.5, 0.5, 0.5], rotation: [-Math.PI / 2, 0, 0.2], scale: [0.8, 1.1, 1], color: 0xADD8E6, roughness: 0.95 },
      { type: "plane", position: [0.8, 0.5, -0.3], rotation: [-Math.PI / 2, 0, -0.1], scale: [0.6, 0.8, 1], color: 0xB0E0E6, roughness: 0.95 },
    ],
    floor: { type: "plane", color: 0x2A1F14, size: 30, opacity: 1 },
    particles: { count: 50, color: 0xFFE4B5, size: 0.02, speed: 0.3, opacity: 0.4, spread: 8 },
  },
  camera: {
    ...defaultCamera([4, 3, 5], [0, 1, 0]),
    orbit: { ...defaultCamera([4, 3, 5], [0, 1, 0]).orbit!, autoRotate: true, autoRotateSpeed: 0.3 },
  },
  navigation: defaultTour([
    { sectionId: "hero", description: "Welcome to the Workshop — where ideas are forged." },
    { sectionId: "projects", description: "Each project is a blueprint on the workbench." },
    { sectionId: "skills", description: "Tools on the pegboard represent technical expertise." },
    { sectionId: "experience", description: "Drawers reveal career milestones." },
    { sectionId: "contact", description: "Submit a work order to get in touch." },
  ]),
  hero: { title: "THE WORKSHOP", subtitle: "Where Craft Meets Code", cameraPosition: [4, 3, 5], cameraTarget: [0, 1, 0], animation: { type: "fade", duration: 1, delay: 0.5 } },
  projects: defaultProjectConfig("card"),
  skills: defaultSkillConfig("physical"),
  experience: defaultExperienceConfig("drawer"),
  contact: defaultContactConfig("physical"),
  audio: {
    ambient: { baseFrequency: 80, waveType: "sine", volume: 0.1, filter: { type: "lowpass", frequency: 200, Q: 1 } },
    interactions: {
      hover: { frequency: 440, duration: 0.1, waveType: "sine", volume: 0.2, envelope: { attack: 0.01, decay: 0.05, sustain: 0.3, release: 0.04 } },
      click: { frequency: 880, duration: 0.15, waveType: "triangle", volume: 0.3, envelope: { attack: 0.01, decay: 0.08, sustain: 0.2, release: 0.06 } },
      drag: { frequency: 220, duration: 0.2, waveType: "sawtooth", volume: 0.15, envelope: { attack: 0.02, decay: 0.1, sustain: 0.4, release: 0.08 } },
      open: { frequency: 660, duration: 0.3, waveType: "sine", volume: 0.25, envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.19 } },
      close: { frequency: 330, duration: 0.2, waveType: "sine", volume: 0.2, envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.09 } },
      submit: { frequency: 523, duration: 0.4, waveType: "triangle", volume: 0.3, envelope: { attack: 0.01, decay: 0.15, sustain: 0.4, release: 0.24 } },
      navigate: { frequency: 440, duration: 0.2, waveType: "sine", volume: 0.2, envelope: { attack: 0.01, decay: 0.08, sustain: 0.3, release: 0.11 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0x1a1410),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 2. THE OBSERVATORY
// ============================================================

const observatory: PortfolioTheme = {
  id: "the-observatory",
  name: "The Observatory",
  metaphor: "1890s brass astronomical observatory",
  colors: {
    primary: "#C9A84C",
    secondary: "#1A1A3E",
    accent: "#FFD700",
    background: "#0A0A1A",
    surface: "#12122A",
    text: "#E8E8F0",
    textMuted: "#7878A0",
    border: "#2A2A4A",
    success: "#4CAF50",
    warning: "#FFC107",
    error: "#F44336",
  },
  environment: {
    backgroundColor: 0x0A0A1A,
    fog: { color: 0x0A0A1A, near: 10, far: 30 },
    ambientLight: { color: 0x404080, intensity: 0.2 },
    directionalLight: [
      { color: 0xFFD700, intensity: 0.8, position: [0, 10, 0], castShadow: true },
      { color: 0x6060C0, intensity: 0.3, position: [-5, 3, -5] },
    ],
    pointLights: [
      { color: 0xFFD700, intensity: 0.6, position: [0, 4, 0], distance: 12, decay: 2 },
      { color: 0x4040FF, intensity: 0.3, position: [-3, 2, 3], distance: 8, decay: 2 },
    ],
    objects: [
      // Dome structure
      { type: "sphere", position: [0, 3, 0], scale: [6, 3, 6], color: 0x1A1A3E, opacity: 0.3, roughness: 0.2, metalness: 0.8 },
      // Telescope base
      { type: "cylinder", position: [0, 0.5, 0], scale: [1.5, 1, 1.5], color: 0x8B7355, roughness: 0.4, metalness: 0.6 },
      // Telescope tube
      { type: "cylinder", position: [0, 2.5, 0], scale: [0.3, 3, 0.3], color: 0xC9A84C, roughness: 0.3, metalness: 0.7, rotation: [0.5, 0, 0] },
      // Orrery rings
      { type: "torus", position: [2, 1.5, 0], scale: [1, 1, 0.05], color: 0xC9A84C, roughness: 0.2, metalness: 0.8 },
      { type: "torus", position: [2, 1.5, 0], scale: [0.7, 0.7, 0.05], color: 0xA08030, roughness: 0.2, metalness: 0.8, rotation: [0.3, 0, 0] },
      // Star chart table
      { type: "cylinder", position: [-2, 0.3, 1], scale: [1.2, 0.6, 1.2], color: 0x5C3A1E, roughness: 0.7 },
      // Floor tiles
      { type: "plane", position: [0, 0.01, 0], rotation: [-Math.PI / 2, 0, 0], scale: [15, 15, 1], color: 0x2A2A4A, roughness: 0.6 },
    ],
    floor: { type: "plane", color: 0x12122A, size: 40 },
    particles: { count: 200, color: 0xFFFFFF, size: 0.03, speed: 0.1, opacity: 0.8, spread: 30 },
  },
  camera: {
    ...defaultCamera([6, 4, 6], [0, 1.5, 0]),
    orbit: { ...defaultCamera([6, 4, 6], [0, 1.5, 0]).orbit!, autoRotate: true, autoRotateSpeed: 0.2 },
  },
  navigation: defaultTour([
    { sectionId: "hero", description: "Welcome to the Observatory — gaze upon the stars." },
    { sectionId: "projects", description: "Each project is a celestial body in the orrery." },
    { sectionId: "skills", description: "Stars form constellations of technical expertise." },
    { sectionId: "experience", description: "The astrolabe reveals career history." },
    { sectionId: "contact", description: "Send an astronomical telegram." },
  ]),
  hero: { title: "THE OBSERVATORY", subtitle: "Mapping the Digital Cosmos", cameraPosition: [6, 4, 6], cameraTarget: [0, 1.5, 0], animation: { type: "fade", duration: 1.5, delay: 0.5 } },
  projects: defaultProjectConfig("orbital"),
  skills: defaultSkillConfig("orb"),
  experience: defaultExperienceConfig("timeline"),
  contact: defaultContactConfig("letter"),
  audio: {
    ambient: { baseFrequency: 60, waveType: "sine", volume: 0.08, filter: { type: "lowpass", frequency: 150, Q: 1 } },
    interactions: {
      hover: { frequency: 523, duration: 0.15, waveType: "sine", volume: 0.15, envelope: { attack: 0.02, decay: 0.08, sustain: 0.2, release: 0.05 } },
      click: { frequency: 784, duration: 0.2, waveType: "sine", volume: 0.2, envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.09 } },
      drag: { frequency: 330, duration: 0.25, waveType: "triangle", volume: 0.1, envelope: { attack: 0.02, decay: 0.1, sustain: 0.4, release: 0.13 } },
      open: { frequency: 660, duration: 0.35, waveType: "sine", volume: 0.2, envelope: { attack: 0.01, decay: 0.12, sustain: 0.5, release: 0.22 } },
      close: { frequency: 440, duration: 0.25, waveType: "sine", volume: 0.15, envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.14 } },
      submit: { frequency: 880, duration: 0.5, waveType: "sine", volume: 0.25, envelope: { attack: 0.01, decay: 0.15, sustain: 0.5, release: 0.34 } },
      navigate: { frequency: 523, duration: 0.2, waveType: "sine", volume: 0.15, envelope: { attack: 0.01, decay: 0.08, sustain: 0.3, release: 0.11 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0x0A0A1A),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 3. THE TOY CHEST
// ============================================================

const toyChest: PortfolioTheme = {
  id: "the-toy-chest",
  name: "The Toy Chest",
  metaphor: "Handcrafted wooden toy world",
  colors: {
    primary: "#E8A87C",
    secondary: "#41B3A3",
    accent: "#C38D9E",
    background: "#FDF6EC",
    surface: "#FFFFFF",
    text: "#2D2D2D",
    textMuted: "#888888",
    border: "#E0D5C5",
    success: "#41B3A3",
    warning: "#E8A87C",
    error: "#E27D60",
  },
  environment: {
    backgroundColor: 0xFDF6EC,
    ambientLight: { color: 0xFFF8F0, intensity: 0.5 },
    directionalLight: [
      { color: 0xFFE4B5, intensity: 1, position: [5, 8, 5], castShadow: true },
      { color: 0xFFD700, intensity: 0.3, position: [-3, 5, 3] },
    ],
    objects: [
      // Cedar chest
      { type: "box", position: [0, 0.4, 0], scale: [3, 0.8, 2], color: 0x8B6914, roughness: 0.7, metalness: 0.1, castShadow: true },
      // Chest lid (open)
      { type: "box", position: [0, 1, -0.8], scale: [3, 0.1, 2], color: 0x9B7924, roughness: 0.7, rotation: [0.5, 0, 0] },
      // Wooden blocks
      { type: "box", position: [-1, 0.7, 0.5], scale: [0.4, 0.4, 0.4], color: 0xE27D60, roughness: 0.6 },
      { type: "box", position: [0.5, 0.7, -0.3], scale: [0.3, 0.5, 0.3], color: 0x41B3A3, roughness: 0.6 },
      { type: "box", position: [1, 0.7, 0.2], scale: [0.35, 0.35, 0.35], color: 0xC38D9E, roughness: 0.6 },
      // Toy train track (circle)
      { type: "torus", position: [-2, 0.1, 2], scale: [1.5, 1.5, 0.05], color: 0x8B4513, roughness: 0.8 },
      // Toy blocks scattered
      { type: "box", position: [2, 0.25, 1], scale: [0.5, 0.5, 0.5], color: 0xFFD700, roughness: 0.5 },
      { type: "sphere", position: [-2.5, 0.3, -1], scale: [0.3, 0.3, 0.3], color: 0xFF6B6B, roughness: 0.4 },
      // Miniature village houses
      { type: "box", position: [-1.5, 0.5, -2], scale: [0.6, 0.8, 0.6], color: 0xE8A87C, roughness: 0.7 },
      { type: "cone", position: [-1.5, 1.1, -2], scale: [0.5, 0.4, 0.5], color: 0xE27D60, roughness: 0.6 },
      { type: "box", position: [1.5, 0.4, -2.5], scale: [0.5, 0.6, 0.5], color: 0x41B3A3, roughness: 0.7 },
      { type: "cone", position: [1.5, 0.85, -2.5], scale: [0.4, 0.3, 0.4], color: 0xC38D9E, roughness: 0.6 },
    ],
    floor: { type: "plane", color: 0xF5E6D3, size: 30 },
    particles: { count: 30, color: 0xFFD700, size: 0.04, speed: 0.5, opacity: 0.6, spread: 10 },
  },
  camera: defaultCamera([4, 3, 5], [0, 0.8, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Open the toy chest — a world of playful discovery awaits." },
    { sectionId: "projects", description: "Each project is a miniature diorama." },
    { sectionId: "skills", description: "Stack wooden blocks of technology." },
    { sectionId: "experience", description: "The toy train travels through time." },
    { sectionId: "contact", description: "Wind up the mailbox to send a message." },
  ]),
  hero: { title: "THE TOY CHEST", subtitle: "Playful Engineering", cameraPosition: [4, 3, 5], cameraTarget: [0, 0.8, 0], animation: { type: "scale", duration: 0.8, delay: 0.3 } },
  projects: defaultProjectConfig("physical"),
  skills: defaultSkillConfig("physical"),
  experience: defaultExperienceConfig("path"),
  contact: defaultContactConfig("physical"),
  audio: {
    ambient: { baseFrequency: 120, waveType: "triangle", volume: 0.08, filter: { type: "lowpass", frequency: 300, Q: 1 } },
    interactions: {
      hover: { frequency: 660, duration: 0.08, waveType: "triangle", volume: 0.2, envelope: { attack: 0.01, decay: 0.04, sustain: 0.2, release: 0.03 } },
      click: { frequency: 880, duration: 0.12, waveType: "sine", volume: 0.25, envelope: { attack: 0.01, decay: 0.06, sustain: 0.3, release: 0.05 } },
      drag: { frequency: 440, duration: 0.15, waveType: "triangle", volume: 0.15, envelope: { attack: 0.01, decay: 0.07, sustain: 0.3, release: 0.07 } },
      open: { frequency: 523, duration: 0.25, waveType: "sine", volume: 0.2, envelope: { attack: 0.01, decay: 0.1, sustain: 0.4, release: 0.14 } },
      close: { frequency: 392, duration: 0.2, waveType: "sine", volume: 0.15, envelope: { attack: 0.01, decay: 0.08, sustain: 0.3, release: 0.11 } },
      submit: { frequency: 784, duration: 0.3, waveType: "sine", volume: 0.25, envelope: { attack: 0.01, decay: 0.12, sustain: 0.4, release: 0.17 } },
      navigate: { frequency: 523, duration: 0.15, waveType: "triangle", volume: 0.2, envelope: { attack: 0.01, decay: 0.06, sustain: 0.3, release: 0.08 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0xFDF6EC),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 4. THE RESERVOIR
// ============================================================

const reservoir: PortfolioTheme = {
  id: "the-reservoir",
  name: "The Reservoir",
  metaphor: "Moonlit reflective water basin",
  colors: {
    primary: "#7EC8E3",
    secondary: "#1B2838",
    accent: "#00D4AA",
    background: "#0A1628",
    surface: "#132238",
    text: "#E0F0FF",
    textMuted: "#6090B0",
    border: "#1E3A5F",
    success: "#00D4AA",
    warning: "#FFB347",
    error: "#FF6B6B",
  },
  environment: {
    backgroundColor: 0x0A1628,
    fog: { color: 0x0A1628, near: 5, far: 20 },
    ambientLight: { color: 0x4060A0, intensity: 0.25 },
    directionalLight: [
      { color: 0xC0D0FF, intensity: 0.6, position: [0, 10, 5], castShadow: true },
      { color: 0x00D4AA, intensity: 0.2, position: [-5, 3, 0] },
    ],
    pointLights: [
      { color: 0x7EC8E3, intensity: 0.4, position: [0, 2, 0], distance: 10, decay: 2 },
      { color: 0x00D4AA, intensity: 0.3, position: [3, 1, -2], distance: 6, decay: 2 },
    ],
    objects: [
      // Water surface (reflective plane)
      { type: "plane", position: [0, 0, 0], rotation: [-Math.PI / 2, 0, 0], scale: [30, 30, 1], color: 0x0A2040, opacity: 0.8, metalness: 0.9, roughness: 0.1 },
      // Stepping stones
      { type: "cylinder", position: [-2, 0.15, 2], scale: [0.8, 0.3, 0.8], color: 0x3A5070, roughness: 0.6, metalness: 0.2 },
      { type: "cylinder", position: [0, 0.15, 0], scale: [1, 0.3, 1], color: 0x4A6080, roughness: 0.6, metalness: 0.2 },
      { type: "cylinder", position: [2, 0.15, -2], scale: [0.7, 0.3, 0.7], color: 0x3A5070, roughness: 0.6, metalness: 0.2 },
      { type: "cylinder", position: [-1, 0.15, -3], scale: [0.9, 0.3, 0.9], color: 0x4A6080, roughness: 0.6, metalness: 0.2 },
      // Moon
      { type: "sphere", position: [0, 15, -10], scale: [2, 2, 2], color: 0xE8E8FF, emissive: 0xE8E8FF, emissiveIntensity: 0.8, roughness: 0.3 },
      // Fog wisps
      { type: "sphere", position: [-4, 0.5, 3], scale: [3, 0.5, 3], color: 0x203050, opacity: 0.2, roughness: 1 },
      { type: "sphere", position: [5, 0.3, -1], scale: [2, 0.4, 2], color: 0x203050, opacity: 0.15, roughness: 1 },
    ],
    floor: { type: "plane", color: 0x0A1628, size: 50 },
    particles: { count: 80, color: 0x00D4AA, size: 0.02, speed: 0.2, opacity: 0.5, spread: 15 },
  },
  camera: {
    ...defaultCamera([5, 3, 5], [0, 0, 0]),
    orbit: { ...defaultCamera([5, 3, 5], [0, 0, 0]).orbit!, maxPolarAngle: Math.PI / 2.2 },
  },
  navigation: defaultTour([
    { sectionId: "hero", description: "Float above the reservoir — stillness reveals depth." },
    { sectionId: "projects", description: "Step across stones to discover projects." },
    { sectionId: "skills", description: "Ripples form patterns of expertise." },
    { sectionId: "experience", description: "Stones form a chronological path." },
    { sectionId: "contact", description: "Drop a message into the water." },
  ]),
  hero: { title: "THE RESERVOIR", subtitle: "Reflection Runs Deep", cameraPosition: [5, 3, 5], cameraTarget: [0, 0, 0], animation: { type: "fade", duration: 2, delay: 0.8 } },
  projects: defaultProjectConfig("physical"),
  skills: defaultSkillConfig("orb"),
  experience: defaultExperienceConfig("path"),
  contact: defaultContactConfig("physical"),
  audio: {
    ambient: { baseFrequency: 50, waveType: "sine", volume: 0.06, filter: { type: "lowpass", frequency: 120, Q: 1 } },
    interactions: {
      hover: { frequency: 440, duration: 0.2, waveType: "sine", volume: 0.1, envelope: { attack: 0.05, decay: 0.1, sustain: 0.1, release: 0.05 } },
      click: { frequency: 330, duration: 0.3, waveType: "sine", volume: 0.15, envelope: { attack: 0.02, decay: 0.15, sustain: 0.1, release: 0.13 } },
      drag: { frequency: 220, duration: 0.25, waveType: "sine", volume: 0.08, envelope: { attack: 0.03, decay: 0.12, sustain: 0.2, release: 0.1 } },
      open: { frequency: 523, duration: 0.4, waveType: "sine", volume: 0.15, envelope: { attack: 0.05, decay: 0.15, sustain: 0.3, release: 0.2 } },
      close: { frequency: 262, duration: 0.3, waveType: "sine", volume: 0.1, envelope: { attack: 0.03, decay: 0.12, sustain: 0.2, release: 0.15 } },
      submit: { frequency: 440, duration: 0.5, waveType: "sine", volume: 0.2, envelope: { attack: 0.05, decay: 0.2, sustain: 0.1, release: 0.25 } },
      navigate: { frequency: 392, duration: 0.2, waveType: "sine", volume: 0.1, envelope: { attack: 0.03, decay: 0.08, sustain: 0.2, release: 0.09 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0x0A1628),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 5. THE LEDGER
// ============================================================

const ledger: PortfolioTheme = {
  id: "the-ledger",
  name: "The Ledger",
  metaphor: "Archival library card catalogue",
  colors: {
    primary: "#8B7355",
    secondary: "#D4C5A9",
    accent: "#B8860B",
    background: "#F5F0E8",
    surface: "#FFFDF5",
    text: "#2C2416",
    textMuted: "#6B5B3E",
    border: "#D4C5A9",
    success: "#5D8A3C",
    warning: "#D4A017",
    error: "#C0392B",
  },
  environment: {
    backgroundColor: 0xF5F0E8,
    ambientLight: { color: 0xFFF8F0, intensity: 0.5 },
    directionalLight: [
      { color: 0xFFE4B5, intensity: 1, position: [3, 6, 3], castShadow: true },
    ],
    objects: [
      // Filing cabinet
      { type: "box", position: [-2, 1, -1], scale: [1.2, 2, 0.8], color: 0x5C3A1E, roughness: 0.7 },
      // Drawers
      { type: "box", position: [-2, 0.3, -0.55], scale: [1, 0.4, 0.1], color: 0x8B7355, roughness: 0.6, metalness: 0.3 },
      { type: "box", position: [-2, 0.8, -0.55], scale: [1, 0.4, 0.1], color: 0x8B7355, roughness: 0.6, metalness: 0.3 },
      { type: "box", position: [-2, 1.3, -0.55], scale: [1, 0.4, 0.1], color: 0x8B7355, roughness: 0.6, metalness: 0.3 },
      // Typewriter
      { type: "box", position: [1, 0.4, 0], scale: [0.8, 0.4, 0.6], color: 0x2C2416, roughness: 0.5, metalness: 0.4 },
      // Manila cards scattered
      { type: "plane", position: [0, 0.5, 1], rotation: [-Math.PI / 2, 0, 0.1], scale: [0.4, 0.6, 1], color: 0xD4C5A9, roughness: 0.95 },
      { type: "plane", position: [0.5, 0.5, 0.5], rotation: [-Math.PI / 2, 0, -0.2], scale: [0.4, 0.6, 1], color: 0xE8DCC8, roughness: 0.95 },
      // Archive labels
      { type: "box", position: [2, 0.3, -2], scale: [1.5, 0.6, 1], color: 0x8B7355, roughness: 0.8 },
      // Desk
      { type: "box", position: [1, 0.35, 0], scale: [2, 0.05, 1.2], color: 0x5C3A1E, roughness: 0.6 },
    ],
    floor: { type: "plane", color: 0xE8DCC8, size: 30 },
    particles: { count: 20, color: 0xD4C5A9, size: 0.03, speed: 0.2, opacity: 0.3, spread: 8 },
  },
  camera: defaultCamera([4, 2.5, 4], [0, 0.8, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Welcome to the Ledger — every card tells a story." },
    { sectionId: "projects", description: "Pull index cards to reveal projects." },
    { sectionId: "skills", description: "Alphabetical drawers hold technical knowledge." },
    { sectionId: "experience", description: "Archive folders sorted by time." },
    { sectionId: "contact", description: "Type your message on the typewriter." },
  ]),
  hero: { title: "THE LEDGER", subtitle: "Archives of Experience", cameraPosition: [4, 2.5, 4], cameraTarget: [0, 0.8, 0], animation: { type: "slide", duration: 1, delay: 0.4 } },
  projects: defaultProjectConfig("card"),
  skills: defaultSkillConfig("card"),
  experience: defaultExperienceConfig("cards"),
  contact: defaultContactConfig("terminal"),
  audio: {
    ambient: { baseFrequency: 100, waveType: "sine", volume: 0.05, filter: { type: "lowpass", frequency: 200, Q: 1 } },
    interactions: {
      hover: { frequency: 350, duration: 0.08, waveType: "square", volume: 0.1, envelope: { attack: 0.01, decay: 0.04, sustain: 0.1, release: 0.03 } },
      click: { frequency: 700, duration: 0.1, waveType: "square", volume: 0.15, envelope: { attack: 0.01, decay: 0.05, sustain: 0.2, release: 0.04 } },
      drag: { frequency: 200, duration: 0.15, waveType: "sawtooth", volume: 0.08, envelope: { attack: 0.01, decay: 0.07, sustain: 0.3, release: 0.07 } },
      open: { frequency: 600, duration: 0.2, waveType: "square", volume: 0.15, envelope: { attack: 0.01, decay: 0.08, sustain: 0.3, release: 0.11 } },
      close: { frequency: 300, duration: 0.15, waveType: "square", volume: 0.1, envelope: { attack: 0.01, decay: 0.06, sustain: 0.2, release: 0.08 } },
      submit: { frequency: 880, duration: 0.3, waveType: "square", volume: 0.2, envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.19 } },
      navigate: { frequency: 440, duration: 0.12, waveType: "square", volume: 0.1, envelope: { attack: 0.01, decay: 0.05, sustain: 0.2, release: 0.06 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0xF5F0E8),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 6. THE SWITCHBOARD
// ============================================================

const switchboard: PortfolioTheme = {
  id: "the-switchboard",
  name: "The Switchboard",
  metaphor: "1950s telephone exchange",
  colors: {
    primary: "#FF6B35",
    secondary: "#1A1A1A",
    accent: "#00FF88",
    background: "#0D0D0D",
    surface: "#1A1A1A",
    text: "#E0E0E0",
    textMuted: "#808080",
    border: "#333333",
    success: "#00FF88",
    warning: "#FFB800",
    error: "#FF3333",
  },
  environment: {
    backgroundColor: 0x0D0D0D,
    ambientLight: { color: 0x404040, intensity: 0.3 },
    directionalLight: [
      { color: 0xFF6B35, intensity: 0.6, position: [3, 5, 3], castShadow: true },
    ],
    pointLights: [
      { color: 0x00FF88, intensity: 0.4, position: [-2, 2, 0], distance: 6, decay: 2 },
      { color: 0xFF6B35, intensity: 0.3, position: [2, 2, 0], distance: 6, decay: 2 },
    ],
    objects: [
      // Main board
      { type: "box", position: [0, 1.5, -2], scale: [4, 3, 0.2], color: 0x1A1A1A, roughness: 0.4, metalness: 0.6 },
      // Patch ports (grid of cylinders)
      ...Array.from({ length: 12 }, (_, i) => ({
        type: "cylinder" as const,
        position: [-1.5 + (i % 4) * 1, 1 + Math.floor(i / 4) * 0.8, -1.8] as [number, number, number],
        scale: [0.1, 0.1, 0.1] as [number, number, number],
        color: i % 3 === 0 ? 0x00FF88 : i % 3 === 1 ? 0xFF6B35 : 0xFFB800,
        emissive: i % 3 === 0 ? 0x00FF88 : i % 3 === 1 ? 0xFF6B35 : 0xFFB800,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8,
      })),
      // CRT monitor
      { type: "box", position: [2.5, 1.2, -1.5], scale: [0.8, 0.6, 0.5], color: 0x2A2A2A, roughness: 0.3, metalness: 0.5 },
      // Cables hanging
      { type: "cylinder", position: [-0.5, 2.5, -1.9], scale: [0.02, 1, 0.02], color: 0x8B0000, roughness: 0.5 },
      { type: "cylinder", position: [0.5, 2.3, -1.9], scale: [0.02, 0.8, 0.02], color: 0x00008B, roughness: 0.5 },
      // Rotary dial
      { type: "torus", position: [0, 0.5, 1], scale: [0.4, 0.4, 0.05], color: 0x333333, roughness: 0.3, metalness: 0.7 },
    ],
    floor: { type: "plane", color: 0x1A1A1A, size: 30 },
    particles: { count: 40, color: 0x00FF88, size: 0.015, speed: 0.4, opacity: 0.6, spread: 10 },
  },
  camera: defaultCamera([5, 3, 4], [0, 1, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Enter the Switchboard — connect the routes." },
    { sectionId: "projects", description: "Each project is a telephone route to explore." },
    { sectionId: "skills", description: "Patch ports represent technical connections." },
    { sectionId: "experience", description: "Call-routing reveals career history." },
    { sectionId: "contact", description: "Connect the contact line." },
  ]),
  hero: { title: "THE SWITCHBOARD", subtitle: "Connecting Ideas", cameraPosition: [5, 3, 4], cameraTarget: [0, 1, 0], animation: { type: "fade", duration: 1, delay: 0.5 } },
  projects: defaultProjectConfig("floating"),
  skills: defaultSkillConfig("node"),
  experience: defaultExperienceConfig("timeline"),
  contact: defaultContactConfig("terminal"),
  audio: {
    ambient: { baseFrequency: 60, waveType: "square", volume: 0.03, filter: { type: "lowpass", frequency: 100, Q: 1 } },
    interactions: {
      hover: { frequency: 800, duration: 0.05, waveType: "square", volume: 0.1, envelope: { attack: 0.01, decay: 0.02, sustain: 0.1, release: 0.02 } },
      click: { frequency: 1200, duration: 0.08, waveType: "square", volume: 0.15, envelope: { attack: 0.01, decay: 0.03, sustain: 0.2, release: 0.04 } },
      drag: { frequency: 400, duration: 0.1, waveType: "sawtooth", volume: 0.08, envelope: { attack: 0.01, decay: 0.04, sustain: 0.2, release: 0.05 } },
      open: { frequency: 1000, duration: 0.15, waveType: "square", volume: 0.15, envelope: { attack: 0.01, decay: 0.05, sustain: 0.3, release: 0.09 } },
      close: { frequency: 500, duration: 0.1, waveType: "square", volume: 0.1, envelope: { attack: 0.01, decay: 0.04, sustain: 0.2, release: 0.05 } },
      submit: { frequency: 1500, duration: 0.2, waveType: "square", volume: 0.2, envelope: { attack: 0.01, decay: 0.08, sustain: 0.3, release: 0.11 } },
      navigate: { frequency: 600, duration: 0.1, waveType: "square", volume: 0.1, envelope: { attack: 0.01, decay: 0.04, sustain: 0.2, release: 0.05 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0x0D0D0D),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 7. THE PRINT SHOP
// ============================================================

const printShop: PortfolioTheme = {
  id: "the-print-shop",
  name: "The Print Shop",
  metaphor: "Industrial letterpress workshop",
  colors: {
    primary: "#2C2C2C",
    secondary: "#F5F0E0",
    accent: "#C0392B",
    background: "#F5F0E0",
    surface: "#FFFDF5",
    text: "#1A1A1A",
    textMuted: "#666666",
    border: "#D0C8B0",
    success: "#27AE60",
    warning: "#F39C12",
    error: "#C0392B",
  },
  environment: {
    backgroundColor: 0xF5F0E0,
    ambientLight: { color: 0xFFF8E8, intensity: 0.5 },
    directionalLight: [
      { color: 0xFFE4B5, intensity: 1, position: [4, 6, 3], castShadow: true },
    ],
    objects: [
      // Press machine
      { type: "box", position: [0, 0.8, 0], scale: [1.5, 1.6, 1], color: 0x2C2C2C, roughness: 0.4, metalness: 0.7, castShadow: true },
      // Paper stack
      { type: "box", position: [-1.5, 0.3, 0.5], scale: [0.8, 0.6, 0.6], color: 0xFFFDF5, roughness: 0.95 },
      // Ink rollers
      { type: "cylinder", position: [0, 1.7, 0], scale: [0.6, 0.2, 0.6], color: 0x1A1A1A, roughness: 0.3, metalness: 0.6 },
      // Lead type blocks
      { type: "box", position: [2, 0.4, -1], scale: [0.3, 0.8, 0.3], color: 0x4A4A4A, roughness: 0.5, metalness: 0.6 },
      { type: "box", position: [2.4, 0.3, -1], scale: [0.25, 0.6, 0.25], color: 0x5A5A5A, roughness: 0.5, metalness: 0.6 },
      // Printed poster
      { type: "plane", position: [-2, 1.5, -1], scale: [1.5, 2, 1], color: 0xFFFDF5, roughness: 0.95 },
      // Desk
      { type: "box", position: [2, 0.35, 0], scale: [1.5, 0.05, 1], color: 0x8B7355, roughness: 0.7 },
    ],
    floor: { type: "plane", color: 0xE8E0D0, size: 30 },
    particles: { count: 15, color: 0x2C2C2C, size: 0.02, speed: 0.3, opacity: 0.2, spread: 6 },
  },
  camera: defaultCamera([4, 2.5, 4], [0, 0.8, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Welcome to the Print Shop — where ideas become tangible." },
    { sectionId: "projects", description: "Each project is a printed poster." },
    { sectionId: "skills", description: "Lead type blocks spell out technologies." },
    { sectionId: "experience", description: "Newspapers chronicle career stages." },
    { sectionId: "contact", description: "Press the form to dispatch your message." },
  ]),
  hero: { title: "THE PRINT SHOP", subtitle: "Crafted with Precision", cameraPosition: [4, 2.5, 4], cameraTarget: [0, 0.8, 0], animation: { type: "slide", duration: 1, delay: 0.4 } },
  projects: defaultProjectConfig("card"),
  skills: defaultSkillConfig("physical"),
  experience: defaultExperienceConfig("cards"),
  contact: defaultContactConfig("physical"),
  audio: {
    ambient: { baseFrequency: 90, waveType: "triangle", volume: 0.05, filter: { type: "lowpass", frequency: 200, Q: 1 } },
    interactions: {
      hover: { frequency: 440, duration: 0.08, waveType: "square", volume: 0.12, envelope: { attack: 0.01, decay: 0.04, sustain: 0.1, release: 0.03 } },
      click: { frequency: 880, duration: 0.12, waveType: "sawtooth", volume: 0.18, envelope: { attack: 0.01, decay: 0.06, sustain: 0.2, release: 0.05 } },
      drag: { frequency: 220, duration: 0.15, waveType: "sawtooth", volume: 0.1, envelope: { attack: 0.01, decay: 0.07, sustain: 0.2, release: 0.07 } },
      open: { frequency: 660, duration: 0.2, waveType: "square", volume: 0.15, envelope: { attack: 0.01, decay: 0.08, sustain: 0.3, release: 0.11 } },
      close: { frequency: 330, duration: 0.15, waveType: "square", volume: 0.1, envelope: { attack: 0.01, decay: 0.06, sustain: 0.2, release: 0.08 } },
      submit: { frequency: 784, duration: 0.3, waveType: "sawtooth", volume: 0.2, envelope: { attack: 0.01, decay: 0.12, sustain: 0.3, release: 0.17 } },
      navigate: { frequency: 440, duration: 0.12, waveType: "square", volume: 0.12, envelope: { attack: 0.01, decay: 0.05, sustain: 0.2, release: 0.06 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0xF5F0E0),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 8. THE READING ROOM
// ============================================================

const readingRoom: PortfolioTheme = {
  id: "the-reading-room",
  name: "The Reading Room",
  metaphor: "Private mahogany library",
  colors: {
    primary: "#C19A6B",
    secondary: "#4A2C0A",
    accent: "#FFD700",
    background: "#1A0F05",
    surface: "#2A1A0A",
    text: "#F5E6D3",
    textMuted: "#A08060",
    border: "#3D2E1E",
    success: "#4CAF50",
    warning: "#FFB74D",
    error: "#E57373",
  },
  environment: {
    backgroundColor: 0x1A0F05,
    fog: { color: 0x1A0F05, near: 8, far: 20 },
    ambientLight: { color: 0xFFE4B5, intensity: 0.3 },
    directionalLight: [
      { color: 0xFFD700, intensity: 0.8, position: [0, 5, 3], castShadow: true },
    ],
    pointLights: [
      { color: 0xFFD700, intensity: 0.5, position: [0, 3, 0], distance: 8, decay: 2 },
    ],
    objects: [
      // Bookshelf
      { type: "box", position: [0, 1.5, -2], scale: [4, 3, 0.4], color: 0x4A2C0A, roughness: 0.6 },
      // Books on shelf (represented as thin boxes)
      ...Array.from({ length: 8 }, (_, i) => ({
        type: "box" as const,
        position: [-1.5 + i * 0.4, 1 + Math.floor(i / 4) * 1.2, -1.8] as [number, number, number],
        scale: [0.25, 0.8, 0.3] as [number, number, number],
        color: [0x8B0000, 0x00008B, 0x006400, 0x8B4513, 0x4B0082, 0xB8860B, 0x2F4F4F, 0x800020][i],
        roughness: 0.7,
        castShadow: true,
      })),
      // Desk
      { type: "box", position: [0, 0.35, 1], scale: [2, 0.05, 1.2], color: 0x5C3A1E, roughness: 0.6 },
      // Desk lamp
      { type: "cylinder", position: [0.8, 0.6, 1], scale: [0.1, 0.5, 0.1], color: 0xFFD700, roughness: 0.3, metalness: 0.7 },
      // Leather chair
      { type: "box", position: [0, 0.5, 2], scale: [0.8, 1, 0.6], color: 0x3D2E1E, roughness: 0.8 },
    ],
    floor: { type: "plane", color: 0x2A1A0A, size: 30 },
    particles: { count: 20, color: 0xFFD700, size: 0.02, speed: 0.15, opacity: 0.3, spread: 8 },
  },
  camera: defaultCamera([4, 2.5, 4], [0, 1, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Enter the Reading Room — knowledge surrounds you." },
    { sectionId: "projects", description: "Each project is a book on the shelf." },
    { sectionId: "skills", description: "Books grouped by technical category." },
    { sectionId: "experience", description: "The chronological shelf tells your story." },
    { sectionId: "contact", description: "Send an owl post." },
  ]),
  hero: { title: "THE READING ROOM", subtitle: "Chapters of Experience", cameraPosition: [4, 2.5, 4], cameraTarget: [0, 1, 0], animation: { type: "fade", duration: 1.5, delay: 0.6 } },
  projects: defaultProjectConfig("physical"),
  skills: defaultSkillConfig("card"),
  experience: defaultExperienceConfig("book"),
  contact: defaultContactConfig("letter"),
  audio: {
    ambient: { baseFrequency: 70, waveType: "sine", volume: 0.05, filter: { type: "lowpass", frequency: 150, Q: 1 } },
    interactions: {
      hover: { frequency: 330, duration: 0.1, waveType: "sine", volume: 0.1, envelope: { attack: 0.02, decay: 0.05, sustain: 0.1, release: 0.03 } },
      click: { frequency: 660, duration: 0.15, waveType: "sine", volume: 0.15, envelope: { attack: 0.01, decay: 0.07, sustain: 0.2, release: 0.07 } },
      drag: { frequency: 220, duration: 0.2, waveType: "triangle", volume: 0.08, envelope: { attack: 0.02, decay: 0.08, sustain: 0.3, release: 0.1 } },
      open: { frequency: 440, duration: 0.25, waveType: "sine", volume: 0.15, envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.13 } },
      close: { frequency: 220, duration: 0.2, waveType: "sine", volume: 0.1, envelope: { attack: 0.02, decay: 0.08, sustain: 0.2, release: 0.1 } },
      submit: { frequency: 523, duration: 0.35, waveType: "sine", volume: 0.2, envelope: { attack: 0.02, decay: 0.12, sustain: 0.3, release: 0.21 } },
      navigate: { frequency: 392, duration: 0.15, waveType: "sine", volume: 0.1, envelope: { attack: 0.02, decay: 0.06, sustain: 0.2, release: 0.07 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0x1A0F05),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 9. THE GREENHOUSE
// ============================================================

const greenhouse: PortfolioTheme = {
  id: "the-greenhouse",
  name: "The Greenhouse",
  metaphor: "Botanical glasshouse",
  colors: {
    primary: "#4CAF50",
    secondary: "#2E7D32",
    accent: "#81C784",
    background: "#E8F5E9",
    surface: "#F1F8E9",
    text: "#1B5E20",
    textMuted: "#4A7A4E",
    border: "#A5D6A7",
    success: "#2E7D32",
    warning: "#FFB74D",
    error: "#E57373",
  },
  environment: {
    backgroundColor: 0xE8F5E9,
    ambientLight: { color: 0xF0FFF0, intensity: 0.5 },
    directionalLight: [
      { color: 0xFFE4B5, intensity: 1.2, position: [3, 8, 3], castShadow: true },
    ],
    objects: [
      // Glass panels (walls)
      { type: "plane", position: [0, 2, -3], scale: [8, 4, 1], color: 0x88CCFF, opacity: 0.2, metalness: 0.3, roughness: 0.1 },
      { type: "plane", position: [-4, 2, 0], rotation: [0, Math.PI / 2, 0], scale: [6, 4, 1], color: 0x88CCFF, opacity: 0.2, metalness: 0.3, roughness: 0.1 },
      // Plants
      { type: "cone", position: [-2, 0.8, 2], scale: [0.6, 1.2, 0.6], color: 0x2E7D32, roughness: 0.8 },
      { type: "cone", position: [2, 0.6, 1], scale: [0.5, 0.9, 0.5], color: 0x4CAF50, roughness: 0.8 },
      { type: "sphere", position: [-1, 1, -1], scale: [0.8, 0.8, 0.8], color: 0x66BB6A, roughness: 0.9 },
      { type: "sphere", position: [1.5, 0.7, -2], scale: [0.6, 0.6, 0.6], color: 0x81C784, roughness: 0.9 },
      // Pots
      { type: "cylinder", position: [-2, 0.25, 2], scale: [0.4, 0.5, 0.4], color: 0xA0522D, roughness: 0.8 },
      { type: "cylinder", position: [2, 0.2, 1], scale: [0.35, 0.4, 0.35], color: 0xA0522D, roughness: 0.8 },
      // Watering can
      { type: "cylinder", position: [0, 0.3, 2], scale: [0.2, 0.3, 0.2], color: 0x708090, roughness: 0.4, metalness: 0.6 },
    ],
    floor: { type: "plane", color: 0xD7CCC8, size: 30 },
    particles: { count: 40, color: 0x81C784, size: 0.025, speed: 0.4, opacity: 0.4, spread: 10 },
  },
  camera: defaultCamera([4, 3, 5], [0, 1, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Step into the Greenhouse — where ideas grow." },
    { sectionId: "projects", description: "Each project blooms into a plant." },
    { sectionId: "skills", description: "Different species represent skill sets." },
    { sectionId: "experience", description: "Growth rings show career timeline." },
    { sectionId: "contact", description: "Plant a message in the garden." },
  ]),
  hero: { title: "THE GREENHOUSE", subtitle: "Growing Digital Experiences", cameraPosition: [4, 3, 5], cameraTarget: [0, 1, 0], animation: { type: "scale", duration: 1.2, delay: 0.5 } },
  projects: defaultProjectConfig("physical"),
  skills: defaultSkillConfig("orb"),
  experience: defaultExperienceConfig("path"),
  contact: defaultContactConfig("physical"),
  audio: {
    ambient: { baseFrequency: 100, waveType: "sine", volume: 0.06, filter: { type: "lowpass", frequency: 250, Q: 1 } },
    interactions: {
      hover: { frequency: 523, duration: 0.12, waveType: "sine", volume: 0.12, envelope: { attack: 0.02, decay: 0.06, sustain: 0.1, release: 0.04 } },
      click: { frequency: 784, duration: 0.18, waveType: "sine", volume: 0.18, envelope: { attack: 0.01, decay: 0.08, sustain: 0.2, release: 0.09 } },
      drag: { frequency: 330, duration: 0.2, waveType: "triangle", volume: 0.1, envelope: { attack: 0.02, decay: 0.08, sustain: 0.3, release: 0.1 } },
      open: { frequency: 660, duration: 0.3, waveType: "sine", volume: 0.15, envelope: { attack: 0.02, decay: 0.1, sustain: 0.4, release: 0.18 } },
      close: { frequency: 392, duration: 0.2, waveType: "sine", volume: 0.1, envelope: { attack: 0.02, decay: 0.08, sustain: 0.2, release: 0.1 } },
      submit: { frequency: 880, duration: 0.4, waveType: "sine", volume: 0.2, envelope: { attack: 0.02, decay: 0.15, sustain: 0.3, release: 0.23 } },
      navigate: { frequency: 440, duration: 0.15, waveType: "sine", volume: 0.12, envelope: { attack: 0.02, decay: 0.06, sustain: 0.2, release: 0.07 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0xE8F5E9),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 10. THE ARCADE CABINET
// ============================================================

const arcade: PortfolioTheme = {
  id: "the-arcade",
  name: "The Arcade",
  metaphor: "1980s arcade cabinet",
  colors: {
    primary: "#FF00FF",
    secondary: "#00FFFF",
    accent: "#FFFF00",
    background: "#0A0A0A",
    surface: "#1A1A2E",
    text: "#00FF00",
    textMuted: "#808080",
    border: "#333366",
    success: "#00FF00",
    warning: "#FFFF00",
    error: "#FF0000",
  },
  environment: {
    backgroundColor: 0x0A0A0A,
    ambientLight: { color: 0x404040, intensity: 0.2 },
    directionalLight: [
      { color: 0xFF00FF, intensity: 0.4, position: [3, 5, 3] },
      { color: 0x00FFFF, intensity: 0.3, position: [-3, 4, -2] },
    ],
    pointLights: [
      { color: 0xFF00FF, intensity: 0.5, position: [0, 3, 0], distance: 8, decay: 2 },
      { color: 0x00FFFF, intensity: 0.4, position: [2, 2, 2], distance: 6, decay: 2 },
      { color: 0xFFFF00, intensity: 0.3, position: [-2, 2, -1], distance: 5, decay: 2 },
    ],
    objects: [
      // Arcade cabinet
      { type: "box", position: [0, 1, 0], scale: [1.2, 2, 1], color: 0x1A1A2E, roughness: 0.4, metalness: 0.3, castShadow: true },
      // Screen
      { type: "plane", position: [0, 1.5, 0.51], scale: [0.8, 0.6, 1], color: 0x00FF00, emissive: 0x00FF00, emissiveIntensity: 0.3 },
      // Joystick
      { type: "cylinder", position: [-0.3, 0.6, 0.6], scale: [0.05, 0.2, 0.05], color: 0xFF0000, roughness: 0.3, metalness: 0.7 },
      // Buttons
      { type: "sphere", position: [0.2, 0.65, 0.6], scale: [0.06, 0.06, 0.06], color: 0xFF00FF, emissive: 0xFF00FF, emissiveIntensity: 0.5 },
      { type: "sphere", position: [0.35, 0.65, 0.6], scale: [0.06, 0.06, 0.06], color: 0x00FFFF, emissive: 0x00FFFF, emissiveIntensity: 0.5 },
      { type: "sphere", position: [0.5, 0.65, 0.6], scale: [0.06, 0.06, 0.06], color: 0xFFFF00, emissive: 0xFFFF00, emissiveIntensity: 0.5 },
      // Coin slot
      { type: "box", position: [0, 0.3, 0.51], scale: [0.3, 0.08, 0.02], color: 0xC0C0C0, roughness: 0.2, metalness: 0.8 },
      // Pixel art decorations
      { type: "box", position: [-2, 1, -1], scale: [0.2, 0.2, 0.2], color: 0xFF00FF, emissive: 0xFF00FF, emissiveIntensity: 0.8 },
      { type: "box", position: [2, 1.5, -1], scale: [0.2, 0.2, 0.2], color: 0x00FFFF, emissive: 0x00FFFF, emissiveIntensity: 0.8 },
      { type: "box", position: [-1.5, 0.5, 2], scale: [0.2, 0.2, 0.2], color: 0xFFFF00, emissive: 0xFFFF00, emissiveIntensity: 0.8 },
    ],
    floor: { type: "grid", color: 0x333366, size: 30 },
    particles: { count: 100, color: 0xFF00FF, size: 0.02, speed: 0.6, opacity: 0.5, spread: 12 },
  },
  camera: defaultCamera([4, 2.5, 4], [0, 1, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Insert coin to start — the Arcade awaits." },
    { sectionId: "projects", description: "Each project is a cartridge to play." },
    { sectionId: "skills", description: "High-score table of technologies." },
    { sectionId: "experience", description: "Game progression map of career." },
    { sectionId: "contact", description: "Unlock the contact terminal." },
  ]),
  hero: { title: "THE ARCADE", subtitle: "INSERT COIN TO PLAY", cameraPosition: [4, 2.5, 4], cameraTarget: [0, 1, 0], animation: { type: "scale", duration: 0.5, delay: 0.2 } },
  projects: defaultProjectConfig("floating"),
  skills: defaultSkillConfig("bar"),
  experience: defaultExperienceConfig("path"),
  contact: defaultContactConfig("terminal"),
  audio: {
    ambient: { baseFrequency: 80, waveType: "square", volume: 0.04, filter: { type: "lowpass", frequency: 200, Q: 1 } },
    interactions: {
      hover: { frequency: 1000, duration: 0.05, waveType: "square", volume: 0.15, envelope: { attack: 0.01, decay: 0.02, sustain: 0.1, release: 0.02 } },
      click: { frequency: 1500, duration: 0.08, waveType: "square", volume: 0.2, envelope: { attack: 0.01, decay: 0.03, sustain: 0.2, release: 0.04 } },
      drag: { frequency: 600, duration: 0.1, waveType: "sawtooth", volume: 0.1, envelope: { attack: 0.01, decay: 0.04, sustain: 0.2, release: 0.05 } },
      open: { frequency: 1200, duration: 0.15, waveType: "square", volume: 0.2, envelope: { attack: 0.01, decay: 0.05, sustain: 0.3, release: 0.09 } },
      close: { frequency: 600, duration: 0.1, waveType: "square", volume: 0.15, envelope: { attack: 0.01, decay: 0.04, sustain: 0.2, release: 0.05 } },
      submit: { frequency: 2000, duration: 0.25, waveType: "square", volume: 0.25, envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.14 } },
      navigate: { frequency: 800, duration: 0.08, waveType: "square", volume: 0.15, envelope: { attack: 0.01, decay: 0.03, sustain: 0.2, release: 0.04 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0x0A0A0A),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 11. THE POTTER'S STUDIO
// ============================================================

const potteryStudio: PortfolioTheme = {
  id: "the-pottery-studio",
  name: "The Potter's Studio",
  metaphor: "Artisan pottery studio",
  colors: {
    primary: "#A0522D",
    secondary: "#D2B48C",
    accent: "#CD853F",
    background: "#F5F0E8",
    surface: "#FFFDF5",
    text: "#3E2723",
    textMuted: "#795548",
    border: "#D7CCC8",
    success: "#66BB6A",
    warning: "#FFA726",
    error: "#EF5350",
  },
  environment: {
    backgroundColor: 0xF5F0E8,
    ambientLight: { color: 0xFFF8F0, intensity: 0.5 },
    directionalLight: [
      { color: 0xFFE4B5, intensity: 1, position: [3, 6, 3], castShadow: true },
    ],
    objects: [
      // Pottery wheel
      { type: "cylinder", position: [0, 0.3, 0], scale: [0.8, 0.6, 0.8], color: 0x8B7355, roughness: 0.6, metalness: 0.3 },
      // Clay vessel on wheel
      { type: "cylinder", position: [0, 0.8, 0], scale: [0.3, 0.5, 0.3], color: 0xA0522D, roughness: 0.8 },
      // Shelf with vessels
      { type: "box", position: [-2, 1, -1], scale: [1.5, 0.05, 0.4], color: 0x8B7355, roughness: 0.7 },
      { type: "cylinder", position: [-2.3, 1.3, -1], scale: [0.15, 0.3, 0.15], color: 0xCD853F, roughness: 0.7 },
      { type: "cylinder", position: [-2, 1.25, -1], scale: [0.2, 0.25, 0.2], color: 0xA0522D, roughness: 0.7 },
      { type: "cylinder", position: [-1.7, 1.35, -1], scale: [0.18, 0.35, 0.18], color: 0xD2B48C, roughness: 0.7 },
      // Kiln
      { type: "box", position: [2, 0.6, -2], scale: [1, 1.2, 0.8], color: 0x5D4037, roughness: 0.5, metalness: 0.2 },
      // Clay buckets
      { type: "cylinder", position: [1.5, 0.3, 1], scale: [0.3, 0.6, 0.3], color: 0x795548, roughness: 0.8 },
      // Table
      { type: "box", position: [1, 0.35, 0], scale: [1.5, 0.05, 1], color: 0x8B7355, roughness: 0.7 },
    ],
    floor: { type: "plane", color: 0xE0D5C5, size: 30 },
    particles: { count: 25, color: 0xA0522D, size: 0.02, speed: 0.2, opacity: 0.3, spread: 8 },
  },
  camera: defaultCamera([4, 2.5, 4], [0, 0.8, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Welcome to the Potter's Studio — shape your vision." },
    { sectionId: "projects", description: "Each project is a ceramic vessel." },
    { sectionId: "skills", description: "Different shapes represent expertise." },
    { sectionId: "experience", description: "The kiln fires through career stages." },
    { sectionId: "contact", description: "Seal your message in clay." },
  ]),
  hero: { title: "THE POTTER'S STUDIO", subtitle: "Shaped by Hand", cameraPosition: [4, 2.5, 4], cameraTarget: [0, 0.8, 0], animation: { type: "rotate", duration: 1.2, delay: 0.5 } },
  projects: defaultProjectConfig("physical"),
  skills: defaultSkillConfig("physical"),
  experience: defaultExperienceConfig("timeline"),
  contact: defaultContactConfig("physical"),
  audio: {
    ambient: { baseFrequency: 80, waveType: "sine", volume: 0.05, filter: { type: "lowpass", frequency: 180, Q: 1 } },
    interactions: {
      hover: { frequency: 330, duration: 0.1, waveType: "triangle", volume: 0.1, envelope: { attack: 0.02, decay: 0.05, sustain: 0.1, release: 0.03 } },
      click: { frequency: 523, duration: 0.15, waveType: "triangle", volume: 0.15, envelope: { attack: 0.01, decay: 0.07, sustain: 0.2, release: 0.07 } },
      drag: { frequency: 220, duration: 0.2, waveType: "sine", volume: 0.08, envelope: { attack: 0.02, decay: 0.08, sustain: 0.3, release: 0.1 } },
      open: { frequency: 440, duration: 0.25, waveType: "triangle", volume: 0.15, envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.13 } },
      close: { frequency: 262, duration: 0.2, waveType: "triangle", volume: 0.1, envelope: { attack: 0.02, decay: 0.08, sustain: 0.2, release: 0.1 } },
      submit: { frequency: 660, duration: 0.35, waveType: "triangle", volume: 0.2, envelope: { attack: 0.02, decay: 0.12, sustain: 0.3, release: 0.21 } },
      navigate: { frequency: 392, duration: 0.15, waveType: "triangle", volume: 0.1, envelope: { attack: 0.02, decay: 0.06, sustain: 0.2, release: 0.07 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0xF5F0E8),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 12. TRADE ROUTE GLOBE
// ============================================================

const tradeGlobe: PortfolioTheme = {
  id: "trade-globe",
  name: "Trade Route Globe",
  metaphor: "Antique brass globe",
  colors: {
    primary: "#C9A84C",
    secondary: "#2E4057",
    accent: "#048A81",
    background: "#1A2332",
    surface: "#243447",
    text: "#E8E8F0",
    textMuted: "#7888A0",
    border: "#3A4A60",
    success: "#048A81",
    warning: "#FFB347",
    error: "#E57373",
  },
  environment: {
    backgroundColor: 0x1A2332,
    fog: { color: 0x1A2332, near: 10, far: 30 },
    ambientLight: { color: 0x6080A0, intensity: 0.3 },
    directionalLight: [
      { color: 0xFFD700, intensity: 0.8, position: [5, 8, 3], castShadow: true },
    ],
    pointLights: [
      { color: 0xC9A84C, intensity: 0.5, position: [0, 3, 0], distance: 10, decay: 2 },
    ],
    objects: [
      // Globe
      { type: "sphere", position: [0, 2, 0], scale: [2, 2, 2], color: 0x2E4057, roughness: 0.4, metalness: 0.6 },
      // Globe stand
      { type: "cylinder", position: [0, 0.5, 0], scale: [0.8, 1, 0.8], color: 0xC9A84C, roughness: 0.3, metalness: 0.7 },
      // Globe ring
      { type: "torus", position: [0, 2, 0], scale: [2.1, 2.1, 0.05], color: 0xC9A84C, roughness: 0.2, metalness: 0.8 },
      // Map pins
      { type: "cone", position: [1, 2.5, 0.5], scale: [0.1, 0.3, 0.1], color: 0x048A81, emissive: 0x048A81, emissiveIntensity: 0.3 },
      { type: "cone", position: [-0.5, 2.3, 1], scale: [0.1, 0.3, 0.1], color: 0xFFB347, emissive: 0xFFB347, emissiveIntensity: 0.3 },
      { type: "cone", position: [0.3, 2.7, -0.8], scale: [0.1, 0.3, 0.1], color: 0xE57373, emissive: 0xE57373, emissiveIntensity: 0.3 },
      // Desk
      { type: "box", position: [0, 0.35, 0], scale: [3, 0.05, 2], color: 0x5C3A1E, roughness: 0.6 },
      // Compass
      { type: "cylinder", position: [2, 0.4, 0], scale: [0.3, 0.05, 0.3], color: 0xC9A84C, roughness: 0.2, metalness: 0.8 },
    ],
    floor: { type: "plane", color: 0x243447, size: 40 },
    particles: { count: 60, color: 0xC9A84C, size: 0.02, speed: 0.2, opacity: 0.4, spread: 15 },
  },
  camera: defaultCamera([5, 3, 5], [0, 1.5, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Spin the globe — explore the trade routes." },
    { sectionId: "projects", description: "Geographic pins mark each project." },
    { sectionId: "skills", description: "Trade routes connect technologies." },
    { sectionId: "experience", description: "Historical routes show career journey." },
    { sectionId: "contact", description: "Send a telegram across the wires." },
  ]),
  hero: { title: "TRADE ROUTE GLOBE", subtitle: "Mapping Connections", cameraPosition: [5, 3, 5], cameraTarget: [0, 1.5, 0], animation: { type: "rotate", duration: 2, delay: 0.5 } },
  projects: defaultProjectConfig("orbital"),
  skills: defaultSkillConfig("node"),
  experience: defaultExperienceConfig("path"),
  contact: defaultContactConfig("letter"),
  audio: {
    ambient: { baseFrequency: 70, waveType: "sine", volume: 0.05, filter: { type: "lowpass", frequency: 180, Q: 1 } },
    interactions: {
      hover: { frequency: 440, duration: 0.12, waveType: "triangle", volume: 0.12, envelope: { attack: 0.02, decay: 0.06, sustain: 0.1, release: 0.04 } },
      click: { frequency: 660, duration: 0.18, waveType: "triangle", volume: 0.18, envelope: { attack: 0.01, decay: 0.08, sustain: 0.2, release: 0.09 } },
      drag: { frequency: 330, duration: 0.2, waveType: "sine", volume: 0.1, envelope: { attack: 0.02, decay: 0.08, sustain: 0.3, release: 0.1 } },
      open: { frequency: 523, duration: 0.3, waveType: "triangle", volume: 0.15, envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.18 } },
      close: { frequency: 262, duration: 0.2, waveType: "triangle", volume: 0.1, envelope: { attack: 0.02, decay: 0.08, sustain: 0.2, release: 0.1 } },
      submit: { frequency: 784, duration: 0.4, waveType: "triangle", volume: 0.2, envelope: { attack: 0.02, decay: 0.15, sustain: 0.3, release: 0.23 } },
      navigate: { frequency: 392, duration: 0.15, waveType: "triangle", volume: 0.12, envelope: { attack: 0.02, decay: 0.06, sustain: 0.2, release: 0.07 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0x1A2332),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 13. THE HERBARIUM
// ============================================================

const herbarium: PortfolioTheme = {
  id: "the-herbarium",
  name: "The Herbarium",
  metaphor: "Botanical specimen archive",
  colors: {
    primary: "#558B2F",
    secondary: "#33691E",
    accent: "#8BC34A",
    background: "#F1F8E9",
    surface: "#FCFFF5",
    text: "#1B5E20",
    textMuted: "#4A7A4E",
    border: "#C5E1A5",
    success: "#2E7D32",
    warning: "#FFB74D",
    error: "#E57373",
  },
  environment: {
    backgroundColor: 0xF1F8E9,
    ambientLight: { color: 0xF0FFF0, intensity: 0.5 },
    directionalLight: [
      { color: 0xFFE4B5, intensity: 1, position: [3, 6, 3], castShadow: true },
    ],
    objects: [
      // Specimen table
      { type: "box", position: [0, 0.35, 0], scale: [3, 0.05, 1.5], color: 0x8D6E63, roughness: 0.7 },
      // Pressed specimens (flat planes)
      { type: "plane", position: [-0.8, 0.4, 0], rotation: [-Math.PI / 2, 0, 0.1], scale: [0.6, 0.8, 1], color: 0x558B2F, opacity: 0.7 },
      { type: "plane", position: [0.8, 0.4, 0.2], rotation: [-Math.PI / 2, 0, -0.1], scale: [0.5, 0.7, 1], color: 0x8BC34A, opacity: 0.7 },
      // Glass plate
      { type: "plane", position: [0, 0.45, 0], rotation: [-Math.PI / 2, 0, 0], scale: [1.2, 1.5, 1], color: 0x88CCFF, opacity: 0.15, metalness: 0.1, roughness: 0.05 },
      // Archive books
      { type: "box", position: [2, 0.5, -1], scale: [0.8, 1, 0.6], color: 0x33691E, roughness: 0.7 },
      // Magnifying glass
      { type: "torus", position: [-2, 0.6, 0.5], scale: [0.3, 0.3, 0.02], color: 0x8D6E63, roughness: 0.3, metalness: 0.5 },
      // Cabinet
      { type: "box", position: [-2, 1, -1], scale: [1, 2, 0.8], color: 0x5D4037, roughness: 0.6 },
    ],
    floor: { type: "plane", color: 0xE8F5E9, size: 30 },
    particles: { count: 30, color: 0x8BC34A, size: 0.02, speed: 0.3, opacity: 0.4, spread: 10 },
  },
  camera: defaultCamera([4, 2.5, 4], [0, 0.8, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Enter the Herbarium — preserve and display." },
    { sectionId: "projects", description: "Each project is a botanical specimen." },
    { sectionId: "skills", description: "Classification system for technologies." },
    { sectionId: "experience", description: "Field journal of career." },
    { sectionId: "contact", description: "Submit a specimen request." },
  ]),
  hero: { title: "THE HERBARIUM", subtitle: "Specimens of Work", cameraPosition: [4, 2.5, 4], cameraTarget: [0, 0.8, 0], animation: { type: "fade", duration: 1.2, delay: 0.5 } },
  projects: defaultProjectConfig("card"),
  skills: defaultSkillConfig("card"),
  experience: defaultExperienceConfig("book"),
  contact: defaultContactConfig("form"),
  audio: {
    ambient: { baseFrequency: 90, waveType: "sine", volume: 0.05, filter: { type: "lowpass", frequency: 200, Q: 1 } },
    interactions: {
      hover: { frequency: 330, duration: 0.1, waveType: "sine", volume: 0.1, envelope: { attack: 0.02, decay: 0.05, sustain: 0.1, release: 0.03 } },
      click: { frequency: 523, duration: 0.15, waveType: "sine", volume: 0.15, envelope: { attack: 0.01, decay: 0.07, sustain: 0.2, release: 0.07 } },
      drag: { frequency: 220, duration: 0.2, waveType: "triangle", volume: 0.08, envelope: { attack: 0.02, decay: 0.08, sustain: 0.3, release: 0.1 } },
      open: { frequency: 440, duration: 0.25, waveType: "sine", volume: 0.15, envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.13 } },
      close: { frequency: 262, duration: 0.2, waveType: "sine", volume: 0.1, envelope: { attack: 0.02, decay: 0.08, sustain: 0.2, release: 0.1 } },
      submit: { frequency: 660, duration: 0.35, waveType: "sine", volume: 0.2, envelope: { attack: 0.02, decay: 0.12, sustain: 0.3, release: 0.21 } },
      navigate: { frequency: 392, duration: 0.15, waveType: "sine", volume: 0.1, envelope: { attack: 0.02, decay: 0.06, sustain: 0.2, release: 0.07 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0xF1F8E9),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 14. THE DRAFTING TABLE
// ============================================================

const draftingTable: PortfolioTheme = {
  id: "the-drafting-table",
  name: "The Drafting Table",
  metaphor: "Architect's engineering desk",
  colors: {
    primary: "#1565C0",
    secondary: "#0D47A1",
    accent: "#42A5F5",
    background: "#E3F2FD",
    surface: "#FFFFFF",
    text: "#0D47A1",
    textMuted: "#5C6BC0",
    border: "#BBDEFB",
    success: "#43A047",
    warning: "#FFA726",
    error: "#E53935",
  },
  environment: {
    backgroundColor: 0xE3F2FD,
    ambientLight: { color: 0xF0F8FF, intensity: 0.5 },
    directionalLight: [
      { color: 0xFFFFFF, intensity: 1, position: [3, 6, 3], castShadow: true },
    ],
    objects: [
      // Drafting table
      { type: "box", position: [0, 0.4, 0], scale: [3, 0.05, 2], color: 0x8D6E63, roughness: 0.6 },
      // Blueprint paper
      { type: "plane", position: [0, 0.45, 0], rotation: [-Math.PI / 2, 0, 0], scale: [2.5, 1.8, 1], color: 0x1565C0, opacity: 0.8 },
      // Grid lines on blueprint (represented as thin boxes)
      ...Array.from({ length: 5 }, (_, i) => ({
        type: "box" as const,
        position: [-1 + i * 0.5, 0.46, 0] as [number, number, number],
        scale: [0.01, 0.01, 1.8] as [number, number, number],
        color: 0x42A5F5,
        roughness: 1,
      })),
      // T-square
      { type: "box", position: [0, 0.48, 0.8], scale: [2.5, 0.02, 0.08], color: 0x212121, roughness: 0.3, metalness: 0.5 },
      // Compass
      { type: "cylinder", position: [1.2, 0.5, -0.3], scale: [0.02, 0.3, 0.02], color: 0x9E9E9E, roughness: 0.2, metalness: 0.8 },
      // Pencils
      { type: "cylinder", position: [-1.5, 0.48, 0.5], scale: [0.03, 0.4, 0.03], color: 0xFFEB3B, roughness: 0.6 },
      { type: "cylinder", position: [-1.3, 0.48, 0.6], scale: [0.03, 0.35, 0.03], color: 0x212121, roughness: 0.6 },
      // Ruler
      { type: "box", position: [1.5, 0.48, 0.3], scale: [0.8, 0.02, 0.1], color: 0x9E9E9E, roughness: 0.3, metalness: 0.5 },
    ],
    floor: { type: "plane", color: 0xE8EAF6, size: 30 },
    particles: { count: 15, color: 0x1565C0, size: 0.02, speed: 0.2, opacity: 0.3, spread: 8 },
  },
  camera: defaultCamera([3, 2.5, 4], [0, 0.5, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Step up to the Drafting Table — precision in every line." },
    { sectionId: "projects", description: "Each project unrolls as a blueprint." },
    { sectionId: "skills", description: "Measurement diagrams of expertise." },
    { sectionId: "experience", description: "Architectural timeline of career." },
    { sectionId: "contact", description: "Submit a project requisition." },
  ]),
  hero: { title: "THE DRAFTING TABLE", subtitle: "Engineered with Precision", cameraPosition: [3, 2.5, 4], cameraTarget: [0, 0.5, 0], animation: { type: "slide", duration: 1, delay: 0.4 } },
  projects: defaultProjectConfig("card"),
  skills: defaultSkillConfig("bar"),
  experience: defaultExperienceConfig("timeline"),
  contact: defaultContactConfig("form"),
  audio: {
    ambient: { baseFrequency: 100, waveType: "sine", volume: 0.04, filter: { type: "lowpass", frequency: 200, Q: 1 } },
    interactions: {
      hover: { frequency: 440, duration: 0.08, waveType: "triangle", volume: 0.1, envelope: { attack: 0.01, decay: 0.04, sustain: 0.1, release: 0.03 } },
      click: { frequency: 880, duration: 0.12, waveType: "triangle", volume: 0.15, envelope: { attack: 0.01, decay: 0.06, sustain: 0.2, release: 0.05 } },
      drag: { frequency: 220, duration: 0.15, waveType: "sine", volume: 0.08, envelope: { attack: 0.01, decay: 0.07, sustain: 0.2, release: 0.07 } },
      open: { frequency: 660, duration: 0.2, waveType: "triangle", volume: 0.15, envelope: { attack: 0.01, decay: 0.08, sustain: 0.3, release: 0.11 } },
      close: { frequency: 330, duration: 0.15, waveType: "triangle", volume: 0.1, envelope: { attack: 0.01, decay: 0.06, sustain: 0.2, release: 0.08 } },
      submit: { frequency: 784, duration: 0.3, waveType: "triangle", volume: 0.2, envelope: { attack: 0.01, decay: 0.12, sustain: 0.3, release: 0.17 } },
      navigate: { frequency: 440, duration: 0.12, waveType: "triangle", volume: 0.1, envelope: { attack: 0.01, decay: 0.05, sustain: 0.2, release: 0.06 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0xE3F2FD),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 15. THE GEM CUTTER'S TABLE
// ============================================================

const gemCutter: PortfolioTheme = {
  id: "the-gem-cutter",
  name: "The Gem Cutter's Table",
  metaphor: "Luxury jeweler's inspection desk",
  colors: {
    primary: "#9C27B0",
    secondary: "#1A1A2E",
    accent: "#00BCD4",
    background: "#0A0A0A",
    surface: "#1A1A2E",
    text: "#E0E0E0",
    textMuted: "#909090",
    border: "#333355",
    success: "#00E676",
    warning: "#FFD740",
    error: "#FF5252",
  },
  environment: {
    backgroundColor: 0x0A0A0A,
    ambientLight: { color: 0x202040, intensity: 0.2 },
    directionalLight: [
      { color: 0xFFFFFF, intensity: 1.5, position: [0, 8, 0], castShadow: true },
      { color: 0x9C27B0, intensity: 0.3, position: [-3, 3, 3] },
      { color: 0x00BCD4, intensity: 0.3, position: [3, 3, -3] },
    ],
    objects: [
      // Velvet surface
      { type: "box", position: [0, 0.1, 0], scale: [3, 0.2, 2], color: 0x1A1A2E, roughness: 0.9 },
      // Gemstones
      { type: "octahedron" as any, position: [0, 0.5, 0], scale: [0.4, 0.4, 0.4], color: 0x9C27B0, emissive: 0x9C27B0, emissiveIntensity: 0.5, roughness: 0.1, metalness: 0.3 },
      { type: "octahedron" as any, position: [0.8, 0.4, 0.3], scale: [0.25, 0.25, 0.25], color: 0x00BCD4, emissive: 0x00BCD4, emissiveIntensity: 0.4, roughness: 0.1, metalness: 0.3 },
      { type: "octahedron" as any, position: [-0.6, 0.35, -0.2], scale: [0.2, 0.2, 0.2], color: 0xFFD740, emissive: 0xFFD740, emissiveIntensity: 0.4, roughness: 0.1, metalness: 0.3 },
      // Loupe
      { type: "torus", position: [1.2, 0.8, 0], scale: [0.3, 0.3, 0.05], color: 0xC0C0C0, roughness: 0.1, metalness: 0.9 },
      // Precision tools
      { type: "cylinder", position: [-1.2, 0.3, 0.5], scale: [0.02, 0.4, 0.02], color: 0xC0C0C0, roughness: 0.2, metalness: 0.8 },
      // Display stand
      { type: "cylinder", position: [0, 0.25, 0], scale: [0.6, 0.3, 0.6], color: 0x0A0A0A, roughness: 0.3, metalness: 0.5 },
    ],
    floor: { type: "plane", color: 0x0A0A0A, size: 30 },
    particles: { count: 50, color: 0x9C27B0, size: 0.015, speed: 0.3, opacity: 0.5, spread: 10 },
  },
  camera: defaultCamera([3, 2, 3], [0, 0.4, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Approach the Gem Cutter's Table — precision meets beauty." },
    { sectionId: "projects", description: "Each project is a faceted gemstone." },
    { sectionId: "skills", description: "Faceted stones of expertise." },
    { sectionId: "experience", description: "Engraved timeline of achievements." },
    { sectionId: "contact", description: "Submit a jewelry commission." },
  ]),
  hero: { title: "THE GEM CUTTER", subtitle: "Precision & Brilliance", cameraPosition: [3, 2, 3], cameraTarget: [0, 0.4, 0], animation: { type: "rotate", duration: 1.5, delay: 0.5 } },
  projects: defaultProjectConfig("floating"),
  skills: defaultSkillConfig("orb"),
  experience: defaultExperienceConfig("timeline"),
  contact: defaultContactConfig("form"),
  audio: {
    ambient: { baseFrequency: 60, waveType: "sine", volume: 0.04, filter: { type: "lowpass", frequency: 150, Q: 1 } },
    interactions: {
      hover: { frequency: 880, duration: 0.1, waveType: "sine", volume: 0.12, envelope: { attack: 0.01, decay: 0.05, sustain: 0.1, release: 0.04 } },
      click: { frequency: 1320, duration: 0.15, waveType: "sine", volume: 0.18, envelope: { attack: 0.01, decay: 0.07, sustain: 0.2, release: 0.07 } },
      drag: { frequency: 440, duration: 0.2, waveType: "triangle", volume: 0.08, envelope: { attack: 0.02, decay: 0.08, sustain: 0.3, release: 0.1 } },
      open: { frequency: 660, duration: 0.3, waveType: "sine", volume: 0.15, envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.19 } },
      close: { frequency: 330, duration: 0.2, waveType: "sine", volume: 0.1, envelope: { attack: 0.01, decay: 0.08, sustain: 0.2, release: 0.11 } },
      submit: { frequency: 1760, duration: 0.4, waveType: "sine", volume: 0.2, envelope: { attack: 0.01, decay: 0.15, sustain: 0.3, release: 0.24 } },
      navigate: { frequency: 880, duration: 0.15, waveType: "sine", volume: 0.12, envelope: { attack: 0.01, decay: 0.06, sustain: 0.2, release: 0.08 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0x0A0A0A),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 16. THE TROPHY ROOM
// ============================================================

const trophyRoom: PortfolioTheme = {
  id: "the-trophy-room",
  name: "The Trophy Room",
  metaphor: "Modern achievement museum",
  colors: {
    primary: "#FFD700",
    secondary: "#1A1A1A",
    accent: "#E0E0E0",
    background: "#0A0A0A",
    surface: "#1A1A1A",
    text: "#F5F5F5",
    textMuted: "#909090",
    border: "#333333",
    success: "#4CAF50",
    warning: "#FFB74D",
    error: "#E57373",
  },
  environment: {
    backgroundColor: 0x0A0A0A,
    ambientLight: { color: 0x404040, intensity: 0.3 },
    directionalLight: [
      { color: 0xFFFFFF, intensity: 1.5, position: [0, 10, 0], castShadow: true },
    ],
    pointLights: [
      { color: 0xFFD700, intensity: 0.5, position: [0, 4, 0], distance: 10, decay: 2 },
    ],
    objects: [
      // Display pedestals
      { type: "cylinder", position: [-2, 0.5, 0], scale: [0.4, 1, 0.4], color: 0x1A1A1A, roughness: 0.3, metalness: 0.5 },
      { type: "cylinder", position: [0, 0.5, 0], scale: [0.4, 1, 0.4], color: 0x1A1A1A, roughness: 0.3, metalness: 0.5 },
      { type: "cylinder", position: [2, 0.5, 0], scale: [0.4, 1, 0.4], color: 0x1A1A1A, roughness: 0.3, metalness: 0.5 },
      // Trophy on pedestal
      { type: "cone", position: [0, 1.3, 0], scale: [0.3, 0.5, 0.3], color: 0xFFD700, roughness: 0.2, metalness: 0.8, emissive: 0xFFD700, emissiveIntensity: 0.2 },
      // Plaques
      { type: "box", position: [-2, 1.3, 0], scale: [0.6, 0.3, 0.02], color: 0xC0C0C0, roughness: 0.2, metalness: 0.8 },
      { type: "box", position: [2, 1.3, 0], scale: [0.6, 0.3, 0.02], color: 0xC0C0C0, roughness: 0.2, metalness: 0.8 },
      // Glass vitrines
      { type: "box", position: [-2, 1, 0], scale: [0.8, 1, 0.8], color: 0x88CCFF, opacity: 0.1, roughness: 0.05, metalness: 0.1 },
      // Spotlight cones (visual only)
      { type: "cone", position: [0, 5, 0], scale: [2, 5, 2], color: 0xFFFFFF, opacity: 0.03 },
    ],
    floor: { type: "plane", color: 0x1A1A1A, size: 30 },
    particles: { count: 30, color: 0xFFD700, size: 0.02, speed: 0.15, opacity: 0.4, spread: 10 },
  },
  camera: defaultCamera([5, 3, 5], [0, 1, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Enter the Trophy Room — achievements on display." },
    { sectionId: "projects", description: "Each project is an exhibition piece." },
    { sectionId: "skills", description: "Engraved plaques of expertise." },
    { sectionId: "experience", description: "Milestones displayed chronologically." },
    { sectionId: "contact", description: "Sign the visitor registry." },
  ]),
  hero: { title: "THE TROPHY ROOM", subtitle: "A Legacy of Excellence", cameraPosition: [5, 3, 5], cameraTarget: [0, 1, 0], animation: { type: "fade", duration: 1.5, delay: 0.6 } },
  projects: defaultProjectConfig("physical"),
  skills: defaultSkillConfig("card"),
  experience: defaultExperienceConfig("timeline"),
  contact: defaultContactConfig("form"),
  audio: {
    ambient: { baseFrequency: 50, waveType: "sine", volume: 0.04, filter: { type: "lowpass", frequency: 120, Q: 1 } },
    interactions: {
      hover: { frequency: 523, duration: 0.12, waveType: "sine", volume: 0.1, envelope: { attack: 0.02, decay: 0.06, sustain: 0.1, release: 0.04 } },
      click: { frequency: 784, duration: 0.18, waveType: "sine", volume: 0.15, envelope: { attack: 0.01, decay: 0.08, sustain: 0.2, release: 0.09 } },
      drag: { frequency: 330, duration: 0.2, waveType: "triangle", volume: 0.08, envelope: { attack: 0.02, decay: 0.08, sustain: 0.3, release: 0.1 } },
      open: { frequency: 660, duration: 0.3, waveType: "sine", volume: 0.15, envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.18 } },
      close: { frequency: 392, duration: 0.2, waveType: "sine", volume: 0.1, envelope: { attack: 0.02, decay: 0.08, sustain: 0.2, release: 0.1 } },
      submit: { frequency: 880, duration: 0.4, waveType: "sine", volume: 0.2, envelope: { attack: 0.02, decay: 0.15, sustain: 0.3, release: 0.23 } },
      navigate: { frequency: 440, duration: 0.15, waveType: "sine", volume: 0.1, envelope: { attack: 0.02, decay: 0.06, sustain: 0.2, release: 0.07 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0x0A0A0A),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 17. THE MECHANIC'S GARAGE
// ============================================================

const mechanicsGarage: PortfolioTheme = {
  id: "the-mechanics-garage",
  name: "The Mechanic's Garage",
  metaphor: "High-performance automotive workshop",
  colors: {
    primary: "#F44336",
    secondary: "#212121",
    accent: "#FF9800",
    background: "#121212",
    surface: "#1E1E1E",
    text: "#E0E0E0",
    textMuted: "#909090",
    border: "#333333",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
  },
  environment: {
    backgroundColor: 0x121212,
    ambientLight: { color: 0x404040, intensity: 0.3 },
    directionalLight: [
      { color: 0xFFFFFF, intensity: 1.2, position: [0, 8, 3], castShadow: true },
    ],
    pointLights: [
      { color: 0xF44336, intensity: 0.4, position: [-3, 3, 0], distance: 8, decay: 2 },
      { color: 0xFF9800, intensity: 0.3, position: [3, 3, 0], distance: 8, decay: 2 },
    ],
    objects: [
      // Garage floor
      { type: "plane", position: [0, 0.01, 0], rotation: [-Math.PI / 2, 0, 0], scale: [20, 20, 1], color: 0x2A2A2A, roughness: 0.7 },
      // Tool wall
      { type: "box", position: [0, 1.5, -3], scale: [6, 3, 0.1], color: 0x333333, roughness: 0.5 },
      // Tools on wall
      { type: "box", position: [-2, 2, -2.9], scale: [0.3, 0.8, 0.05], color: 0x9E9E9E, roughness: 0.3, metalness: 0.7 },
      { type: "box", position: [-1.5, 2.2, -2.9], scale: [0.2, 0.6, 0.05], color: 0xF44336, roughness: 0.4 },
      // Hydraulic lift
      { type: "box", position: [2, 0.3, 0], scale: [2, 0.6, 3], color: 0x424242, roughness: 0.4, metalness: 0.5 },
      // Diagnostic computer
      { type: "box", position: [-2, 1, 1], scale: [0.8, 0.6, 0.5], color: 0x212121, roughness: 0.3 },
      // Car silhouette (simplified)
      { type: "box", position: [2, 1.2, 0], scale: [3, 0.8, 1.5], color: 0x1A1A1A, roughness: 0.3, metalness: 0.6 },
    ],
    floor: { type: "plane", color: 0x1E1E1E, size: 40 },
    particles: { count: 20, color: 0xFF9800, size: 0.015, speed: 0.4, opacity: 0.3, spread: 10 },
  },
  camera: defaultCamera([6, 3, 6], [0, 1, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Pull into the Garage — high-performance engineering." },
    { sectionId: "projects", description: "Each project is a vehicle component." },
    { sectionId: "skills", description: "Diagnostic gauges measure expertise." },
    { sectionId: "experience", description: "Service history of career." },
    { sectionId: "contact", description: "Submit a service request." },
  ]),
  hero: { title: "THE GARAGE", subtitle: "High-Performance Development", cameraPosition: [6, 3, 6], cameraTarget: [0, 1, 0], animation: { type: "slide", duration: 1, delay: 0.4 } },
  projects: defaultProjectConfig("physical"),
  skills: defaultSkillConfig("bar"),
  experience: defaultExperienceConfig("timeline"),
  contact: defaultContactConfig("form"),
  audio: {
    ambient: { baseFrequency: 60, waveType: "sawtooth", volume: 0.03, filter: { type: "lowpass", frequency: 120, Q: 1 } },
    interactions: {
      hover: { frequency: 440, duration: 0.08, waveType: "square", volume: 0.12, envelope: { attack: 0.01, decay: 0.04, sustain: 0.1, release: 0.03 } },
      click: { frequency: 880, duration: 0.12, waveType: "sawtooth", volume: 0.18, envelope: { attack: 0.01, decay: 0.06, sustain: 0.2, release: 0.05 } },
      drag: { frequency: 220, duration: 0.15, waveType: "sawtooth", volume: 0.1, envelope: { attack: 0.01, decay: 0.07, sustain: 0.2, release: 0.07 } },
      open: { frequency: 660, duration: 0.2, waveType: "square", volume: 0.15, envelope: { attack: 0.01, decay: 0.08, sustain: 0.3, release: 0.11 } },
      close: { frequency: 330, duration: 0.15, waveType: "square", volume: 0.1, envelope: { attack: 0.01, decay: 0.06, sustain: 0.2, release: 0.08 } },
      submit: { frequency: 1100, duration: 0.3, waveType: "sawtooth", volume: 0.2, envelope: { attack: 0.01, decay: 0.12, sustain: 0.3, release: 0.17 } },
      navigate: { frequency: 550, duration: 0.12, waveType: "square", volume: 0.12, envelope: { attack: 0.01, decay: 0.05, sustain: 0.2, release: 0.06 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0x121212),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 18. THE ARCHITECT'S STUDY
// ============================================================

const architectsStudy: PortfolioTheme = {
  id: "the-architects-study",
  name: "The Architect's Study",
  metaphor: "Executive rolltop desk",
  colors: {
    primary: "#2E7D32",
    secondary: "#5D4037",
    accent: "#C9A84C",
    background: "#1A1208",
    surface: "#2A1A0A",
    text: "#F5E6D3",
    textMuted: "#A08060",
    border: "#3D2E1E",
    success: "#4CAF50",
    warning: "#FFB74D",
    error: "#E57373",
  },
  environment: {
    backgroundColor: 0x1A1208,
    fog: { color: 0x1A1208, near: 8, far: 20 },
    ambientLight: { color: 0xFFE4B5, intensity: 0.3 },
    directionalLight: [
      { color: 0xFFD700, intensity: 0.8, position: [3, 5, 3], castShadow: true },
    ],
    pointLights: [
      { color: 0xFFD700, intensity: 0.5, position: [0, 3, 0], distance: 8, decay: 2 },
    ],
    objects: [
      // Rolltop desk
      { type: "box", position: [0, 0.4, 0], scale: [3, 0.8, 1.5], color: 0x5D4037, roughness: 0.6, castShadow: true },
      // Desk surface
      { type: "box", position: [0, 0.85, 0.3], scale: [2.8, 0.05, 1], color: 0x4A2C0A, roughness: 0.5 },
      // Green felt pad
      { type: "plane", position: [0, 0.88, 0.3], rotation: [-Math.PI / 2, 0, 0], scale: [1.5, 0.8, 1], color: 0x2E7D32, roughness: 0.95 },
      // Fountain pen
      { type: "cylinder", position: [0.5, 0.92, 0.2], scale: [0.02, 0.3, 0.02], color: 0x1A1A1A, roughness: 0.2, metalness: 0.8 },
      // Brass drawers
      { type: "box", position: [1, 1.2, 0], scale: [0.8, 0.8, 1], color: 0x5D4037, roughness: 0.5 },
      { type: "box", position: [1, 1.2, 0.51], scale: [0.6, 0.15, 0.02], color: 0xC9A84C, roughness: 0.2, metalness: 0.8 },
      // Stationery
      { type: "plane", position: [-0.8, 0.9, 0.2], rotation: [-Math.PI / 2, 0, 0.1], scale: [0.6, 0.8, 1], color: 0xFFFDF5, roughness: 0.95 },
      // Leather chair
      { type: "box", position: [0, 0.5, 2], scale: [1, 1, 0.8], color: 0x3D2E1E, roughness: 0.8 },
    ],
    floor: { type: "plane", color: 0x2A1A0A, size: 30 },
    particles: { count: 15, color: 0xC9A84C, size: 0.02, speed: 0.15, opacity: 0.3, spread: 8 },
  },
  camera: defaultCamera([4, 2.5, 4], [0, 0.8, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Enter the Architect's Study — strategic thinking." },
    { sectionId: "projects", description: "Each project is a folder to open." },
    { sectionId: "skills", description: "Desk compartments hold expertise." },
    { sectionId: "experience", description: "Documents of career history." },
    { sectionId: "contact", description: "Write a handwritten letter." },
  ]),
  hero: { title: "THE ARCHITECT'S STUDY", subtitle: "Strategic Architecture", cameraPosition: [4, 2.5, 4], cameraTarget: [0, 0.8, 0], animation: { type: "fade", duration: 1.5, delay: 0.6 } },
  projects: defaultProjectConfig("card"),
  skills: defaultSkillConfig("card"),
  experience: defaultExperienceConfig("book"),
  contact: defaultContactConfig("letter"),
  audio: {
    ambient: { baseFrequency: 70, waveType: "sine", volume: 0.04, filter: { type: "lowpass", frequency: 150, Q: 1 } },
    interactions: {
      hover: { frequency: 330, duration: 0.1, waveType: "sine", volume: 0.1, envelope: { attack: 0.02, decay: 0.05, sustain: 0.1, release: 0.03 } },
      click: { frequency: 523, duration: 0.15, waveType: "triangle", volume: 0.15, envelope: { attack: 0.01, decay: 0.07, sustain: 0.2, release: 0.07 } },
      drag: { frequency: 220, duration: 0.2, waveType: "sine", volume: 0.08, envelope: { attack: 0.02, decay: 0.08, sustain: 0.3, release: 0.1 } },
      open: { frequency: 440, duration: 0.25, waveType: "triangle", volume: 0.15, envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.13 } },
      close: { frequency: 262, duration: 0.2, waveType: "triangle", volume: 0.1, envelope: { attack: 0.02, decay: 0.08, sustain: 0.2, release: 0.1 } },
      submit: { frequency: 660, duration: 0.35, waveType: "sine", volume: 0.2, envelope: { attack: 0.02, decay: 0.12, sustain: 0.3, release: 0.21 } },
      navigate: { frequency: 392, duration: 0.15, waveType: "triangle", volume: 0.1, envelope: { attack: 0.02, decay: 0.06, sustain: 0.2, release: 0.07 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0x1A1208),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 19. THE PROJECTION ROOM
// ============================================================

const projectionRoom: PortfolioTheme = {
  id: "the-projection-room",
  name: "The Projection Room",
  metaphor: "Vintage 35mm cinema projection booth",
  colors: {
    primary: "#FF8F00",
    secondary: "#1A1A1A",
    accent: "#FFD54F",
    background: "#0A0A0A",
    surface: "#1A1A1A",
    text: "#F5F5F5",
    textMuted: "#909090",
    border: "#333333",
    success: "#4CAF50",
    warning: "#FFB74D",
    error: "#E57373",
  },
  environment: {
    backgroundColor: 0x0A0A0A,
    ambientLight: { color: 0x202020, intensity: 0.2 },
    directionalLight: [
      { color: 0xFF8F00, intensity: 0.6, position: [0, 5, 3], castShadow: true },
    ],
    pointLights: [
      { color: 0xFF8F00, intensity: 0.8, position: [0, 3, 0], distance: 10, decay: 2 },
    ],
    objects: [
      // Projector
      { type: "box", position: [0, 1.2, -2], scale: [0.8, 0.6, 0.6], color: 0x2A2A2A, roughness: 0.4, metalness: 0.6 },
      // Film reels
      { type: "torus", position: [-0.5, 1.8, -2], scale: [0.3, 0.3, 0.05], color: 0x1A1A1A, roughness: 0.3, metalness: 0.7 },
      { type: "torus", position: [0.5, 1.8, -2], scale: [0.3, 0.3, 0.05], color: 0x1A1A1A, roughness: 0.3, metalness: 0.7 },
      // Screen
      { type: "plane", position: [0, 2, 3], scale: [6, 4, 1], color: 0xF5F5F5, roughness: 0.95 },
      // Light beam (cone from projector)
      { type: "cone", position: [0, 1.5, 0.5], scale: [2, 4, 2], color: 0xFF8F00, opacity: 0.03, rotation: [0, 0, 0] },
      // Marquee
      { type: "box", position: [0, 3.5, 3], scale: [4, 0.3, 0.1], color: 0xFFD54F, emissive: 0xFFD54F, emissiveIntensity: 0.3 },
      // Film strips
      { type: "box", position: [2, 1, -1], scale: [0.1, 2, 0.02], color: 0x1A1A1A, roughness: 0.3 },
    ],
    floor: { type: "plane", color: 0x1A1A1A, size: 30 },
    particles: { count: 40, color: 0xFF8F00, size: 0.015, speed: 0.3, opacity: 0.4, spread: 10 },
  },
  camera: defaultCamera([5, 2.5, 5], [0, 1.5, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "Enter the Projection Room — the show begins." },
    { sectionId: "projects", description: "Each project is a film reel to play." },
    { sectionId: "skills", description: "Credits sequence of technologies." },
    { sectionId: "experience", description: "Career film timeline." },
    { sectionId: "contact", description: "Submit your film request." },
  ]),
  hero: { title: "THE PROJECTION ROOM", subtitle: "Lights, Camera, Code", cameraPosition: [5, 2.5, 5], cameraTarget: [0, 1.5, 0], animation: { type: "fade", duration: 2, delay: 0.8 } },
  projects: defaultProjectConfig("floating"),
  skills: defaultSkillConfig("bar"),
  experience: defaultExperienceConfig("timeline"),
  contact: defaultContactConfig("form"),
  audio: {
    ambient: { baseFrequency: 50, waveType: "sawtooth", volume: 0.03, filter: { type: "lowpass", frequency: 100, Q: 1 } },
    interactions: {
      hover: { frequency: 440, duration: 0.1, waveType: "square", volume: 0.1, envelope: { attack: 0.01, decay: 0.04, sustain: 0.1, release: 0.05 } },
      click: { frequency: 880, duration: 0.15, waveType: "square", volume: 0.15, envelope: { attack: 0.01, decay: 0.06, sustain: 0.2, release: 0.08 } },
      drag: { frequency: 220, duration: 0.2, waveType: "sawtooth", volume: 0.08, envelope: { attack: 0.01, decay: 0.08, sustain: 0.3, release: 0.11 } },
      open: { frequency: 660, duration: 0.3, waveType: "square", volume: 0.15, envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.19 } },
      close: { frequency: 330, duration: 0.2, waveType: "square", volume: 0.1, envelope: { attack: 0.01, decay: 0.08, sustain: 0.2, release: 0.11 } },
      submit: { frequency: 1100, duration: 0.4, waveType: "square", volume: 0.2, envelope: { attack: 0.01, decay: 0.15, sustain: 0.3, release: 0.24 } },
      navigate: { frequency: 550, duration: 0.15, waveType: "square", volume: 0.1, envelope: { attack: 0.01, decay: 0.06, sustain: 0.2, release: 0.08 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0x0A0A0A),
  mobileFallback: defaultMobile(),
};

// ============================================================
// 20. PRAJWAL PREMIUM
// ============================================================

const prajwalPremium: PortfolioTheme = {
  id: "prajwal-premium",
  name: "Prajwal Premium",
  metaphor: "Precision operating system",
  colors: {
    primary: "#00C853",
    secondary: "#0A0A0A",
    accent: "#00E676",
    background: "#000000",
    surface: "#0A0A0A",
    text: "#FFFFFF",
    textMuted: "#666666",
    border: "#1A1A1A",
    success: "#00C853",
    warning: "#FFD740",
    error: "#FF5252",
  },
  environment: {
    backgroundColor: 0x000000,
    ambientLight: { color: 0x202020, intensity: 0.2 },
    directionalLight: [
      { color: 0x00C853, intensity: 0.4, position: [3, 5, 3] },
    ],
    pointLights: [
      { color: 0x00C853, intensity: 0.3, position: [0, 3, 0], distance: 8, decay: 2 },
    ],
    objects: [
      // Minimal grid floor
      { type: "plane", position: [0, 0, 0], rotation: [-Math.PI / 2, 0, 0], scale: [30, 30, 1], color: 0x0A0A0A, roughness: 0.9 },
      // Terminal window
      { type: "box", position: [0, 1.5, -2], scale: [4, 2.5, 0.05], color: 0x0A0A0A, roughness: 0.3, metalness: 0.2 },
      // System status indicators
      { type: "sphere", position: [-1.5, 2.2, -1.9], scale: [0.05, 0.05, 0.05], color: 0x00C853, emissive: 0x00C853, emissiveIntensity: 1 },
      { type: "sphere", position: [-1.2, 2.2, -1.9], scale: [0.05, 0.05, 0.05], color: 0x00C853, emissive: 0x00C853, emissiveIntensity: 1 },
      { type: "sphere", position: [-0.9, 2.2, -1.9], scale: [0.05, 0.05, 0.05], color: 0xFFD740, emissive: 0xFFD740, emissiveIntensity: 0.5 },
      // Telemetry bars
      ...Array.from({ length: 8 }, (_, i) => ({
        type: "box" as const,
        position: [-1.5 + i * 0.4, 0.8, -1.9] as [number, number, number],
        scale: [0.2, 0.3 + Math.random() * 0.5, 0.05] as [number, number, number],
        color: 0x00C853,
        emissive: 0x00C853,
        emissiveIntensity: 0.3,
        roughness: 0.3,
      })),
    ],
    floor: { type: "grid", color: 0x1A1A1A, size: 30 },
    particles: { count: 30, color: 0x00C853, size: 0.01, speed: 0.2, opacity: 0.4, spread: 12 },
  },
  camera: defaultCamera([4, 2, 4], [0, 1, 0]),
  navigation: defaultTour([
    { sectionId: "hero", description: "System online. Welcome to Prajwal Premium." },
    { sectionId: "projects", description: "System modules represent projects." },
    { sectionId: "skills", description: "Live telemetry bars of expertise." },
    { sectionId: "experience", description: "Terminal timeline of career." },
    { sectionId: "contact", description: "Open support simulator." },
  ]),
  hero: { title: "PRAJWAL DL", subtitle: "FULL STACK DEVELOPER · WEB ADVISOR", cameraPosition: [4, 2, 4], cameraTarget: [0, 1, 0], animation: { type: "fade", duration: 0.8, delay: 0.3 } },
  projects: defaultProjectConfig("floating"),
  skills: defaultSkillConfig("bar"),
  experience: defaultExperienceConfig("timeline"),
  contact: defaultContactConfig("terminal"),
  audio: {
    ambient: { baseFrequency: 40, waveType: "sine", volume: 0.02, filter: { type: "lowpass", frequency: 80, Q: 1 } },
    interactions: {
      hover: { frequency: 1200, duration: 0.03, waveType: "sine", volume: 0.08, envelope: { attack: 0.005, decay: 0.015, sustain: 0.1, release: 0.01 } },
      click: { frequency: 1800, duration: 0.05, waveType: "sine", volume: 0.12, envelope: { attack: 0.005, decay: 0.02, sustain: 0.2, release: 0.025 } },
      drag: { frequency: 600, duration: 0.08, waveType: "triangle", volume: 0.05, envelope: { attack: 0.01, decay: 0.03, sustain: 0.2, release: 0.04 } },
      open: { frequency: 1500, duration: 0.1, waveType: "sine", volume: 0.1, envelope: { attack: 0.005, decay: 0.04, sustain: 0.2, release: 0.055 } },
      close: { frequency: 800, duration: 0.08, waveType: "sine", volume: 0.08, envelope: { attack: 0.005, decay: 0.03, sustain: 0.1, release: 0.045 } },
      submit: { frequency: 2000, duration: 0.15, waveType: "sine", volume: 0.15, envelope: { attack: 0.005, decay: 0.05, sustain: 0.3, release: 0.095 } },
      navigate: { frequency: 1000, duration: 0.06, waveType: "sine", volume: 0.08, envelope: { attack: 0.005, decay: 0.025, sustain: 0.1, release: 0.03 } },
    },
    startsMuted: true,
  },
  loading: defaultLoading(0x000000),
  mobileFallback: defaultMobile(),
};

// ============================================================
// EXPORT ALL THEMES
// ============================================================

export const allThemes: PortfolioTheme[] = [
  workshop,
  observatory,
  toyChest,
  reservoir,
  ledger,
  switchboard,
  printShop,
  readingRoom,
  greenhouse,
  arcade,
  potteryStudio,
  tradeGlobe,
  herbarium,
  draftingTable,
  gemCutter,
  trophyRoom,
  mechanicsGarage,
  architectsStudy,
  projectionRoom,
  prajwalPremium,
];

export const themeMap: Record<string, PortfolioTheme> = Object.fromEntries(
  allThemes.map((t) => [t.id, t])
);

export function getThemeById(id: string): PortfolioTheme {
  return themeMap[id] ?? workshop;
}
