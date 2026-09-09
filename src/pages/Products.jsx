import { useEffect } from "react";
import { Link } from "react-router-dom";
import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import { CONTACT, PRODUCTS } from "../data/content";

function Editorial() {
  const SUBHEADS = {
    "01": "Tier-1 performance for every rooftop and farm",
    "02": "Off-grid to hybrid, monitored from your phone",
    "03": "Lithium cabinets that scale with the load",
    "04": "Clean backup for banking, IT and industry",
    "05": "Duty-ready cooling for rooms that never sleep",
    "06": "Prime or standby, from 10 to 3000 kVA",
    "07": "Deep-well and solar pumping, 4\u2033 to 12\u2033",
    "08": "Filtration, media and switchgear built to spec",
    "09": "Pre-integrated racks, aisles and monitoring",
    "10": "Borehole steel for aggressive water chemistry",
  };

  return (
    <>
      {PRODUCTS.map((p, i) => {
        const dark = i % 2 === 0;
        return (
          <section
            key={p.num}
            className={dark ? "bg-bg text-ink" : "bg-paper text-inklight"}
          >
            <div className="shell py-14 md:py-20">
              <Reveal>
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <div
                    className={`${dark ? "panel-dark" : "panel-light"} zoom aspect-[4/3] ${
                      i % 2 === 0 ? "" : "lg:order-2"
                    }`}
                  >
                    <img
                      src={p.img}
                      alt={`${p.title} — ${p.brand}`}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="object-contain p-[8%] w-full h-full relative"
                    />
                  </div>
                  <div className={i % 2 === 0 ? "" : "lg:order-1"}>
                    <span className={dark ? "chip-volt" : "chip-amber"}>
                      {p.brand}
                    </span>
                    <h3
                      className="font-display font-semibold text-3xl md:text-4xl mt-5 tracking-tight"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className={`text-sm md:text-base font-medium mt-3 ${
                        dark ? "text-volt" : "text-arc"
                      }`}
                    >
                      {SUBHEADS[p.num]}
                    </p>
                    <p
                      className={`text-sm md:text-[15px] font-light mt-4 leading-relaxed max-w-lg ${
                        dark ? "text-mist" : "text-mistlight"
                      }`}
                    >
                      {p.desc}
                    </p>
                    <div
                      className={`mt-7 pt-6 border-t ${
                        dark ? "border-line" : "border-linelight"
                      }`}
                    >
                      <p
                        className={`text-[11px] font-medium uppercase tracking-[0.18em] ${
                          dark ? "text-mist/70" : "text-mistlight/70"
                        }`}
                      >
                        Key specs
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {p.tags.slice(0, 3).map((t) => (
                          <li key={t} className="flex items-center gap-2.5">
                            <span
                              aria-hidden="true"
                              className="w-1.5 h-1.5 bg-volt rotate-45 shrink-0"
                            />
                            <span
                              className={`text-sm font-light ${
                                dark ? "text-mist" : "text-mistlight"
                              }`}
                            >
                              {t}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {p.note && (
                      <p
                        className={`text-xs font-medium mt-4 ${
                          dark ? "text-volt" : "text-amber-ink"
                        }`}
                      >
                        {p.note}
                      </p>
                    )}
                    <Link
                      to="/contact"
                      className={`inline-flex items-center gap-2 text-sm font-medium mt-7 ${
                        dark ? "text-volt hover:text-voltup" : "text-volt hover:text-arc"
                      } transition-colors`}
                    >
                      Enquire about this line
                      <span className="btn-arrow">→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}
    </>
  );
}

export default function Products() {
  useEffect(() => {
    document.title = "Products — Scepto Import PLC";
  }, []);

  return (
    <>
      <section className="relative overflow-hidden pt-36 md:pt-44 pb-16 md:pb-24">
        <div className="glow" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-mist">Products</p>
            <h1
              className="font-display font-bold text-ink text-[clamp(2.3rem,5vw,3.9rem)] leading-[1.06] mt-5"
              style={{ letterSpacing: "-0.02em" }}
            >
              Ten product lines. <span className="text-volt">One supplier.</span>
            </h1>
            <p className="text-lg font-light text-mist max-w-2xl mt-5">
              Solar, power electronics, generators, pumps and water systems —
              supplied, installed and serviced across Ethiopia.
            </p>
            <div className="divider-volt mt-7" />
          </Reveal>
        </div>
      </section>

      <section className="bg-paper text-inklight pt-20 md:pt-28 pb-10">
        <div className="shell">
          <SectionHead
            tone="light"
            eyebrow="01 — Product lines"
            title="The catalogue"
          />
        </div>
      </section>

      <Editorial />

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
            <Magnetic>
              <Link to="/contact" className="btn-navy">
                Get a quote <span className="btn-arrow">→</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-navy"
              >
                WhatsApp us
              </a>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}