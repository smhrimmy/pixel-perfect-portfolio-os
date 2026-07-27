import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center lg:justify-start px-6 md:px-12 lg:px-[10vw] overflow-hidden pointer-events-none">
      <div className="relative z-10 flex flex-col lg:mt-[-10vh]">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="text-[12vw] lg:text-[9vw] font-black tracking-tight text-white leading-[0.9] pointer-events-auto drop-shadow-2xl"
        >
          Prajwal<br />D L
        </motion.h1>
        
        <motion.div 
          initial={{ rotate: -5, y: 50, opacity: 0 }}
          animate={{ rotate: -5, y: "65%", opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
          className="absolute bottom-4 right-0 lg:-right-12 z-20 pointer-events-auto origin-bottom-left bg-white text-black px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm shadow-2xl border border-white/20 whitespace-nowrap"
        >
          AI Engineer
        </motion.div>
      </div>
    </div>
  );
}
