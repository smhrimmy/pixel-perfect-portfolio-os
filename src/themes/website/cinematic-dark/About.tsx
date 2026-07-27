import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectedElement } from "./components/ProjectedElement";
import { Vector3 } from "three";
import { MapPin, Briefcase, Award, GraduationCap } from "lucide-react";

const descriptionPoint = new Vector3(-0.9, 2, 6.75);
const detailsPoint = new Vector3(-2.8, 1, 6.5);
const servicesPoint = new Vector3(2.5, 1, 7.5);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const yOffset = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

  return (
    <section ref={containerRef} id="about" className="relative w-full h-[150vh] pointer-events-none">
      <motion.div 
        style={{ opacity }}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none"
      >
        {/* Profile Hologram Box */}
        <ProjectedElement point={descriptionPoint}>
          <motion.div 
            style={{ y: yOffset }}
            className="absolute bottom-10 left-6 lg:left-0 lg:bottom-0 pointer-events-auto w-[calc(100vw-3rem)] lg:w-96 p-6 rounded-2xl border border-cyan-500/30 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-4">
                <h3 className="text-xl font-bold text-white tracking-wider">Prajwal D L</h3>
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">India</span>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed font-light text-sm">
                Passionate AI Engineer and Full Stack Developer crafting intelligent systems and pixel-perfect interfaces. Focused on bridging the gap between cutting-edge AI models and seamless user experiences.
              </p>
            </div>
          </motion.div>
        </ProjectedElement>

        {/* Details Box */}
        <ProjectedElement point={detailsPoint}>
          <motion.div 
            style={{ y: yOffset }}
            className="hidden lg:block absolute left-0 bottom-0 transform -translate-x-[110%] -translate-y-1/2 pointer-events-auto w-64 p-5 rounded-2xl border border-purple-500/30 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.15)]"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold">Experience</h4>
                  <p className="text-gray-400 text-xs mt-1">2+ Years in AI & Web Dev</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold">Education</h4>
                  <p className="text-gray-400 text-xs mt-1">B.E in Computer Science</p>
                </div>
              </div>
            </div>
          </motion.div>
        </ProjectedElement>

        {/* Services Box */}
        <ProjectedElement point={servicesPoint}>
          <motion.div 
            style={{ y: yOffset }}
            className="hidden lg:block absolute left-0 bottom-0 pointer-events-auto w-72 p-6 rounded-2xl border border-blue-500/30 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-400" />
              Core Competencies
            </h3>
            <ul className="space-y-3">
              {[
                "Large Language Models (LLMs)",
                "Full Stack React & Node.js",
                "Machine Learning Engineering",
                "Cloud Architecture (AWS)"
              ].map((skill, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        </ProjectedElement>

      </motion.div>
    </section>
  );
}
