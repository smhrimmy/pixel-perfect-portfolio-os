import { type ThemeProps } from "../registry";
import { ScrollProvider } from "./ScrollProvider";
import { Cursor } from "./Cursor";
import { Background } from "./Background";
import { Hero } from "./Hero";
import { About } from "./About";
import { Projects } from "./Projects";

export default function CinematicDarkTheme({ content }: ThemeProps) {
  return (
    <ScrollProvider>
      <div className="relative bg-[#020617] text-white w-full min-h-screen selection:bg-cyan-500/30 font-sans">
        
        {/* Fixed 3D Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Background />
        </div>
        
        {/* Scrollable Content */}
        <main className="relative z-10 w-full flex flex-col">
          <Hero />
          
          <div className="relative">
            <About />
          </div>

          <div id="work" className="relative z-20 bg-[#020617]">
            <Projects />
          </div>
        </main>
        
        <Cursor />
      </div>
    </ScrollProvider>
  );
}
