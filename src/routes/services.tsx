import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — RYKLO Technologies" },
      { name: "description", content: "IBM Maximo (MAS 9), TRIRIGA, Maximo 7.6 extended support, EAM strategy, and data engineering services from RYKLO Technologies." },
      { property: "og:title", content: "RYKLO Services" },
      { property: "og:description", content: "EAM strategy, Maximo, TRIRIGA, and data services for asset-intensive operations." },
    ],
  }),
  component: Services,
});

const services = [
  { t: "IBM Maximo Application Suite (MAS) 9", d: "Implementation, upgrades, and integration for the next generation of EAM — including Predict, Health, Safety, and Mobile.", items: ["Predictive Maintenance", "IoT Integration", "Maximo Mobile", "Cloud / On-Prem"] },
  { t: "IBM TRIRIGA", d: "Workplace, facilities, lease, and sustainability management with automated ESG reporting and real-time space analytics.", items: ["Space & Workplace", "Lease Accounting", "Sustainability / ESG", "Capital Projects"] },
  { t: "Maximo 7.6.x Extended Support", d: "Keep legacy Maximo systems secure and compliant while you plan a strategic move to MAS 9.", items: ["Security Patching", "Bug Resolution", "Upgrade Roadmap", "Managed Support"] },
  { t: "EAM Strategy & Roadmaps", d: "Maturity assessments, asset hierarchy design, and multi-year roadmaps grounded in IAM best practices.", items: ["EAM Maturity", "Asset Hierarchy", "KPIs & Reporting", "Change Enablement"] },
  { t: "Data Engineering & Migration", d: "Forensic data management, cleansing, master data, and migration into Maximo / TRIRIGA at scale.", items: ["Data Cleansing", "Master Data", "ETL & Migration", "Analytics"] },
  { t: "Managed Services", d: "Long-term operations, enhancements, and support delivered by a senior US-based bench.", items: ["L2/L3 Support", "Enhancements", "Release Mgmt", "24/7 Coverage"] },
];

function Services() {
  return (
    <SiteLayout>
      <section className="container-x py-24">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Services</div>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-6xl">A complete EAM &amp; data practice.</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Strategy, implementation, integration, and managed services across IBM Maximo, TRIRIGA, and the data layer they depend on.
          </p>
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.t} className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
              <h3 className="font-display text-xl font-bold">{s.t}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <li key={i} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-[color:var(--surface)] p-12 text-surface-foreground md:p-16">
          <div className="grid items-center gap-10 md:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Need an upgrade roadmap?</h2>
              <p className="mt-3 opacity-75">Tell us about your Maximo or TRIRIGA estate and we'll come back with a pragmatic, phased plan within a week.</p>
            </div>
            <div className="md:text-right">
              <Link to="/contact" className="inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground">Request a roadmap →</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
