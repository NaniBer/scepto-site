import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import { useContent } from "../data/ContentContext";

const MONO_LOGOS = ["ja-solar.svg", "franklin-electric.png", "keypower.png", "shiyuan.png", "micno.png"];

const WHY_ROWS = [
  {
    title: "Our own technicians",
    sub: "Installation, commissioning and service handled in-house — spares held in Addis Ababa.",
  },
  {
    title: "QC tested",
    sub: "Every product is quality-checked before dispatch.",
  },
  {
    title: "Ten lines, one roof",
    sub: "From deep-well pumps to data-centre UPS systems — one supplier, one contract.",
  },
];

function Stat({ stat, delay }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(stat.num);
      return;
    }
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(eased * stat.num));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [stat.num]);

  const value = display === null ? 0 : display;

  return (
    <Reveal delay={delay}>
      <div ref={ref}>
        <div className="font-display font-bold text-volt leading-none text-[clamp(2.2rem,4vw,3.2rem)] tabular-nums">
          {stat.prefix}
          {value}
          {stat.suffix}
        </div>
        <p className="eyebrow text-mist mt-4">{stat.label}</p>
      </div>
    </Reveal>
  );
}

function HomeRail({ products: PRODUCTS, domains: DOMAINS }) {
  const domainLabel = (id) => DOMAINS.find((d) => d.id === id)?.label;
  const ref = useRef(null);
  const hoverRef = useRef(false);
  const interactRef = useRef(false);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    let last = performance.now();
    let idleTimer;
    const tick = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (!hoverRef.current && !interactRef.current) {
        const half = el.scrollWidth / 2;
        el.scrollLeft += 0.032 * dt;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const pauseInteract = () => {
      interactRef.current = true;
      clearTimeout(idleTimer);
    };
    const resumeSoon = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        interactRef.current = false;
      }, 2400);
    };
    el.addEventListener("pointerdown", pauseInteract);
    el.addEventListener("pointerup", resumeSoon);
    el.addEventListener("pointercancel", resumeSoon);
    el.addEventListener("wheel", () => {
      pauseInteract();
      resumeSoon();
    });
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      el.removeEventListener("pointerdown", pauseInteract);
      el.removeEventListener("pointerup", resumeSoon);
      el.removeEventListener("pointercancel", resumeSoon);
    };
  }, []);

  return (
    <section className="bg-paper text-inklight pb-20 md:pb-28">
      <div className="shell">
        <div className="flex items-center justify-end gap-6 mb-6">
          <div className="w-40 h-[3px] bg-linelight rounded-full overflow-hidden shrink-0">
            <div
              className="h-full bg-volt rounded-full transition-[width] duration-150"
              style={{ width: `${Math.max(8, prog * 92)}%` }}
            />
          </div>
        </div>
      </div>
      <div
        ref={ref}
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
        onScroll={(e) => {
          const el = e.currentTarget;
          const half = el.scrollWidth / 2;
          setProg(half > 0 ? (el.scrollLeft % half) / half : 0);
        }}
        className="flex gap-5 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent)",
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-5" aria-hidden={copy === 1 || undefined}>
            {PRODUCTS.map((p, i) => (
              <Link
                key={p.num}
                to="/products"
                className="group w-[240px] md:w-[280px] shrink-0 panel-light relative overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-4 -right-1 font-display font-bold leading-none text-inklight/[0.06] text-[4.5rem] select-none z-10"
                >
                  {p.num}
                </span>
                <div className="zoom aspect-square relative">
                  <img
                    src={p.img}
                    alt={`${p.title} — ${p.brand}`}
                    loading={copy === 0 && i < 3 ? "eager" : "lazy"}
                    className="object-contain p-[10%] w-full h-full relative"
                  />
                </div>
                <div className="p-4 pt-2.5 border-t border-linelight">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-mistlight/70">
                    {domainLabel(p.domain)}
                  </p>
                  <h3 className="font-display font-semibold text-base text-inklight mt-1.5 tracking-tight group-hover:text-arc transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs font-light text-mistlight/60 mt-1">{p.brand}</p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { blurb: BLURB, contact: CONTACT, heroSlides: HERO_SLIDES, stats: STATS, domains: DOMAINS, products: PRODUCTS, partners: PARTNERS } = useContent();
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const MARQUEE_LOGOS = (PARTNERS || []).map((p) => ({
    name: p.name,
    src: p.logo,
    mono: p.logo && MONO_LOGOS.some((m) => p.logo.includes(m)),
  }));

  useEffect(() => {
    document.title = "Scepto Import PLC — Power · Solar · Water · Ethiopia";
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, 3400);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <>
      <section className="relative overflow-hidden bg-bg pt-36 md:pt-44 pb-20 md:pb-28">
        <div className="glow" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="shell grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <Reveal delay={70}>
              <h1
                className="font-display font-bold text-[clamp(2.6rem,6vw,4.3rem)] leading-[1.04] mt-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Powering Ethiopia <span className="text-volt">forward.</span>
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-lg font-light text-mist max-w-xl mt-6 leading-relaxed">
                {BLURB}
              </p>
            </Reveal>
            <Reveal delay={210}>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Magnetic>
                  <Link to="/contact" className="btn-volt">
                    Request a quote <span className="btn-arrow">→</span>
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link to="/products" className="btn-ghost">
                    Browse catalogue
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div
              className="card-dark relative overflow-hidden backdrop-blur"
              style={{ aspectRatio: "4 / 5", background: "rgba(19, 39, 65, 0.7)" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {HERO_SLIDES.map((s, i) => (
                <img
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  className={`absolute inset-0 w-full h-full object-contain p-[10%] transition-opacity duration-[900ms] ease-out ${
                    i === slide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <p className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.14em] text-mist/80">
                {HERO_SLIDES[slide].alt}
              </p>
              <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
                {HERO_SLIDES.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    aria-label={`Show product ${i + 1}`}
                    onClick={() => setSlide(i)}
                    className={`w-2 h-2 rounded-full ${
                      i === slide ? "bg-volt" : "bg-ink/25"
                    }`}
                  />
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-volt/70" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg border-y border-line py-5">
        <div className="marquee">
          <div className="marquee-track">
            {[false, true].map((hidden) => (
              <div
                key={String(hidden)}
                className="flex items-center"
                aria-hidden={hidden || undefined}
              >
                {MARQUEE_LOGOS.map((logo, i) => (
                  <Fragment key={logo.name}>
                    <span className="flex items-center justify-center w-36 md:w-40 shrink-0">
                      {logo.src ? (
                        <img
                          src={logo.src}
                          alt={logo.name}
                          className="h-5 md:h-6 w-auto max-w-[8rem] object-contain opacity-60"
                          style={
                            logo.mono
                              ? { filter: "brightness(0) invert(1)" }
                              : undefined
                          }
                        />
                      ) : (
                        <span className="uppercase text-xs tracking-[0.16em] text-mist/80 font-light">
                          {logo.name}
                        </span>
                      )}
                    </span>
                    {i < MARQUEE_LOGOS.length - 1 && (
                      <span className="w-1.5 h-1.5 bg-volt/60 rotate-45 inline-block shrink-0" />
                    )}
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-16 md:py-24">
        <div className="shell grid grid-cols-1 sm:grid-cols-3 gap-10">
          {STATS.map((stat, i) => (
            <Stat key={stat.label} stat={stat} delay={i * 80} />
          ))}
        </div>
      </section>

      <section className="bg-paper text-inklight pt-20 md:pt-28 pb-8">
        <div className="shell">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <SectionHead
              tone="light"
              eyebrow="What we do"
              title="Power, solar & water — one supplier"
            />
            <Link to="/products" className="btn-ghost-light shrink-0">
              View all products →
            </Link>
          </div>
        </div>
      </section>

      <HomeRail products={PRODUCTS} domains={DOMAINS} />

      <section className="bg-bg py-20 md:py-28">
        <div className="shell grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <SectionHead
              eyebrow="Why Scepto"
              title="We sell it, install it and stand behind it."
            />
            <ul className="mt-8 space-y-5">
              {WHY_ROWS.map((row) => (
                <li key={row.title} className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-volt/10 border border-volt/40 flex items-center justify-center shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-volt"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{row.title}</p>
                    <p className="text-sm font-light text-mist mt-1">{row.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Link to="/about" className="btn-volt">
                Talk to our team <span className="btn-arrow">→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative rounded-2xl overflow-hidden border border-line zoom">
              <img
                src="/images/misc/storefront.jpg"
                alt="Scepto Import PLC showroom at Wollo Sefer, Addis Ababa"
                className="object-cover w-full aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/30 to-transparent" />
              <div className="absolute bottom-0 p-7">
                <p className="eyebrow text-mist">Showroom</p>
                <p className="text-sm font-light text-ink/90 mt-2">
                  Wollo Sefer, Addis Ababa — the whole system, running.
                </p>
                <div className="mt-2 space-y-1">
                  <a
                    href={CONTACT.phoneHref}
                    className="text-volt text-sm font-medium block"
                  >
                    0988 88 8855
                  </a>
                  <a
                    href={CONTACT.showroomPhoneHref}
                    className="text-volt text-sm font-medium block"
                  >
                    0944 44 00 00
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
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
