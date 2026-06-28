import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — RYKLO Technologies" },
      { name: "description", content: "RYKLO Technologies serves transportation, utilities, healthcare, airports, seaports, manufacturing, oil & gas, and more." },
      { property: "og:title", content: "Industries served by RYKLO" },
      { property: "og:description", content: "Asset-intensive industries where downtime is not an option." },
    ],
  }),
  component: Industries,
});

const list = [
  ["Transportation", "Rail, transit, and fleet operators modernizing asset registries and inspection workflows."],
  ["Facilities Management", "Campus, corporate, and public sector facilities running on integrated EAM + IWMS."],
  ["Utilities", "Generation, transmission, and distribution — reliability and compliance built in."],
  ["Airports", "Airside and landside assets unified under a single source of truth."],
  ["Seaports", "Cranes, terminals, and infrastructure on real-time mobile work management."],
  ["Healthcare", "Clinical engineering and facilities with HIPAA-aware data practices."],
  ["Transmission & Distribution", "Linear assets, GIS integration, and predictive maintenance at scale."],
  ["Life Sciences", "Validated environments with calibration and compliance built into the workflow."],
  ["Oil & Gas", "Upstream to downstream — safety, reliability, and turnaround planning."],
  ["Calibration", "End-to-end calibration programs with auditable history."],
  ["Manufacturing", "Plant maintenance, OEE, and IoT-driven asset health."],
  ["Power Generation", "Conventional and renewable generators, with sustainability reporting."],
];

function Industries() {
  return (
    <SiteLayout>
      <section className="container-x py-24">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Industries</div>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-6xl">Built for operations that can't slow down.</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            We work with regulated, asset-heavy industries where the cost of downtime is measured in lives, revenue, and trust.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map(([t, d]) => (
            <article key={t} className="rounded-2xl border border-border p-7 transition hover:border-foreground/40">
              <h3 className="font-display text-xl font-bold">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link to="/contact" className="rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background">
            Discuss your industry →
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
