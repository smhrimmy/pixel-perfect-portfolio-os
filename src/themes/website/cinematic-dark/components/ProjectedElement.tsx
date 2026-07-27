import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { camera } from "../three-engine/core/camera";
import { sizes } from "../reference-port/utils/sizes";
import { sceneWeightsInOut } from "../reference-port/animations/scenes";
import gsap from "gsap";

export function ProjectedElement({ point, children }: { point: Vector3, children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let lastTransform = "";
    
    const updatePosition = () => {
      if (!wrapperRef.current) return;
      if (sceneWeightsInOut.about.in === 0) return;
      if (sceneWeightsInOut.about.out === 1) return;

      const isLandscape = sizes.isLandscape;
      const screenPos = isLandscape ? camera.project(point) : { x: 0, y: 0 };
      const transform = isLandscape ? `translate(${screenPos.x}px, ${screenPos.y}px)` : `translate(0px, 0px)`;

      if (transform !== lastTransform) {
        wrapperRef.current.style.transform = transform;
        lastTransform = transform;
      }
    };

    gsap.ticker.add(updatePosition);
    return () => gsap.ticker.remove(updatePosition);
  }, [point]);

  return (
    <div ref={wrapperRef} className="w-full h-full lg:w-0 lg:h-0 lg:relative">
      {children}
    </div>
  );
}
