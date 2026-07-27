import { type ThemeProps } from "../registry";
import { ScrollProvider } from "./ScrollProvider";
import { Cursor } from "./Cursor";
import { Background } from "./Background";
import { Hero } from "./Hero";

export default function CinematicDarkTheme({ content }: ThemeProps) {
  return (
    <ScrollProvider>
      <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-purple-500/30">
        <Background />
        <Cursor />
        
        <main>
          <Hero />
          {/* We will add About, Skills, Projects, Experience, Services, Contact here */}
          <div className="h-screen flex items-center justify-center text-gray-500">
            More sections coming soon...
          </div>
        </main>
      </div>
    </ScrollProvider>
  );
}
