import { motion } from "framer-motion";

export function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#050505]">
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Aurora / Glows */}
      <motion.div 
        animate={{ 
          x: [0, 50, -50, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.1, 0.9, 1] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[120px]"
      />
      <motion.div 
        animate={{ 
          x: [0, -60, 40, 0],
          y: [0, 50, -40, 0],
          scale: [1, 1.2, 0.8, 1] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-purple-600/10 blur-[120px]"
      />
      <motion.div 
        animate={{ 
          x: [0, 30, -20, 0],
          y: [0, -50, 20, 0],
          scale: [1, 0.9, 1.1, 1] 
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/10 blur-[100px]"
      />
    </div>
  );
}
