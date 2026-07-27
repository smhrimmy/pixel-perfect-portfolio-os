import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import type { ThemeRendererProps } from "../types";

export default function AgencyBold({ data }: ThemeRendererProps) {
  const { profile, projects, skills, experience, socialLinks } = data;

  const name = profile?.name || "Agency";
  const email = profile?.email || "hello@example.com";
  
  const heroBadge = "Digital Studio";
  const heroHeadingLead = "We build";
  const heroHeadingAccent = "bold";
  const heroHeadingTail = "digital experiences.";
  const heroSub = profile?.bio || "A creative studio engineering systems that convert. Every pixel and every workflow, built to move numbers.";

  const stats = [
    { value: projects?.length || 0, label: "Projects Shipped" },
    { value: experience?.length || 0, label: "Combined Roles" },
    { value: skills?.length || 0, label: "Expertise Areas" },
    { value: "100%", label: "Client Success" },
  ];

  const services = [
    { title: "Design", body: "Bold, unignorable visual identities." },
    { title: "Development", body: "High-performance full-stack applications." },
    { title: "Strategy", body: "Technical architecture that scales." }
  ];

  const why = [
    { title: "Speed", body: "We ship fast without breaking things." },
    { title: "Quality", body: "Pixel-perfect implementation every time." },
    { title: "Impact", body: "Building products that move the needle." }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-200">
        <nav className="mx-auto max-w-7xl px-8 h-20 flex items-center justify-between">
          <a href="#top" className="text-2xl font-black tracking-tight">
            {name}<span className="text-orange-500">.</span>
          </a>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium uppercase tracking-wider">
            <a href="#services" className="hover:text-orange-500">Services</a>
            <a href="#experience" className="hover:text-orange-500">Experience</a>
            <a href="#skills" className="hover:text-orange-500">Skills</a>
            <a href="#work" className="hover:text-orange-500">Work</a>
            <a href="#about" className="hover:text-orange-500">About</a>
            <a href="#contact" className="hover:text-orange-500">Contact</a>
          </div>
          <a href={`mailto:${email}`} className="rounded-none bg-neutral-900 text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-orange-500 transition-colors">
            Get quote
          </a>
        </nav>
      </header>

      <main>
        <section id="top" className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-8 py-32 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <div className="text-sm uppercase tracking-[0.4em] text-orange-500 font-bold">{heroBadge}</div>
              <h1 className="mt-6 text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter uppercase">
                {heroHeadingLead}
                <br />
                <span className="text-orange-500">{heroHeadingAccent}</span>
                <br />
                {heroHeadingTail}
              </h1>
            </div>
            <div className="md:col-span-4">
              <p className="text-lg text-neutral-600">{heroSub}</p>
              <div className="mt-8 flex flex-col gap-3">
                <a href={`mailto:${email}`} className="group flex items-center justify-between bg-neutral-900 text-white px-6 py-5 font-bold uppercase tracking-wider">
                  Start a project
                  <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
                <a href="#work" className="group flex items-center justify-between border-2 border-neutral-900 px-6 py-5 font-bold uppercase tracking-wider hover:bg-neutral-900 hover:text-white transition-colors">
                  View portfolio
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-y border-neutral-200 bg-neutral-50">
            <div className="mx-auto max-w-7xl px-8 py-6 flex flex-wrap gap-8 items-center text-xs uppercase tracking-widest text-neutral-500">
              <span>Trusted by ambitious teams</span>
              <span>· Web Design</span>
              <span>· Development</span>
              <span>· Branding</span>
              <span>· SEO</span>
              <span>· AI Automation</span>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-8 py-32">
          <div className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-4">
              <div className="text-sm uppercase tracking-[0.4em] text-orange-500 font-bold">What we do</div>
              <h2 className="mt-4 text-5xl md:text-6xl font-black tracking-tighter uppercase">Services</h2>
            </div>
            <div className="md:col-span-8 flex items-end">
              <p className="text-xl text-neutral-600">We build websites and systems that convert. Every pixel and every workflow, engineered to move numbers.</p>
            </div>
          </div>
          <div className="border-t border-neutral-900">
            {services.map((s, i) => (
              <div key={s.title} className="group border-b border-neutral-900 py-10 grid md:grid-cols-12 gap-8 items-center hover:bg-neutral-900 hover:text-white transition-colors px-4 -mx-4">
                <div className="md:col-span-1 text-2xl font-black">{String(i + 1).padStart(2, "0")}</div>
                <div className="md:col-span-4 text-3xl md:text-4xl font-black uppercase tracking-tight">{s.title}</div>
                <div className="md:col-span-6 text-neutral-600 group-hover:text-neutral-300">{s.body}</div>
                <div className="md:col-span-1 flex justify-end">
                  <ArrowUpRight className="h-8 w-8" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-8 py-32 border-t border-neutral-200">
          <div className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-4">
              <div className="text-sm uppercase tracking-[0.4em] text-orange-500 font-bold">Resume</div>
              <h2 className="mt-4 text-5xl md:text-6xl font-black tracking-tighter uppercase">Experience</h2>
            </div>
            <div className="md:col-span-8 flex items-end">
              <p className="text-xl text-neutral-600">A track record of pushing boundaries and delivering exceptional results.</p>
            </div>
          </div>
          <div className="border-t border-neutral-900">
            {(experience || []).map((exp) => (
              <div key={exp.id} className="border-b border-neutral-200 py-10 grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3 text-sm font-bold uppercase tracking-widest text-neutral-500">
                  {exp.start_date?.substring(0, 7)} — {exp.end_date ? exp.end_date.substring(0, 7) : "Present"}
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{exp.position}</h3>
                  <div className="text-xl font-bold uppercase tracking-wider text-orange-500 mt-2">{exp.company}</div>
                  <p className="mt-6 text-neutral-600 max-w-3xl">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="bg-neutral-100">
          <div className="mx-auto max-w-7xl px-8 py-32">
            <div className="text-sm uppercase tracking-[0.4em] text-orange-500 font-bold">Capabilities</div>
            <h2 className="mt-4 text-5xl md:text-6xl font-black tracking-tighter uppercase mb-16">Skills</h2>
            <div className="flex flex-wrap gap-4">
              {(skills || []).map((skill) => (
                <div key={skill.id} className="border-2 border-neutral-900 bg-white px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-neutral-900 hover:text-white transition-colors cursor-default">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-orange-500 text-white">
          <div className="mx-auto max-w-7xl px-8 py-24 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="border-t-4 border-white pt-6">
                <div className="text-6xl md:text-7xl font-black">{s.value}</div>
                <div className="mt-3 text-xs uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-8 py-32">
          <div className="text-sm uppercase tracking-[0.4em] text-orange-500 font-bold">Selected Work</div>
          <h2 className="mt-4 text-5xl md:text-6xl font-black tracking-tighter uppercase mb-16">Case studies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(projects || []).map((p, i) => (
              <a key={p.id} href={p.live_demo_url || "#"} target="_blank" rel="noreferrer" className="group block relative overflow-hidden bg-neutral-100 aspect-[4/3]">
                <div className={`absolute inset-0 ${["bg-gradient-to-br from-orange-400 to-red-500", "bg-gradient-to-br from-neutral-900 to-neutral-700", "bg-gradient-to-br from-blue-500 to-purple-600", "bg-gradient-to-br from-emerald-500 to-teal-700"][i % 4]}`} />
                <div className="relative z-10 p-10 h-full flex flex-col justify-between text-white">
                  <div className="text-xs uppercase tracking-widest opacity-70">{Array.isArray(p.technologies) ? p.technologies[0] : ""}</div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{p.title}</h3>
                    <p className="mt-3 text-sm opacity-90">{p.description}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                      View case <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="about" className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-7xl px-8 py-32">
            <div className="text-sm uppercase tracking-[0.4em] text-orange-500 font-bold">Why us</div>
            <h2 className="mt-4 text-5xl md:text-6xl font-black tracking-tighter uppercase mb-16">The advantage</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {why.map((w, i) => (
                <div key={w.title} className="border-t-2 border-orange-500 pt-6">
                  <div className="text-xs uppercase tracking-widest text-orange-500">0{i + 1}</div>
                  <h3 className="mt-3 text-2xl font-black uppercase">{w.title}</h3>
                  <p className="mt-4 text-neutral-400">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-8 py-32">
          <div className="text-sm uppercase tracking-[0.4em] text-orange-500 font-bold">Get in touch</div>
          <h2 className="mt-4 text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.9]">
            Let's work
            <br />
            <span className="text-orange-500">together.</span>
          </h2>
          <p className="mt-8 text-xl text-neutral-600 max-w-2xl">Ready to take your digital presence to the next level? Contact us today.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={`mailto:${email}`} className="bg-neutral-900 text-white px-8 py-5 font-bold uppercase tracking-wider hover:bg-orange-500 transition-colors">
              Book a call →
            </a>
            <a href={`mailto:${email}`} className="border-2 border-neutral-900 px-8 py-5 font-bold uppercase tracking-wider hover:bg-neutral-900 hover:text-white transition-colors">
              Send email
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-8 py-10 flex items-center justify-between text-sm">
          <div className="font-bold uppercase tracking-widest">© {new Date().getFullYear()} {name}</div>
          <div className="flex items-center gap-4">
            {socialLinks?.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4 hover:text-orange-500" /></a>}
            {socialLinks?.github && <a href={socialLinks.github} target="_blank" rel="noreferrer"><Github className="h-4 w-4 hover:text-orange-500" /></a>}
            {email && <a href={`mailto:${email}`}><Mail className="h-4 w-4 hover:text-orange-500" /></a>}
          </div>
        </div>
      </footer>
    </div>
  );
}
