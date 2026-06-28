import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — RYKLO Technologies" },
      { name: "description", content: "RYKLO Technologies is an IBM Gold Partner specializing in EAM, IBM Maximo, TRIRIGA, and data engineering for highly regulated industries." },
      { property: "og:title", content: "About RYKLO Technologies" },
      { property: "og:description", content: "Strategy-led EAM specialists with decades of regulated-industry experience." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="container-x py-24">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">About RYKLO</div>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-6xl">
            Operations are our craft. <span className="text-gradient">Outcomes are our promise.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            RYKLO Technologies brings together asset management strategists, EAM architects, and data engineers to modernize the systems that keep critical infrastructure running.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40 py-20">
        <div className="container-x grid gap-12 md:grid-cols-3">
          {[
            { t: "Our Vision", d: "A world where every critical asset is fully understood, predictable, and optimized — from civil works to digital infrastructure." },
            { t: "Our Mission", d: "Deliver EAM and data programs that compound value year over year, anchored in measurable operational outcomes." },
            { t: "Our Approach", d: "Strategy, implementation, and managed services — joined by a deep partnership model and IBM Gold-tier delivery." },
          ].map((b) => (
            <div key={b.t}>
              <h3 className="font-display text-2xl font-bold">{b.t}</h3>
              <p className="mt-3 text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-24">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Why teams choose RYKLO</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            ["IBM Gold Partner", "Certified delivery for Maximo Application Suite and TRIRIGA across regulated industries."],
            ["Strategy-First Engagement", "Every implementation starts with a clear EAM strategy — not a software install."],
            ["Senior, US‑Based Leadership", "Programs led by practitioners with 20+ years of EAM and project controls expertise."],
            ["End-to-End Delivery", "From data discovery and migration to mobile rollout and managed support."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-border p-7">
              <h3 className="font-display text-xl font-bold">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link to="/contact" className="rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background">Start a conversation →</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
