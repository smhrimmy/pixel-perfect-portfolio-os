import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import SplitType from "split-type";
import { ArrowDownRight } from "lucide-react";

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;

    const text = new SplitType(headlineRef.current, { types: "lines, words, chars" });
    
    const ctx = gsap.context(() => {
      gsap.from(text.chars, {
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 1.2,
      });
    }, containerRef);

    return () => {
      ctx.revert();
      text.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20"
    >
      <div className="max-w-6xl mx-auto w-full z-10">
        <h1 
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.1] [perspective:1000px]"
        >
          I Build AI Powered <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
            Digital Experiences.
          </span>
        </h1>
        
        <p className="hero-sub mt-8 text-lg md:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed">
          Full Stack Developer creating intelligent products,
          beautiful interfaces, and scalable cloud applications.
        </p>

        <div className="mt-12 flex flex-wrap gap-6">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#work"
            className="hero-cta group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium text-lg transition-colors hover:bg-gray-200"
          >
            Explore Work
            <ArrowDownRight className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform duration-300" />
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="hero-cta flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg text-white border border-white/20 hover:border-white/50 transition-colors backdrop-blur-sm"
          >
            Hire Me
          </motion.a>
        </div>
      </div>
    </section>
  );
}
