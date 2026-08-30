import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, Linkedin, Mail, Sparkles, Terminal } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#05050a] text-white pt-16 pb-12 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-white/[0.06]">
          {/* Col 1: Bio */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 font-display font-bold text-xl text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-500/10 font-mono text-xs text-cyan-400">
                P
              </span>
              <span>Prajwal DL</span>
              <span className="text-cyan-400">.</span>
            </Link>
            <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-sm">
              Full Stack Engineer & AI Automation Architect. Specializing in high-performance web systems, reactive design architectures, and GPU graphics.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs text-emerald-400 font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Accepting Select Engineering Collaborations</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40">Directory</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><Link to="/projects" className="hover:text-cyan-400 transition-colors">Projects Directory</Link></li>
              <li><Link to="/experience" className="hover:text-cyan-400 transition-colors">Career Timeline</Link></li>
              <li><Link to="/skills" className="hover:text-cyan-400 transition-colors">Technical Arsenal</Link></li>
              <li><Link to="/certifications" className="hover:text-cyan-400 transition-colors">Verified Credentials</Link></li>
              <li><Link to="/lab" className="hover:text-cyan-400 transition-colors">Creative Lab</Link></li>
            </ul>
          </div>

          {/* Col 3: About & Connect */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40">Philosophy</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">Engineering Ethics</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Start a Project</Link></li>
              <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">Technical Articles</Link></li>
              <li><Link to="/studio" className="hover:text-cyan-400 transition-colors">Studio CMS</Link></li>
            </ul>
          </div>

          {/* Col 4: Direct Channels */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40">Channels</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="https://github.com/prajwaldl"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3 w-3 opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/prajwal-d-l-118198370/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3 w-3 opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:pdlkpt@gmail.com"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>pdlkpt@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p>© {new Date().getFullYear()} Prajwal DL — Designed & Built with Precision.</p>
          <div className="flex items-center gap-4">
            <span>TanStack Start SSR</span>
            <span>·</span>
            <span>Tailwind CSS</span>
            <span>·</span>
            <span>Nitro Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
