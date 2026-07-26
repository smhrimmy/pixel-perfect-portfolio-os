import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Search, Terminal } from "lucide-react";

type TicketState = "open" | "investigating" | "solved" | "failed";

interface Ticket {
  id: string;
  title: string;
  customer: string;
  issue: string;
  investigationSteps: { label: string; result: string; isUseful: boolean }[];
  solutionOptions: { label: string; isCorrect: boolean; feedback: string }[];
  prajwalMethodology: string;
}

const TICKETS: Ticket[] = [
  {
    id: "TKT-1042",
    title: "Website shows SSL 'Not Secure' warning",
    customer: "Jane Doe (Acme Corp)",
    issue: "My visitors are seeing a 'Not Secure' warning on my WordPress site, even though I bought an SSL certificate last year!",
    investigationSteps: [
      { label: "Check Domain DNS Records", result: "A record points to our server IP. Cloudflare proxy is OFF.", isUseful: false },
      { label: "Check Certificate Expiry", result: "Certificate is valid for another 60 days (Let's Encrypt).", isUseful: false },
      { label: "Check for Mixed Content", result: "Found 12 images loading over HTTP instead of HTTPS.", isUseful: true },
    ],
    solutionOptions: [
      { label: "Reissue the SSL certificate", isCorrect: false, feedback: "The certificate is valid. Reissuing won't fix the insecure assets." },
      { label: "Install Really Simple SSL plugin or update DB URLs to HTTPS", isCorrect: true, feedback: "Correct! The SSL is valid, but hardcoded HTTP links in the database break the padlock." },
      { label: "Enable Cloudflare Proxy", isCorrect: false, feedback: "This might hide the issue but doesn't fix the underlying mixed content on the origin server." },
    ],
    prajwalMethodology: "Whenever I see an SSL warning on an active cert, my first instinct is Mixed Content. I open Chrome DevTools (F12) -> Console. If I see yellow mixed content warnings, I know exactly what to do. I usually run a WP-CLI search-replace to flip all 'http://acmecorp.com' to 'https://acmecorp.com' in the database, ensuring a permanent fix rather than relying on heavy plugins."
  },
  {
    id: "TKT-2819",
    title: "Error 500 Internal Server Error",
    customer: "Bob Smith (TechBlog)",
    issue: "I just updated some plugins and now my whole site is a white screen with a 500 Error. Help!!",
    investigationSteps: [
      { label: "Check Server Load/RAM", result: "Server load is 0.2, RAM usage 40%. Server is healthy.", isUseful: false },
      { label: "Check Apache/Nginx Error Logs", result: "PHP Fatal error: Cannot redeclare function in /wp-content/plugins/seo-optimizer/index.php on line 42.", isUseful: true },
      { label: "Check .htaccess file", result: ".htaccess has standard WordPress permalink rules. Nothing suspicious.", isUseful: false },
    ],
    solutionOptions: [
      { label: "Restart the Apache/Nginx service", isCorrect: false, feedback: "The server is fine, the error is within the PHP code." },
      { label: "Rename the 'seo-optimizer' plugin folder via FTP/File Manager", isCorrect: true, feedback: "Spot on! Renaming the folder forces WordPress to deactivate the broken plugin, instantly restoring the site." },
      { label: "Restore a backup from yesterday", isCorrect: false, feedback: "While this works, it causes data loss (any posts/orders made today). Disabling the faulty plugin is faster and safer." },
    ],
    prajwalMethodology: "A 500 error after an update is almost always a PHP fatal error from a plugin conflict. Instead of flying blind, I immediately tail the error_log (`tail -f /var/log/apache2/error.log` or cPanel logs). Once I spot the offending plugin, I rename its directory via SSH/SFTP to deactivate it. The site comes right back up, and the client is happy in under 2 minutes."
  },
  {
    id: "TKT-3105",
    title: "Emails are bouncing / not delivering",
    customer: "Alice Wonderland",
    issue: "Since we moved our website to your hosting yesterday, we can't receive any emails at our @domain.com addresses!",
    investigationSteps: [
      { label: "Check MX Records", result: "MX records point to Google Workspace (ASPMX.L.GOOGLE.COM).", isUseful: true },
      { label: "Check Local Mail Routing", result: "cPanel Email Routing is set to 'Local Mail Exchanger'.", isUseful: true },
      { label: "Check Disk Space", result: "Account has 15GB of 50GB used. Plenty of space.", isUseful: false },
    ],
    solutionOptions: [
      { label: "Change Email Routing to 'Remote Mail Exchanger'", isCorrect: true, feedback: "Perfect! Since they use Google Workspace, the local server shouldn't try to deliver mail locally." },
      { label: "Update the MX records to point to the local server", isCorrect: false, feedback: "This would break their Google Workspace setup and route mail to empty local inboxes!" },
      { label: "Ask them to contact Google Support", isCorrect: false, feedback: "Google can't fix this. The hosting server is misconfigured to intercept the mail." },
    ],
    prajwalMethodology: "This is a classic migration issue. If a client uses external mail (Google Workspace, Office365) but their new website is hosted with us, the local server often defaults to 'Local Mail Routing'. It sees an email sent from the website to info@domain.com, thinks 'I host domain.com!', and delivers it to a local empty folder instead of sending it out to Google. Changing it to 'Remote' fixes it instantly. I always check MX records first using `dig mx domain.com`."
  }
];

export function SupportSimulator({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [ticketState, setTicketState] = useState<TicketState>("open");
  const [revealedSteps, setRevealedSteps] = useState<Set<number>>(new Set());

  if (!isOpen) return null;

  const handleStepClick = (idx: number) => {
    if (ticketState !== "investigating" && ticketState !== "open") return;
    setTicketState("investigating");
    setRevealedSteps(new Set(revealedSteps).add(idx));
  };

  const handleSolutionClick = (isCorrect: boolean) => {
    setTicketState(isCorrect ? "solved" : "failed");
  };

  const closeTicket = () => {
    setActiveTicket(null);
    setTicketState("open");
    setRevealedSteps(new Set());
  };

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="pointer-events-auto relative w-full max-w-5xl h-[80vh] bg-[#0c0c16] border border-white/20 rounded-xl shadow-2xl flex flex-col overflow-hidden text-white/80 font-sans"
      >
        {/* macOS style header */}
        <div className="h-12 bg-white/5 flex items-center px-4 gap-2 shrink-0 border-b border-white/10 select-none">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer shadow-sm" onClick={onClose} />
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-sm" />
          <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-sm" />
          <div className="mx-auto text-sm text-white/50 font-medium">Unifycx Support Desk Simulator</div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Ticket List */}
          <div className={`w-80 border-r border-white/10 bg-black/20 flex flex-col ${activeTicket ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-white/10 font-semibold text-white">Open Tickets (3)</div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {TICKETS.map(t => (
                <button 
                  key={t.id}
                  onClick={() => { setActiveTicket(t); setTicketState("open"); setRevealedSteps(new Set()); }}
                  className={`w-full text-left p-3 rounded-lg border transition ${
                    activeTicket?.id === t.id 
                      ? "bg-[var(--accent-cyan)]/10 border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)]" 
                      : "bg-white/5 border-transparent hover:bg-white/10 text-white/70"
                  }`}
                >
                  <div className="text-xs font-mono opacity-60 mb-1">{t.id}</div>
                  <div className="font-medium truncate">{t.title}</div>
                  <div className="text-xs opacity-60 mt-2 truncate">{t.customer}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto relative bg-[#0a0a14]">
            {!activeTicket ? (
              <div className="absolute inset-0 flex items-center justify-center text-white/30 flex-col gap-4">
                <Terminal className="w-16 h-16 opacity-20" />
                <p>Select a ticket from the queue to begin.</p>
              </div>
            ) : (
              <div className="p-6 md:p-10 max-w-3xl mx-auto flex flex-col gap-8 pb-20">
                {/* Ticket Header */}
                <div className="md:hidden mb-2">
                  <button onClick={closeTicket} className="text-xs text-[var(--accent-cyan)] hover:underline">&larr; Back to Queue</button>
                </div>
                <div>
                  <div className="inline-block px-2 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-mono mb-3">{activeTicket.id}</div>
                  <h2 className="text-2xl font-bold text-white mb-2">{activeTicket.title}</h2>
                  <p className="text-white/50 text-sm">Reported by: <span className="text-white/80">{activeTicket.customer}</span></p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-white/90 leading-relaxed">
                  "{activeTicket.issue}"
                </div>

                {/* Investigation Phase */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Search className="w-5 h-5 text-purple-400" />
                    Investigation Steps
                  </h3>
                  <p className="text-sm text-white/50">Click to perform diagnostic checks on the server.</p>
                  
                  <div className="grid gap-3">
                    {activeTicket.investigationSteps.map((step, idx) => {
                      const revealed = revealedSteps.has(idx);
                      return (
                        <div key={idx} className="flex flex-col gap-2">
                          <button 
                            onClick={() => handleStepClick(idx)}
                            className={`text-left p-3 rounded-lg border text-sm transition-all flex justify-between items-center ${
                              revealed ? 'bg-purple-500/10 border-purple-500/30' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                            }`}
                          >
                            <span>{step.label}</span>
                            {!revealed && <span className="text-xs bg-white/10 px-2 py-1 rounded">Run Test</span>}
                          </button>
                          
                          {revealed && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="pl-4 border-l-2 border-purple-500/30 text-sm text-purple-200 py-1"
                            >
                              <span className="font-mono mr-2">&gt;</span> {step.result}
                            </motion.div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Solution Phase */}
                <AnimatePresence>
                  {revealedSteps.size > 0 && ticketState !== "solved" && ticketState !== "failed" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 pt-6 border-t border-white/10"
                    >
                      <h3 className="text-lg font-semibold text-white">Propose Solution</h3>
                      <p className="text-sm text-white/50">Based on your findings, what is the best course of action?</p>
                      
                      <div className="grid gap-3">
                        {activeTicket.solutionOptions.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSolutionClick(opt.isCorrect)}
                            className="text-left p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Outcome Phase */}
                <AnimatePresence>
                  {(ticketState === "solved" || ticketState === "failed") && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-6 rounded-xl border mt-6 ${
                        ticketState === "solved" 
                          ? "bg-green-500/10 border-green-500/30" 
                          : "bg-red-500/10 border-red-500/30"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        {ticketState === "solved" ? <CheckCircle2 className="w-8 h-8 text-green-400" /> : <XCircle className="w-8 h-8 text-red-400" />}
                        <h3 className={`text-xl font-bold ${ticketState === "solved" ? "text-green-400" : "text-red-400"}`}>
                          {ticketState === "solved" ? "Ticket Resolved!" : "Incorrect Solution"}
                        </h3>
                      </div>
                      
                      {ticketState === "failed" && (
                        <div className="mb-6">
                          <button onClick={() => setTicketState("investigating")} className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 text-sm font-medium transition">
                            Try Again
                          </button>
                        </div>
                      )}

                      {ticketState === "solved" && (
                        <div className="space-y-4">
                          <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                            <div className="text-xs text-green-400/80 font-mono uppercase tracking-wider mb-2">Prajwal's Professional Methodology</div>
                            <p className="text-white/80 leading-relaxed text-sm">
                              {activeTicket.prajwalMethodology}
                            </p>
                          </div>
                          
                          <button onClick={closeTicket} className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 text-sm font-medium transition w-full text-center mt-4">
                            Next Ticket in Queue &rarr;
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
