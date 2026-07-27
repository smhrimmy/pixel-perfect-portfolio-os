import { useEffect } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Refresh ScrollTrigger when Lenis updates
    ScrollTrigger.refresh();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true, orientation: "vertical" }}>
      {children}
    </ReactLenis>
  );
}
