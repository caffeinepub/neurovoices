import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Brain, Heart, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/conditions", label: "Conditions", subtitle: "Common Conditions" },
  { to: "/stories", label: "Stories" },
  { to: "/share", label: "Share Yours" },
  { to: "/about", label: "Stay Connected" },
  { to: "/about-us", label: "About Us" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Brain className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-semibold text-lg text-foreground">
              Beyond Neural
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.to} className="relative group/nav">
                <Link
                  to={link.to}
                  data-ocid="nav.link"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPath === link.to
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
                {link.subtitle && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-3 py-1 bg-popover border border-border rounded-md shadow-sm text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover/nav:opacity-100 transition-opacity pointer-events-none">
                    {link.subtitle}
                  </div>
                )}
              </div>
            ))}
            <Link to="/share" data-ocid="nav.primary_button">
              <Button
                size="sm"
                className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Share Story
              </Button>
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/60 bg-background"
            >
              <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    data-ocid="nav.link"
                    onClick={() => setMenuOpen(false)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPath === link.to
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.subtitle && (
                      <span className="ml-2 text-xs text-muted-foreground/70">
                        ({link.subtitle})
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/60 bg-muted/30 py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground">
              Beyond Neural
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            A safe space to share, listen, and break the stigma around
            neurological conditions.
          </p>
          <p className="text-xs text-muted-foreground">
            {"\u00A9"} {new Date().getFullYear()}. Built with{" "}
            <Heart className="inline w-3 h-3 text-rose-400" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
