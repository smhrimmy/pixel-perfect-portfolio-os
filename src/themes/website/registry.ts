import { lazy, type ComponentType } from "react";
import type { ThemeRendererProps } from "../types";

export type ThemeEntry = {
  id: string;
  name: string;
  category?: string;
  component: ComponentType<ThemeRendererProps | any>;
};

// Lazy-loaded component singletons
const TheWorkshopComp = lazy(() => import("./the-workshop"));
const TheObservatoryComp = lazy(() => import("./galaxy-cosmos"));
const TheToyChestComp = lazy(() => import("./playful-3d"));
const TheLedgerComp = lazy(() => import("./minimal-mono"));
const TheSwitchboardComp = lazy(() => import("./terminal-green"));
const ThePrintShopComp = lazy(() => import("./brutalist-neon"));
const TheReadingRoomComp = lazy(() => import("./editorial-serif"));
const TheGreenhouseComp = lazy(() => import("./glass-morph"));
const TheArcadeCabinetComp = lazy(() => import("./cyber-magenta"));
const ThePottersStudioComp = lazy(() => import("./sunset-paper"));
const TheTradeRouteGlobeComp = lazy(() => import("./galaxy-globe"));
const TheHerbariumComp = lazy(() => import("./aurora-mint"));
const TheDraftingTableComp = lazy(() => import("./paper-print"));
const TheGemCuttersTableComp = lazy(() => import("./holographic"));
const TheTrophyRoomComp = lazy(() => import("./agency-bold"));
const TheMechanicsGarageComp = lazy(() => import("./dev-showcase"));
const TheArchitectsStudyComp = lazy(() => import("./macos-desktop"));
const TheProjectionRoomComp = lazy(() => import("./cinematic-dark/Theme"));
const NoirAuroraComp = lazy(() => import("./noir-aurora"));
const PrajwalPremiumComp = lazy(() => import("./prajwal-premium"));

// Registry mapping new physical IDs + legacy alias IDs
export const websiteThemes: Record<string, ThemeEntry> = {
  // 0. The Workshop (Flagship 3D Workbench & Tangible Artifacts)
  "the-workshop": { id: "the-workshop", name: "The Workshop", category: "Warm 3D Workbench · Tangible Artifacts", component: TheWorkshopComp },
  "workshop": { id: "workshop", name: "The Workshop", category: "Warm 3D Workbench · Tangible Artifacts", component: TheWorkshopComp },

  // 1. The Observatory (1800s Brass Orrery)
  "the-observatory": { id: "the-observatory", name: "The Observatory", category: "1800s Brass Orrery & Refractor Lens", component: TheObservatoryComp },
  "galaxy-cosmos": { id: "galaxy-cosmos", name: "The Observatory", category: "1800s Brass Orrery & Refractor Lens", component: TheObservatoryComp },

  // 2. The Toy Chest (Miniature Dioramas)
  "the-toy-chest": { id: "the-toy-chest", name: "The Toy Chest", category: "Wooden Shoebox Dioramas · Stop-Motion", component: TheToyChestComp },
  "playful-3d": { id: "playful-3d", name: "The Toy Chest", category: "Wooden Shoebox Dioramas · Stop-Motion", component: TheToyChestComp },

  // 3. The Ledger (Card Catalog Drawer - Sub-50KB)
  "the-ledger": { id: "the-ledger", name: "The Ledger", category: "Card-Catalog Drawer · Sub-50KB", component: TheLedgerComp },
  "minimal-mono": { id: "minimal-mono", name: "The Ledger", category: "Card-Catalog Drawer · Sub-50KB", component: TheLedgerComp },

  // 4. The Switchboard (Operator Patch Cables)
  "the-switchboard": { id: "the-switchboard", name: "The Switchboard", category: "Bakelite Switchboard & Patch Cables", component: TheSwitchboardComp },
  "terminal-green": { id: "terminal-green", name: "The Switchboard", category: "Bakelite Switchboard & Patch Cables", component: TheSwitchboardComp },

  // 5. The Print Shop (Letterpress Workshop)
  "the-print-shop": { id: "the-print-shop", name: "The Print Shop", category: "Letterpress Cylinder Press & Cotton Rag", component: ThePrintShopComp },
  "brutalist-neon": { id: "brutalist-neon", name: "The Print Shop", category: "Letterpress Cylinder Press & Cotton Rag", component: ThePrintShopComp },

  // 6. The Reading Room (Private Library)
  "the-reading-room": { id: "the-reading-room", name: "The Reading Room", category: "Mahogany Shelves & Desk Lamp Pool", component: TheReadingRoomComp },
  "editorial-serif": { id: "editorial-serif", name: "The Reading Room", category: "Mahogany Shelves & Desk Lamp Pool", component: TheReadingRoomComp },

  // 7. The Greenhouse (Glasshouse Condensation)
  "the-greenhouse": { id: "the-greenhouse", name: "The Greenhouse", category: "Glasshouse Condensation & Flora", component: TheGreenhouseComp },
  "glass-morph": { id: "glass-morph", name: "The Greenhouse", category: "Glasshouse Condensation & Flora", component: TheGreenhouseComp },

  // 8. The Arcade Cabinet (3D CRT Arcade)
  "the-arcade-cabinet": { id: "the-arcade-cabinet", name: "The Arcade Cabinet", category: "3D Retro Arcade & Curved CRT", component: TheArcadeCabinetComp },
  "cyber-magenta": { id: "cyber-magenta", name: "The Arcade Cabinet", category: "3D Retro Arcade & Curved CRT", component: TheArcadeCabinetComp },

  // 9. The Potter's Studio (Wheel-Thrown Clay)
  "the-potters-studio": { id: "the-potters-studio", name: "The Potter's Studio", category: "Pottery Wheel & Wood Kiln 1300°C", component: ThePottersStudioComp },
  "sunset-paper": { id: "sunset-paper", name: "The Potter's Studio", category: "Pottery Wheel & Wood Kiln 1300°C", component: ThePottersStudioComp },

  // 10. The Trade Route Globe (Antique Desk Globe)
  "the-trade-route-globe": { id: "the-trade-route-globe", name: "The Trade Route Globe", category: "Antique Wooden Globe & Brass Pins", component: TheTradeRouteGlobeComp },
  "galaxy-globe": { id: "galaxy-globe", name: "The Trade Route Globe", category: "Antique Wooden Globe & Brass Pins", component: TheTradeRouteGlobeComp },

  // 11. The Herbarium (Botanical Specimen Folio)
  "the-herbarium": { id: "the-herbarium", name: "The Herbarium", category: "Pressed Botanical Specimens Under Glass", component: TheHerbariumComp },
  "aurora-mint": { id: "aurora-mint", name: "The Herbarium", category: "Pressed Botanical Specimens Under Glass", component: TheHerbariumComp },

  // 12. The Drafting Table (Architect Blueprints)
  "the-drafting-table": { id: "the-drafting-table", name: "The Drafting Table", category: "Architect Blueprints & T-Square", component: TheDraftingTableComp },
  "paper-print": { id: "paper-print", name: "The Drafting Table", category: "Architect Blueprints & T-Square", component: TheDraftingTableComp },

  // 13. The Gem Cutter's Table (Jeweler's Loupe)
  "the-gem-cutters-table": { id: "the-gem-cutters-table", name: "The Gem Cutter's Table", category: "Faceted Gems on Velvet & 10X Loupe", component: TheGemCuttersTableComp },
  "holographic": { id: "holographic", name: "The Gem Cutter's Table", category: "Faceted Gems on Velvet & 10X Loupe", component: TheGemCuttersTableComp },

  // 14. The Trophy Room (Spotlit Pedestals)
  "the-trophy-room": { id: "the-trophy-room", name: "The Trophy Room", category: "Museum Display Cases & Brass Plaques", component: TheTrophyRoomComp },
  "agency-bold": { id: "agency-bold", name: "The Trophy Room", category: "Museum Display Cases & Brass Plaques", component: TheTrophyRoomComp },

  // 15. The Mechanic's Garage (Engine Bay)
  "the-mechanics-garage": { id: "the-mechanics-garage", name: "The Mechanic's Garage", category: "Open Engine Bay & Greased Clipboard", component: TheMechanicsGarageComp },
  "dev-showcase": { id: "dev-showcase", name: "The Mechanic's Garage", category: "Open Engine Bay & Greased Clipboard", component: TheMechanicsGarageComp },

  // 16. The Architect's Study (Rolltop Oak Desk)
  "the-architects-study": { id: "the-architects-study", name: "The Architect's Study", category: "Rolltop Oak Desk & Sliding Drawers", component: TheArchitectsStudyComp },
  "macos-desktop": { id: "macos-desktop", name: "The Architect's Study", category: "Rolltop Oak Desk & Sliding Drawers", component: TheArchitectsStudyComp },

  // 17. The Projection Room (35mm Nitrate Cinema)
  "the-projection-room": { id: "the-projection-room", name: "The Projection Room", category: "35mm Projection Booth & Nitrate Film", component: TheProjectionRoomComp },
  "cinematic-dark": { id: "cinematic-dark", name: "The Projection Room", category: "35mm Projection Booth & Nitrate Film", component: TheProjectionRoomComp },

  // Core Executive Themes
  "noir-aurora": { id: "noir-aurora", name: "Noir Aurora", category: "Dark SaaS Minimalism · Pulsing Aurora", component: NoirAuroraComp },
  "prajwal-premium": { id: "prajwal-premium", name: "Prajwal Premium 2026", category: "Flagship Executive Telemetry Engine", component: PrajwalPremiumComp },
};

export function resolveWebsiteTheme(id: string): ThemeEntry {
  return websiteThemes[id] ?? websiteThemes["the-workshop"];
}
