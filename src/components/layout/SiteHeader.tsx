import { Link, useRouterState } from "@tanstack/react-router";
import { Command, Menu, Sparkles, X, ArrowUpRight, Search } from "lucide-react";
import { useState, useEffect } from "react";

export function SiteHeader({ activeRoute }: { activeRoute?: string }) {
  const routerState = useRouterState();
  const currentPath = activeRoute || routerState.location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
    { label: "Skills", href: "/skills" },
    { label: "Certifications", href: "/certifications" },
    { label: "The Lab", href: "/lab" },
    { label: "Search", href: "/search" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.08] bg-[#07070e]/85 backdrop-blur-xl shadow-2xl shadow-black/40"
          : "border-b border-transparent bg-[#07070e]/40 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 sm:py-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 font-mono text-xs font-bold text-cyan-400 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-all">
            P
          </span>
          <span className="font-display font-bold tracking-tight text-white">
            Prajwal<span className="text-cyan-400">.</span>os
          </span>
          <span className="hidden sm:inline-block rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/50">
            v2.4
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-lg">
          {navItems.map((item) => {
            const isActive = currentPath === item.href || (item.href !== "/" && currentPath.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white/10 text-cyan-300 font-semibold shadow-inner"
                    : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/search"
            className="flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-cyan-300 hover:border-cyan-500/30 transition-all"
            title="Search"
          >
            <Search className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/recruiter"
            className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-mono font-medium text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/20 transition-all"
          >
            <Sparkles className="h-3 w-3 text-cyan-400" />
            <span>Recruiter ATS</span>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/search"
            className="flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 text-white/70"
          >
            <Search className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#07070e]/95 px-6 py-6 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = currentPath === item.href || (item.href !== "/" && currentPath.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-300 font-semibold border-l-2 border-cyan-400"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-40" />
                </Link>
              );
            })}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Link
                to="/recruiter"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 py-2.5 text-xs font-mono font-medium text-cyan-300"
              >
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>Recruiter View (ATS)</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
