import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RYKLO Technologies" },
      { name: "description", content: "Reach RYKLO Technologies to start an EAM, IBM Maximo, TRIRIGA, or data engineering engagement." },
      { property: "og:title", content: "Contact RYKLO Technologies" },
      { property: "og:description", content: "Talk to our EAM and data specialists." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="container-x grid gap-16 py-24 md:grid-cols-2">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Connect with us</div>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-6xl">Let's build the operations layer you deserve.</h1>
          <p className="mt-6 text-muted-foreground">
            Whether you're scoping a Maximo upgrade, planning a TRIRIGA rollout, or rescuing a stalled migration — we'll respond within one business day.
          </p>
          <dl className="mt-10 space-y-5 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</dt>
              <dd className="mt-1 font-medium">hello@ryklotech.com</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</dt>
              <dd className="mt-1 font-medium">+1 (555) 014‑9000</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Offices</dt>
              <dd className="mt-1 font-medium">Austin · Hyderabad · New York</dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-elegant)]"
        >
          {sent ? (
            <div className="grid place-items-center py-16 text-center">
              <div className="text-4xl">✓</div>
              <h3 className="mt-4 font-display text-2xl font-bold">Thanks — we'll be in touch.</h3>
              <p className="mt-2 text-sm text-muted-foreground">A specialist will reach out within one business day.</p>
            </div>
          ) : (
            <div className="space-y-5">
              <Field label="Full name" name="name" />
              <Field label="Work email" name="email" type="email" />
              <Field label="Company" name="company" />
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">How can we help?</label>
                <textarea required rows={5} name="message" className="w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-foreground" />
              </div>
              <button className="w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background">Send message →</button>
            </div>
          )}
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input required type={type} name={name} className="w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-foreground" />
    </div>
  );
}
