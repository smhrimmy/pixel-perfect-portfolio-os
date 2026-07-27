import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ThemeProps } from "./registry";

export default function Playful3D({ content }: ThemeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReadyToStart, setIsReadyToStart] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'physics-loaded') {
        setIsReadyToStart(true);
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('message', handleMessage);
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
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#1a1a1a]"
          >
            {!isReadyToStart ? (
              <>
                <div className="w-16 h-16 border-4 border-[#32ffce] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-[#32ffce]/80 font-medium tracking-widest uppercase text-sm">Loading Physics Engine...</p>
              </>
            ) : (
              <button 
                onClick={() => setIsLoaded(true)}
                className="px-8 py-4 bg-[#32ffce] text-[#1a1a1a] font-bold tracking-wider uppercase rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(50,255,206,0.4)]"
              >
                Start Engine
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D WebGL Canvas Wrapper */}
      <div className="relative w-full h-full">
        <iframe
          src="/playful-3d/index.html"
          title="Playful 3D Portfolio"
          className="w-full h-full border-none"
          // onLoad is handled by postMessage now, but we keep it here just in case as a fallback
          // onLoad={() => setIsLoaded(true)}
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
