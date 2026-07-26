import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLiveSite } from "@/lib/cms.functions";

interface CommandRecord {
  id: string;
  command: string;
  output: React.ReactNode;
}

import { motion } from "framer-motion";

export function GlobalInteractiveTerminal({ forceOpen = false }: { forceOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(forceOpen);
  const [history, setHistory] = useState<CommandRecord[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: siteData } = useQuery({
    queryKey: ["cms", "live-site"],
    queryFn: () => getLiveSite(),
    staleTime: 60_000,
  });

  const content = siteData?.content;
  const promptStr = <span className="text-emerald-500 font-bold">visitor@prajwal:~$</span>;

  useEffect(() => {
    if (forceOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    const handleCustomEvent = () => {
      setIsOpen(true);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-terminal", handleCustomEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-terminal", handleCustomEvent);
    };
  }, [forceOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [history, isOpen]);

  const pushOutput = (command: string, output: React.ReactNode) => {
    setHistory((prev) => [
      ...prev,
      { id: Math.random().toString(36).substring(7), command, output },
    ]);
  };

  const handleCommand = (cmd: string) => {
    const raw = cmd.trim();
    const args = raw.split(" ").filter(Boolean);
    const command = args[0]?.toLowerCase();

    if (!command) return;

    if (command === "clear") {
      setHistory([]);
      return;
    }

    if (command === "exit") {
      if (!forceOpen) setIsOpen(false);
      else pushOutput(raw, <span className="text-emerald-400">Cannot exit full-screen terminal.</span>);
      return;
    }

    let output: React.ReactNode = null;

    switch (command) {
      case "help":
        output = (
          <div className="grid grid-cols-2 gap-4 max-w-xl text-emerald-400">
            <div><strong>whoami</strong> - Identity summary</div>
            <div><strong>about</strong> - Headline and details</div>
            <div><strong>experience</strong> - Work history</div>
            <div><strong>projects</strong> - Portfolio projects</div>
            <div><strong>skills</strong> - Technical skills</div>
            <div><strong>contact</strong> - Contact info</div>
            <div><strong>clear</strong> - Clear screen</div>
            <div><strong>dig</strong> - DNS lookup simulation</div>
            <div><strong>whois</strong> - WHOIS record simulation</div>
            <div><strong>sudo hire prajwal</strong> - ???</div>
          </div>
        );
        break;
      case "whoami":
        if (content) {
          output = (
            <div className="text-emerald-400">
              <span className="text-white font-bold">{content.identity.name}</span><br />
              Role: {content.hero.badge}<br />
              Current Status: Online
            </div>
          );
        } else {
          output = <span className="text-red-400">Error: CMS content not found</span>;
        }
        break;
      case "about":
        if (content) {
          output = (
            <div className="text-emerald-400">
              <span className="text-white font-bold">Headline:</span> {content.hero.headingLead} {content.hero.headingAccent} {content.hero.headingTail}<br/>
              <span className="text-white font-bold">Sub:</span> {content.hero.sub}
            </div>
          );
        }
        break;
      case "experience":
        if (content) {
          output = (
            <div className="text-emerald-400 flex flex-col gap-2">
              {content.services.map((s, i) => (
                <div key={i}>
                  <div className="text-white font-bold">{s.title}</div>
                  <div className="pl-4 text-emerald-500/80">- {s.body}</div>
                </div>
              ))}
            </div>
          );
        }
        break;
      case "projects":
        if (content) {
          output = (
            <div className="text-emerald-400 flex flex-col gap-2">
              {content.projects.map((p, i) => (
                <div key={i}>
                  <div className="text-white font-bold">{p.title} <span className="text-emerald-600 text-xs">[{p.tag}]</span></div>
                  <div className="pl-4 text-emerald-500/80">→ {p.outcome}</div>
                </div>
              ))}
            </div>
          );
        }
        break;
      case "skills":
        if (content) {
          output = (
            <div className="text-emerald-400">
              <div className="text-white font-bold">Industries & Tech</div>
              <div className="pl-4">[{content.hero.industries.map(i => `"${i}"`).join(", ")}]</div>
            </div>
          );
        }
        break;
      case "contact":
        if (content) {
          output = (
            <div className="text-emerald-400">
              Email: <a href={content.links.email} className="underline text-emerald-300">{content.links.email.replace('mailto:', '')}</a><br />
              GitHub: <a href={content.links.github} target="_blank" rel="noreferrer" className="underline text-emerald-300">{content.links.github}</a><br />
              LinkedIn: <a href={content.links.linkedin} target="_blank" rel="noreferrer" className="underline text-emerald-300">{content.links.linkedin}</a><br />
              Book Call: <a href={content.links.book} target="_blank" rel="noreferrer" className="underline text-emerald-300">{content.links.book}</a>
            </div>
          );
        }
        break;
      case "dig":
        const domain = args[1] || "prajwal.dev";
        output = (
          <div className="text-emerald-400 whitespace-pre-wrap font-mono">
{`; <<>> DiG 9.16.1-Ubuntu <<>> ${domain}
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 31337
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; ANSWER SECTION:
${domain}.		300	IN	A	203.0.113.42

;; Query time: 14 msec
;; SERVER: 1.1.1.1#53(1.1.1.1)
;; WHEN: ${new Date().toUTCString()}
;; MSG SIZE  rcvd: 56`}
          </div>
        );
        break;
      case "whois":
        const wDomain = args[1] || "prajwal.dev";
        output = (
          <div className="text-emerald-400 whitespace-pre-wrap font-mono">
{`Domain Name: ${wDomain.toUpperCase()}
Registry Domain ID: 123456789_DOMAIN_COM-VRSN
Registrar WHOIS Server: whois.prajwal.dev
Registrar URL: http://prajwal.dev
Updated Date: 2026-01-01T00:00:00Z
Creation Date: 2022-01-01T00:00:00Z
Registrar Registration Expiration Date: 2030-01-01T00:00:00Z
Registrar: HostGator / Bluehost Premium (Simulated)
Admin Name: Prajwal DL
Admin Organization: Unifycx AI & Web Solutions`}
          </div>
        );
        break;
      case "resume":
        output = <div className="text-emerald-400">Downloading resume... <a href="/recruiter" className="underline text-emerald-300">Click here to view PDF</a></div>;
        break;
      case "education":
      case "achievements":
      case "stats":
      case "career":
        output = <div className="text-yellow-400">Loading {command} data from Prajwal OS backend... (coming in Phase 3!)</div>;
        break;
      case "theme":
        output = <div className="text-yellow-400">To change theme, please use the HQ Terminal in the Studio.</div>;
        break;
      case "search":
        output = <div className="text-emerald-400">Searching for "{args.slice(1).join(" ")}"... 0 results found. Try again later!</div>;
        break;
      case "fortune":
        const fortunes = [
          "You will hire an amazing developer today.",
          "A bug in the code is worth two in the backlog.",
          "Your coffee will be strong and your deployments will be successful.",
        ];
        output = <div className="text-emerald-400">{fortunes[Math.floor(Math.random() * fortunes.length)]}</div>;
        break;
      case "sudo":
        if (args.slice(1).join(" ") === "hire prajwal") {
          output = <div className="text-yellow-400 font-bold">Excellent decision! Initiating onboarding protocols... Please email prajwal to begin.</div>;
        } else if (args[1] === "rm" && args[2] === "-rf" && args[3] === "/") {
          output = <div className="text-red-500 font-bold">Permission denied. Nice try! 😉</div>;
        } else {
          output = <div className="text-emerald-400">sudo: a password is required, but you are not in the sudoers file.</div>;
        }
        break;
      case "matrix":
        output = <div className="text-emerald-400 font-bold animate-pulse">Wake up, Neo... The Matrix has you.</div>;
        break;
      case "coffee":
        output = <div className="text-emerald-400">☕ Fetching coffee... [HTTP 418 I'm a teapot]</div>;
        break;
      case "ls":
        output = (
          <div className="flex gap-4 text-emerald-400">
            <span className="text-blue-400">projects/</span>
            <span className="text-blue-400">experience/</span>
            <span className="text-blue-400">skills/</span>
            <span>readme.md</span>
          </div>
        );
        break;
      case "cat":
        if (args[1] === "readme.md") {
          output = <div className="text-emerald-400">This is Prajwal's interactive portfolio terminal. Type 'help' for commands.</div>;
        } else {
          output = <div className="text-red-400">cat: {args[1]}: No such file or directory</div>;
        }
        break;
      default:
        output = <div className="text-red-400">command not found: {command}</div>;
    }

    pushOutput(raw, output);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
  };

  if (!isOpen) return null;

  const terminalContent = (
    <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto flex flex-col gap-2 pb-12 p-6 cursor-text">
      <div className="mb-4">
        <div className="text-emerald-500 font-bold mb-1">PRAJWAL OS v2.0 - Interactive Shell</div>
        <div className="text-emerald-600 text-xs">Type 'help' to see available commands. Press Ctrl+~ to toggle this terminal.</div>
      </div>

      {history.map((record) => (
        <div key={record.id} className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {promptStr}
            <span className="text-emerald-200">{record.command}</span>
          </div>
          <div className="pl-4">{record.output}</div>
        </div>
      ))}
      
      <form onSubmit={onSubmit} className="flex items-center gap-2 mt-2">
        {promptStr}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-emerald-200 shadow-none focus:ring-0 p-0 m-0 w-full"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );

  if (forceOpen) {
    return (
      <div className="w-full min-h-screen bg-black/95 text-emerald-300 font-mono font-sm md:text-base flex flex-col" onClick={() => inputRef.current?.focus()}>
        {terminalContent}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none p-4">
      <motion.div 
        drag
        dragMomentum={false}
        className="pointer-events-auto w-full max-w-4xl h-[70vh] bg-black/95 border border-white/20 rounded-xl shadow-2xl flex flex-col overflow-hidden text-emerald-300 font-mono text-sm md:text-base" 
        onClick={(e) => { e.stopPropagation(); inputRef.current?.focus(); }}
      >
        <div className="h-10 bg-white/10 flex items-center px-4 gap-2 shrink-0 border-b border-white/10 select-none cursor-move">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer shadow-sm" onClick={() => setIsOpen(false)} />
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
          <div className="mx-auto text-xs text-white/50 font-sans tracking-wide">prajwal — bash — 80x24</div>
        </div>
        {terminalContent}
      </motion.div>
    </div>
  );
}
