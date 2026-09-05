export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  architecture: string;
  responsibilities: string[];
  impact: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: "Systems" | "Frontend" | "Cloud" | "Creative";
  highlight: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; description: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface PortfolioData {
  identity: {
    name: string;
    headline: string;
    bio: string;
    location: string;
    postalCode: string;
    roles: string[];
    email: string;
    phone: string;
    website: string;
    github: string;
    linkedin: string;
  };
  projects: ProjectItem[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: {
    institution: string;
    degree: string;
    period: string;
    location: string;
    highlights: string[];
  }[];
  certifications: {
    title: string;
    issuer: string;
    year: string;
  }[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  identity: {
    name: "Prajwal DL",
    headline: "Full Stack Developer · Systems Architect · 3D Creative Engineer",
    bio: "Systems Architect & Creative Technologist engineering 22 bespoke spatial 3D portfolio worlds, high-throughput cloud automation platforms, and sub-100ms resilient web architectures from Mangalore, India.",
    location: "Mangalore, Karnataka, India",
    postalCode: "575001",
    roles: [
      "Full Stack Developer",
      "Systems Architect",
      "3D Creative Engineer",
      "Cloud Operations Specialist"
    ],
    email: "pdlkpt@gmail.com",
    phone: "+918105561638",
    website: "https://praxel.space/",
    github: "https://github.com/smhrimmy",
    linkedin: "https://linkedin.com/in/prajwal-d-l-118198370/",
  },

  projects: [
    {
      id: "portfolio-os",
      title: "Portfolio OS Spatial Matrix",
      tagline: "22 Bespoke Interactive 3D Portfolio Worlds",
      description: "A groundbreaking personal operating system featuring 22 completely unique 3D visual architectures, custom WebGL/Canvas mathematical shaders, real-time audio synthesis, and sub-100ms LCP benchmark.",
      problem: "Traditional portfolios rely on identical boilerplate skins and generic scroll layouts that fail to communicate deep creative engineering capability.",
      solution: "Engineered 22 distinct physical metaphor worlds (Observatory, Workshop, Hypercube, Reservoir, etc.) each with its own camera language, physics model, navigation, and tactile inspection mechanism.",
      architecture: "React 19 + TypeScript + Three.js/Canvas + Framer Motion + Web Audio API + TanStack Router with dynamic lazy chunking and zero universal visual shells.",
      responsibilities: [
        "Architected and engineered 22 distinct physical metaphor world experiences from scratch.",
        "Built procedural 3D heightfield vertex deformation, 4D tesseract Euclidean rotation, and fluid ripple simulation engines.",
        "Integrated synthesized Web Audio API sound feedback for tactile interaction.",
        "Optimized production bundle to achieve 60 FPS and sub-100ms LCP on all modern browsers."
      ],
      impact: "Zero layout duplication across 22 themes, under 14s full build compilation time, 100% accessible 2D fallback mode.",
      technologies: ["React 19", "Three.js", "WebGL", "TypeScript", "Tailwind CSS", "Framer Motion", "Web Audio API"],
      liveUrl: "https://praxel.space/",
      githubUrl: "https://github.com/smhrimmy/pixel-perfect-portfolio-os",
      category: "Creative",
      highlight: "Higgsfield AI MCF & 4D Tesseract Dimension with zero latency"
    },
    {
      id: "praxel-space",
      title: "Praxel Space Cloud Platform",
      tagline: "Automated DNS Management & SSL Provisioning Infrastructure",
      description: "High-reliability cloud infrastructure platform providing automated DNS record routing, real-time Let's Encrypt SSL certificate provisioning, and domain health diagnostics.",
      problem: "Manual SSL renewals and DNS configurations cause unexpected outages and domain propagation downtime for production clients.",
      solution: "Engineered automated microservice pipelines that monitor domain health, renew certificates proactively, and trigger zero-downtime DNS failovers.",
      architecture: "PHP 8 + MySQL + Certbot CLI Automation + Node.js Telemetry Probes + REST APIs with secure webhook triggers.",
      responsibilities: [
        "Developed automated SSL provisioning and renewal daemon with zero downtime.",
        "Built domain DNS diagnostic dashboard with real-time health telemetry.",
        "Configured secure multi-tenant database schemas and API endpoints."
      ],
      impact: "100% uptime recorded across managed domains with automated proactive certificate renewal.",
      technologies: ["DNS Automation", "SSL Certbot", "PHP", "MySQL", "Node.js", "Linux System Administration"],
      liveUrl: "https://praxel.space/",
      githubUrl: "https://github.com/smhrimmy",
      category: "Cloud",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics"
    },
    {
      id: "vitvara-ridge",
      title: "Vitvara Application Ridge",
      tagline: "High-Throughput Responsive Web Application",
      description: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      problem: "Complex UI state updates and slow API roundtrips degrade user conversion rates on desktop and mobile browsers.",
      solution: "Implemented optimistic UI updates, modular state stores, and streamlined REST microservices to achieve high responsiveness.",
      architecture: "React.js + Modern CSS + REST APIs + Node.js backend microservices.",
      responsibilities: [
        "Architected responsive UI components with comprehensive cross-browser compatibility.",
        "Integrated asynchronous REST API endpoints with robust error boundaries.",
        "Optimized client-side rendering performance and asset compression."
      ],
      impact: "Sub-100ms average interaction latency and seamless mobile responsive experience.",
      technologies: ["React.js", "REST APIs", "Modern CSS", "HTML5", "JavaScript ES6+"],
      liveUrl: "https://praxel.space/",
      githubUrl: "https://github.com/smhrimmy",
      category: "Frontend",
      highlight: "High-throughput frontend with clean microservice integration"
    },
    {
      id: "bespoke-enterprise",
      title: "Bespoke Enterprise Basins",
      tagline: "Custom Client Web Portals & Commercial Platforms",
      description: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design tailored for commercial conversion.",
      problem: "Off-the-shelf templates fail to meet specific enterprise business logic, security constraints, and branding requirements.",
      solution: "Built custom WordPress theme engines and secure database schemas with tailor-made payment gateway hooks.",
      architecture: "WordPress Core + PHP + Custom Theme Engine + Node.js + Payment Gateways.",
      responsibilities: [
        "Engineered tailor-made WordPress theme architectures with zero template bloat.",
        "Configured secure transactional email pipelines and database backups.",
        "Conducted client training and live deployment operations."
      ],
      impact: "High-conversion bespoke client portals delivered on-schedule with zero post-launch security incidents.",
      technologies: ["WordPress", "Node.js", "PHP", "UI/UX Design", "Payment Gateways"],
      liveUrl: "https://praxel.space/",
      githubUrl: "https://github.com/smhrimmy",
      category: "Systems",
      highlight: "Custom client portals tailored for high-conversion performance"
    }
  ],

  skills: [
    {
      category: "Frontend & 3D Engineering",
      skills: [
        { name: "React 19 & Next.js", level: 95, description: "Component architecture, Server Components, suspense boundaries" },
        { name: "TypeScript", level: 92, description: "Strict typing, generics, AST utilities" },
        { name: "Three.js & WebGL", level: 90, description: "Custom vertex/fragment shaders, camera math, geometry pipelines" },
        { name: "Tailwind CSS & Framer Motion", level: 95, description: "Fluid animations, spring physics, responsive design systems" },
        { name: "Canvas 2D & Mathematical Graphics", level: 92, description: "Topographical heightfields, fluid simulation, tesseracts" }
      ]
    },
    {
      category: "Backend & Systems Architecture",
      skills: [
        { name: "Node.js & Express", level: 90, description: "Asynchronous microservices, REST APIs, WebSockets" },
        { name: "PHP & Laravel / Core", level: 88, description: "Cloud automation, DNS daemons, Certbot integration" },
        { name: "PostgreSQL & MySQL", level: 88, description: "Relational modeling, indexing, query optimization" },
        { name: "Linux & Cloud Infrastructure", level: 86, description: "DNS routing, SSL certificates, Nginx, server hardening" }
      ]
    },
    {
      category: "AI & Audio Engineering",
      skills: [
        { name: "Higgsfield AI MCF & DoP Camera", level: 94, description: "Camera motion presets, Soul image styles, prompt orchestration" },
        { name: "Web Audio API Synthesis", level: 88, description: "Oscillator synthesis, procedural sound design, zero-asset audio" },
        { name: "Performance Optimization", level: 95, description: "Sub-100ms LCP, WebGL memory disposal, 60 FPS animation" }
      ]
    }
  ],

  experience: [
    {
      id: "exp-1",
      role: "Web Advisor & Technical Operations",
      company: "Unifycx",
      location: "Mangalore, Karnataka, India",
      period: "2025 — Present",
      description: "Assisting global clients with website migrations, SSL installations, DNS troubleshooting, and hosting control panel architectures.",
      achievements: [
        "Resolved 500+ complex DNS, SSL certificate, and hosting infrastructure tickets with high satisfaction.",
        "Conducted zero-downtime server migrations across cPanel, Plesk, and custom Linux VPS environments."
      ],
      technologies: ["DNS", "SSL Certbot", "Linux", "cPanel", "PHP", "MySQL", "Web Security"]
    },
    {
      id: "exp-2",
      role: "Full Stack Web Developer & Designer",
      company: "Freelance Practice",
      location: "Remote / Mangalore, India",
      period: "2024 — 2025",
      description: "Designed and developed custom web applications using modern React, TypeScript, and PHP/MySQL pipelines based on client specifications.",
      achievements: [
        "Delivered full-cycle commercial web applications with bespoke UI/UX and payment gateway integrations.",
        "Engineered the Praxel Space cloud DNS and automated SSL provisioning platform."
      ],
      technologies: ["React", "TypeScript", "Node.js", "PHP", "MySQL", "Tailwind CSS"]
    },
    {
      id: "exp-3",
      role: "Junior Support Engineer",
      company: "GlowTouch Technologies",
      location: "Mangalore, Karnataka, India",
      period: "2024",
      description: "Provided live chat technical support for hosting, domain, and server migrations. Troubleshot WordPress, MySQL, PHP, and DNS infrastructure.",
      achievements: [
        "Diagnosed and resolved critical server errors, database corruption, and mail routing misconfigurations.",
        "Streamlined migration workflows to reduce customer waiting times."
      ],
      technologies: ["Hosting Servers", "DNS", "WordPress", "MySQL", "PHP", "SSL"]
    },
    {
      id: "exp-4",
      role: "Software Development Intern",
      company: "Vitvara Technologies",
      location: "Mangalore, Karnataka, India",
      period: "2023 — 2024",
      description: "Contributed to front-end and full-stack software development projects under senior engineering mentorship.",
      achievements: [
        "Built responsive UI modules using React.js and CSS3 with rigorous mobile testing.",
        "Integrated backend REST APIs and participated in daily agile scrums."
      ],
      technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs", "Git"]
    }
  ],

  education: [
    {
      institution: "Karnataka (Govt.) Polytechnic (KPT)",
      degree: "Diploma in Computer Science & Engineering",
      period: "2021 — 2024",
      location: "Mangalore, Karnataka, India",
      highlights: [
        "Core coursework in Data Structures, Database Systems, Computer Networks, and Software Engineering.",
        "Graduated with distinction and led capstone technical web development projects."
      ]
    }
  ],

  certifications: [
    {
      title: "Full Stack Web Development Professional",
      issuer: "Technical Institute Certification",
      year: "2024"
    },
    {
      title: "Cloud Infrastructure & DNS Administration",
      issuer: "Industry Accreditation",
      year: "2024"
    }
  ]
};
