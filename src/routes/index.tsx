import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import hero from "@/assets/hero.jpg";
import maximo from "@/assets/maximo.jpg";
import tririga from "@/assets/tririga.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RYKLO Technologies — Asset Management, EAM & Data Technology" },
      { name: "description", content: "RYKLO Technologies empowers operations with IBM Maximo, TRIRIGA, and data engineering services for asset-intensive industries." },
      { property: "og:title", content: "RYKLO Technologies" },
      { property: "og:description", content: "Where asset management meets EAM & data technology." },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: Home,
});

const stats = [
  { v: "40+", l: "Successful Projects" },
  { v: "200+", l: "Years of Collective Expertise" },
  { v: "12+", l: "Regulated Industries Served" },
  { v: "23+", l: "Years in Project Controls" },
];

const certs = ["IBM Gold Partner", "ISO 9001:2015", "DBE Certified", "MBE Certified", "SBE Certified", "IAM Corporate Member"];

const clients = ["NASA", "Kaiser Permanente", "Tufts University", "Port Authority NY/NJ", "California High‑Speed Rail", "Metra Chicago", "Washington Metro", "American Red Cross"];

const industries = [
  "Transportation", "Facilities Management", "Utilities", "Airports",
  "Seaports", "Healthcare", "Transmission & Distribution", "Life Sciences",
  "Oil & Gas", "Calibration", "Manufacturing", "Power Generation",
];

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" className="h-full w-full object-cover" width={1920} height={1280} />
          <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="container-x grid min-h-[88vh] items-center py-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> IBM Gold Partner · EAM Specialists
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] text-white md:text-7xl">
              Where asset management meets <span className="text-gradient">EAM &amp; data technology</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              RYKLO Technologies empowers your operations with smooth integration, advanced analytics, and unmatched efficiency — from strategy through enterprise rollout.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]">
                Get Started →
              </Link>
              <Link to="/services" className="rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CERTS */}
      <section className="border-y border-border bg-muted/50">
        <div className="container-x py-10">
          <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="font-display text-xl font-bold">Core Partners &amp; Certifications</h2>
              <p className="text-sm text-muted-foreground">Trusted alliances and accredited excellence.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
            {certs.map((c) => (
              <div key={c} className="grid h-20 place-items-center rounded-lg border border-border bg-background px-3 text-center text-xs font-semibold text-muted-foreground">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-x py-24">
        <div className="grid gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="border-l-2 border-accent pl-5">
              <div className="font-display text-5xl font-bold tracking-tight">{s.v}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MAXIMO */}
      <section className="container-x grid items-center gap-12 py-20 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-elegant)]">
          <img src={maximo} alt="IBM Maximo Application Suite" className="aspect-[4/3] w-full object-cover" loading="lazy" width={1280} height={896} />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Flagship Platform</div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">IBM Maximo Application Suite (MAS) 9</h2>
          <p className="mt-5 text-muted-foreground">
            Revolutionize asset management for industries of all sizes — with real-time monitoring, AI-powered predictions, and native IoT integration.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              ["Predictive Maintenance", "Reduce unplanned downtime with Maximo Predict."],
              ["Enhanced Safety", "Integrate risk assessments with Maximo Safety."],
              ["Mobile Solutions", "Empower field crews with Maximo Mobile."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span><strong className="font-semibold">{t}:</strong> <span className="text-muted-foreground">{d}</span></span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <Link to="/contact" className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">Get Started</Link>
            <Link to="/services" className="rounded-full border border-border px-6 py-3 text-sm font-semibold">Learn More</Link>
          </div>
        </div>
      </section>

      {/* TRIRIGA */}
      <section className="container-x grid items-center gap-12 py-20 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Workplace · Sustainability</div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">IBM TRIRIGA</h2>
          <p className="mt-5 text-muted-foreground">
            Optimize resources, improve sustainability, and drive cost efficiency. Real-time space utilization and automated ESG reporting keep facilities at peak performance.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              ["Integrated Lifecycle Management", "Proactively maintain assets end-to-end."],
              ["Sustainability Focus", "Track emissions and energy with actionable insight."],
              ["Unified Lease Management", "Stay compliant with automated financial reporting."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span><strong className="font-semibold">{t}:</strong> <span className="text-muted-foreground">{d}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 overflow-hidden rounded-2xl shadow-[var(--shadow-elegant)] md:order-2">
          <img src={tririga} alt="IBM TRIRIGA" className="aspect-[4/3] w-full object-cover" loading="lazy" width={1280} height={896} />
        </div>
      </section>

      {/* CLIENTS */}
      <section className="bg-muted/40 py-20">
        <div className="container-x">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Our Clientele</h2>
            <div className="hidden text-sm text-muted-foreground md:block">Trusted by mission-critical operators.</div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {clients.map((c) => (
              <div key={c} className="grid h-24 place-items-center rounded-xl border border-border bg-background text-center text-sm font-semibold text-muted-foreground transition hover:text-foreground">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="container-x py-24">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Your Vision is Our Mission</div>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Selected case studies</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { t: "California High‑Speed Rail Authority", d: "Built a credible enterprise asset registry, giving every Authority department visibility into civil assets in construction or use — improving federal and state reporting." },
            { t: "Port Authority of NY & NJ", d: "Replaced a failing mainframe with a strategic Maximo EAM platform serving every line department, with no ceiling on the level of assets managed." },
            { t: "Chicago Metra", d: "Re-engineered bridge inspection processes and built Maximo + Maximo Anywhere mobile apps for real-time, in-field data capture." },
          ].map((c) => (
            <article key={c.t} className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent">Case Study</div>
              <h3 className="mt-3 font-display text-xl font-bold">{c.t}</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              <div className="mt-6 text-sm font-semibold text-foreground">Read more →</div>
            </article>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-[color:var(--surface)] py-24 text-surface-foreground">
        <div className="container-x">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Industries</div>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">How can RYKLO serve your industry?</h2>
            <p className="mt-4 opacity-70">From transportation to power generation, we deliver EAM and data outcomes for industries where downtime is not an option.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-4">
            {industries.map((i) => (
              <Link key={i} to="/industries" className="group bg-[color:var(--surface)] p-6 transition hover:bg-white/5">
                <div className="font-display text-lg font-semibold">{i}</div>
                <div className="mt-2 text-xs opacity-50 transition group-hover:opacity-90">Explore →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-24">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-accent)] p-12 md:p-20">
          <div className="relative z-10 max-w-2xl text-white">
            <h2 className="font-display text-4xl font-bold md:text-5xl">Precision in process. Power in results.</h2>
            <p className="mt-4 text-white/85">Let's design an EAM strategy that compounds value for your operations.</p>
            <Link to="/contact" className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-foreground">
              Talk to an expert →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
