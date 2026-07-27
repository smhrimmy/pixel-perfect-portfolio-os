import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ThemeProps } from "./registry";

export default function Playful3D({ content }: ThemeProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // When unmounting or mounting, ensure we control body overflow if needed.
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="w-full h-[100dvh] bg-[#1d1d1d] text-white flex flex-col relative overflow-hidden font-sans">
      
      {/* Loading Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#ffb8a3]"
          >
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white/80 font-medium tracking-widest uppercase text-sm">Loading Physics Engine...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D WebGL Canvas Wrapper */}
      <div className="relative w-full h-full">
        <iframe
          src="/playful-3d/index.html"
          title="Playful 3D Portfolio"
          className="w-full h-full border-none"
          onLoad={() => setIsLoaded(true)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-scripts allow-same-origin"
        />

        {/* Minimal UI Overlay for React context */}
        <div className="absolute top-4 left-4 z-40 pointer-events-none">
          <h1 className="text-2xl font-black drop-shadow-md mix-blend-difference text-white">Playful 3D</h1>
          <p className="text-sm font-medium drop-shadow-md mix-blend-difference text-white/70">Drive the car to explore.</p>
        </div>
      </div>

    </div>
  );
}
