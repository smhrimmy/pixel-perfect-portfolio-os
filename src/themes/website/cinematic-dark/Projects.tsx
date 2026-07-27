import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    title: "NeuraNet",
    category: "AI Architecture",
    description: "Distributed neural network training platform with real-time visualization.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop"
  },
  {
    title: "Quantum UX",
    category: "Web Development",
    description: "Next-generation design system featuring fluid physics and WebGL.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop"
  },
  {
    title: "OmniSync",
    category: "Cloud Native",
    description: "Real-time edge computing synchronization engine for IoT devices.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2872&auto=format&fit=crop"
  }
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Title overlay */}
        <div className="absolute top-12 md:top-24 left-6 md:left-12 lg:left-24 z-10 pointer-events-none mix-blend-difference">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Selected<br/>Works
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-12 md:gap-24 px-6 md:px-12 lg:px-24">
          {PROJECTS.map((project, idx) => (
            <div 
              key={idx} 
              className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] md:h-[70vh] flex-shrink-0 group cursor-pointer"
            >
              <div className="w-full h-full overflow-hidden rounded-xl border border-white/10 bg-white/5 relative">
                {/* Image */}
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 pointer-events-none">
                  <p className="text-cyan-400 font-mono text-xs md:text-sm tracking-widest uppercase mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base max-w-md font-light leading-relaxed mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <span className="uppercase text-sm tracking-wider">View Case Study</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
