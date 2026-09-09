import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "../components/CountUp";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import {
  CONTACT,
  VIDEO_EMBED,
  BLURB,
  ABOUT_PARAGRAPHS,
  ABOUT_MOTTO,
  SECTORS,
  PROCESS,
  PARTNERS,
  DEPARTMENTS,
} from "../data/content";

const FACTS = [
  { num: 10, label: " product lines" },
  { num: 8, label: " principal partners" },
  { num: 8, label: " departments" },
];

export default function About() {
  const [logoLayout, setLogoLayout] = useState("logo-desc");
  const [deptLayout, setDeptLayout] = useState("grid");
  const [openDept, setOpenDept] = useState(null);
  useEffect(() => {
    document.title = "About — Scepto Import PLC";
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-bg pt-36 md:pt-44 pb-16 md:pb-24">
        <div className="glow" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-mist">About us</p>
            <h1
              className="font-display font-bold text-[clamp(2.3rem,5vw,3.9rem)] leading-[1.06] text-ink max-w-3xl mt-5"
              style={{ letterSpacing: "-0.02em" }}
            >
              Supplying power, solar and water across{" "}
              <span className="text-volt">Ethiopia.</span>
            </h1>
            <p className="text-lg font-light text-mist max-w-2xl mt-5">
              {BLURB}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg py-16 md:py-24">
        <div className="shell grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-line aspect-video">
              <iframe
                src={VIDEO_EMBED}
                title="Scepto Import PLC — company video"
                className="w-full h-full border-0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow text-mist">01 — Who we are</p>
            <h2
              className="font-display font-bold text-[clamp(1.75rem,3.4vw,2.6rem)] text-ink mt-3"
              style={{ letterSpacing: "-0.02em" }}
            >
              A team that knows power, water and solar.
            </h2>
            <div className="mt-6 space-y-4">
              {ABOUT_PARAGRAPHS.map((para) => (
                <p key={para.slice(0, 24)} className="text-mist font-light leading-relaxed">
                  {para}
                </p>
              ))}
              <p className="font-display font-semibold text-volt text-lg tracking-tight pt-2">
                {ABOUT_MOTTO}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-x-8 gap-y-2">
              {FACTS.map((fact, i) => (
                <div key={fact.label}>
                  <span className="text-volt font-display font-bold">
                    <CountUp value={fact.num} delay={i * 120} />
                  </span>
                  <span className="text-sm font-light text-mist">
                    {fact.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper text-inklight py-20 md:py-28">
        <div className="shell">
          <SectionHead
            tone="light"
            eyebrow="02 — Sectors we serve"
            title="Industries we power"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {SECTORS.map((sector, i) => (
              <Reveal key={sector.sector} delay={i * 80} className="h-full">
                <div className="card-light p-6 h-full">
                  <span className="chip-amber">{sector.tag}</span>
                  <h3 className="font-display font-semibold text-lg text-inklight mt-4">
                    {sector.sector}
                  </h3>
                  <p className="text-sm font-light text-mistlight mt-2">
                    {sector.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper text-inklight border-t border-linelight py-20 md:py-24">
        <div className="shell">
          <SectionHead tone="light" eyebrow="03 — Process" title="How we work" />
          <div className="relative grid lg:grid-cols-4 gap-8 mt-12">
            <div
              className="hidden lg:block absolute top-[26px] left-[10%] right-[10%] h-px bg-linelight"
              aria-hidden="true"
            />
            {PROCESS.map((step, i) => (
              <Reveal key={step.num} delay={i * 90} className="flex flex-col">
                <div className="w-[52px] h-[52px] rounded-full bg-bg text-volt font-display font-bold text-lg flex items-center justify-center border border-line relative z-10">
                  {step.num}
                </div>
                <h3 className="font-display font-semibold text-lg text-inklight mt-5">
                  {step.title}
                </h3>
                <p className="text-sm font-light text-mistlight mt-1">
                  {step.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper text-inklight border-t border-linelight py-20 md:py-28">
        <div className="shell">
          <SectionHead
            tone="light"
            eyebrow="04 — Principals"
            title="Brands we represent"
          />
          <div className="flex items-center gap-2 mt-6 mb-8">
            <span className="text-xs uppercase tracking-[0.14em] text-mistlight mr-2">Layout</span>
            <button
              type="button"
              onClick={() => setLogoLayout("logo-only")}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                logoLayout === "logo-only"
                  ? "bg-inklight text-paper border-inklight"
                  : "bg-transparent text-mistlight border-linelight hover:border-mistlight"
              }`}
            >
              Logo only
            </button>
            <button
              type="button"
              onClick={() => setLogoLayout("logo-desc")}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                logoLayout === "logo-desc"
                  ? "bg-inklight text-paper border-inklight"
                  : "bg-transparent text-mistlight border-linelight hover:border-mistlight"
              }`}
            >
              Logo + description
            </button>
          </div>

          {logoLayout === "logo-only" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
              {PARTNERS.map((partner, i) => (
                <Reveal key={partner.name} delay={(i % 4) * 80} className="h-full">
                  <div className="card-light h-full flex items-center justify-center p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="h-14 w-auto max-w-[8rem] object-contain"
                      />
                    ) : (
                      <h3 className="font-display font-bold text-lg text-inklight text-center">
                        {partner.name}
                      </h3>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
              {PARTNERS.map((partner, i) => (
                <Reveal key={partner.name} delay={(i % 3) * 80} className="h-full">
                  <div className="card-light p-6 h-full flex flex-col relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
                    {partner.featured && (
                      <span
                        className="absolute left-0 right-0 bottom-0 h-1 bg-volt"
                        aria-hidden="true"
                      />
                    )}
                    <div className="flex items-center h-14 mb-4">
                      {partner.logo ? (
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="h-12 w-auto max-w-[10rem] object-contain"
                        />
                      ) : (
                        <h3 className="font-display font-bold text-xl text-inklight">
                          {partner.name}
                        </h3>
                      )}
                    </div>
                    <p className="text-sm font-light text-mistlight">
                      {partner.desc}
                    </p>
                    <div className="mt-5 mt-auto pt-4 border-t border-linelight flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.08em] text-mistlight">
                        {partner.origin}
                      </span>
                      <span className="text-xs font-light text-mistlight">
                        {partner.status}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-bg py-20 md:py-28">
        <div className="shell grid lg:grid-cols-2 gap-6 items-stretch">
          <Reveal className="h-full">
            <div className="relative rounded-2xl overflow-hidden border border-line h-full min-h-[380px]">
              <img
                src="/images/misc/storefront.jpg"
                alt="Scepto Import PLC showroom storefront at Gorgoreos Roundabout, Addis Ababa"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/40 to-bg/10"
                aria-hidden="true"
              />
              <div className="absolute bottom-0 p-8 md:p-10">
                <p className="eyebrow text-mist">Showroom</p>
                <h3 className="font-display font-bold text-[clamp(1.4rem,2.5vw,1.9rem)] text-ink mt-3">
                  Walk in. See the whole system running.
                </h3>
                <p className="text-mist font-light mt-3 max-w-md">
                  Wollo Sefer, Gorgoreos Roundabout — before Kas Tower. Pumps,
                  generators and power systems on display, with technical staff
                  on hand.
                </p>
                <div className="mt-5 space-y-1">
                  <a
                    href={CONTACT.phoneHref}
                    className="block text-sm font-medium text-volt"
                  >
                    Head office — 0988 88 8855
                  </a>
                  <a
                    href={CONTACT.showroomPhoneHref}
                    className="block text-sm font-medium text-volt"
                  >
                    Showroom — 0944 44 00 00
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150} className="h-full">
            <div
              className="card-dark relative p-8 md:p-10 flex flex-col justify-center h-full"
              style={{ paddingLeft: "calc(2rem + 4px)" }}
            >
              <span
                className="absolute left-0 top-8 bottom-8 w-1 bg-volt rounded-full"
                aria-hidden="true"
              />
              <span
                className="font-display text-volt text-7xl leading-none"
                aria-hidden="true"
              >
                “
              </span>
              <blockquote className="font-display font-semibold text-[clamp(1.3rem,2.4vw,1.8rem)] leading-snug text-ink mt-2">
                We strive to provide an incredible product backed by incredible
                after-sales customer service.
              </blockquote>
              <cite className="not-italic text-sm font-light text-mist mt-6 block">
                — Scepto Import PLC
              </cite>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper text-inklight py-20 md:py-28">
        <div className="shell">
          <SectionHead
            tone="light"
            eyebrow="05 — Organization"
            title="Departments"
          />
          <div className="flex flex-wrap items-center gap-2 mt-6 mb-8">
            <span className="text-xs uppercase tracking-[0.14em] text-mistlight mr-2">Layout</span>
            {[
              { id: "grid", label: "Grid" },
              { id: "marquee", label: "Marquee rail" },
              { id: "directory", label: "Directory list" },
              { id: "accordion", label: "Accordion" },
              { id: "radial", label: "Radial" },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setDeptLayout(opt.id)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  deptLayout === opt.id
                    ? "bg-inklight text-paper border-inklight"
                    : "bg-transparent text-mistlight border-linelight hover:border-mistlight"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {deptLayout === "grid" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
              {DEPARTMENTS.map((dept, i) => (
                <Reveal key={dept.num} delay={(i % 4) * 60} className="h-full">
                  <div className="card-light p-5 h-full">
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-mistlight">
                      {dept.num}
                    </span>
                    <h3 className="font-display font-semibold text-base text-inklight mt-3">
                      {dept.name}
                    </h3>
                    <p className="text-sm font-light text-mistlight mt-1.5">
                      {dept.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {deptLayout === "marquee" && (
            <div className="mt-10 overflow-hidden -mx-6 px-6">
              <div className="marquee">
                <div className="marquee-track">
                  {[false, true].map((hidden) => (
                    <div
                      key={String(hidden)}
                      className="flex items-center gap-5"
                      aria-hidden={hidden || undefined}
                    >
                      {DEPARTMENTS.map((dept) => (
                        <div
                          key={dept.num}
                          className="shrink-0 w-[260px] card-light p-6 flex flex-col items-start"
                        >
                          <span className="font-display font-bold text-5xl text-inklight/[0.08] leading-none">
                            {dept.num}
                          </span>
                          <h3 className="font-display font-semibold text-base text-inklight mt-3">
                            {dept.name}
                          </h3>
                          <p className="text-sm font-light text-mistlight mt-1.5">
                            {dept.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {deptLayout === "directory" && (
            <div className="mt-10 divide-y divide-linelight border-y border-linelight">
              {DEPARTMENTS.map((dept, i) => (
                <Reveal key={dept.num} delay={(i % 4) * 40}>
                  <div className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_2fr] gap-4 md:gap-8 py-5 items-baseline group hover:bg-linelight/30 transition-colors -mx-4 px-4 rounded-lg">
                    <span className="font-display font-bold text-lg text-volt tabular-nums w-8">
                      {dept.num}
                    </span>
                    <h3 className="font-display font-semibold text-lg md:text-xl text-inklight">
                      {dept.name}
                    </h3>
                    <p className="text-sm font-light text-mistlight md:col-start-3">
                      {dept.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {deptLayout === "accordion" && (
            <div className="mt-10 border-y border-linelight divide-y divide-linelight">
              {DEPARTMENTS.map((dept) => {
                const isOpen = openDept === dept.num;
                return (
                  <div key={dept.num}>
                    <button
                      type="button"
                      onClick={() => setOpenDept(isOpen ? null : dept.num)}
                      className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-display font-bold text-sm text-volt tabular-nums w-6">
                          {dept.num}
                        </span>
                        <h3 className="font-display font-semibold text-lg md:text-xl text-inklight">
                          {dept.name}
                        </h3>
                      </div>
                      <span
                        className={`text-mistlight transition-transform duration-200 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isOpen ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-sm font-light text-mistlight pl-10 max-w-2xl">
                        {dept.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {deptLayout === "radial" && (
            <div className="mt-10 flex items-center justify-center">
              <div className="relative w-full max-w-[640px] aspect-square">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-bg border-2 border-volt flex items-center justify-center shadow-xl">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-mist font-medium">
                        Scepto
                      </p>
                      <p className="font-display font-bold text-sm md:text-base text-ink mt-1">
                        Import PLC
                      </p>
                    </div>
                  </div>
                </div>
                {DEPARTMENTS.map((dept, i) => {
                  const angle = (i / DEPARTMENTS.length) * 2 * Math.PI - Math.PI / 2;
                  const radius = 42;
                  const x = 50 + Math.cos(angle) * radius;
                  const y = 50 + Math.sin(angle) * radius;
                  return (
                    <div
                      key={dept.num}
                      className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                      style={{ left: `${x}%`, top: `${y}%`, width: "28%" }}
                    >
                      <div className="card-light p-3 md:p-4 hover:-translate-y-1 hover:shadow-xl transition-all">
                        <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-volt block">
                          {dept.num}
                        </span>
                        <h3 className="font-display font-semibold text-[11px] md:text-sm text-inklight mt-1 leading-tight">
                          {dept.name}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-volt">
        <div className="shell py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-inklight/60">
              Get a quote today
            </p>
            <h2
              className="font-display font-bold text-inklight leading-[1.05] text-[clamp(1.9rem,4vw,3rem)] mt-3"
              style={{ letterSpacing: "-0.02em" }}
            >
              Let's power your <br /> next project.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/contact" className="btn-navy">
              Get a quote <span className="btn-arrow">→</span>
            </Link>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-navy"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
