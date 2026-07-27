import { useEffect, useRef } from "react";
import { three } from "./three-engine/index";
import { initHowler, destroyHowler } from "./reference-port/features/sounds/composables/useHowler";

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    initHowler();
    if (canvasRef.current) {
      three.init(canvasRef.current);
    }
    return () => {
      three.destroy();
      destroyHowler();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#050505]">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block" 
      />
    </div>
  );
}
