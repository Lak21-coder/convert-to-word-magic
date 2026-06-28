import { Link, Outlet } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-x flex h-18 items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-[image:var(--gradient-accent)] font-display text-lg font-bold text-primary-foreground">R</div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight">RYKLO</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Technologies</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03] md:inline-block"
        >
          Get Started →
        </Link>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="block h-0.5 w-4 bg-foreground" />
          </div>
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-[color:var(--surface)] text-surface-foreground">
      <div className="container-x grid gap-12 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[image:var(--gradient-accent)] font-display text-lg font-bold">R</div>
            <div className="leading-tight">
              <div className="font-display text-lg font-bold tracking-tight">RYKLO</div>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] opacity-70">Technologies</div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed opacity-70">
            Where asset management meets EAM &amp; data technology. Empowering operations with seamless integration, advanced analytics, and uncompromising efficiency.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-80">Company</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/about" className="hover:opacity-100">About</Link></li>
            <li><Link to="/services" className="hover:opacity-100">Services</Link></li>
            <li><Link to="/industries" className="hover:opacity-100">Industries</Link></li>
            <li><Link to="/contact" className="hover:opacity-100">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-80">Reach Us</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>hello@ryklotech.com</li>
            <li>+1 (555) 014‑9000</li>
            <li>Austin · Hyderabad · NYC</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs opacity-60 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} RYKLO Technologies. All rights reserved.</div>
          <div>Crafted for operations that can't slow down.</div>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children ?? <Outlet />}</main>
      <SiteFooter />
    </>
  );
}
