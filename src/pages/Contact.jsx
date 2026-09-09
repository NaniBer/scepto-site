import { useEffect, useState } from "react";
import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";
import { CONTACT, SOCIALS } from "../data/content";

const EMPTY = { name: "", email: "", subject: "", message: "", website: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full bg-surface border rounded-[10px] px-3.5 py-3 text-ink text-sm outline-none transition-colors focus:border-volt placeholder:text-mist/40";

function Field({ id, label, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium uppercase tracking-[0.1em] text-mist mb-2"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    document.title = "Contact — Scepto Import PLC";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = (values) => {
    const errs = {};
    if (!values.name.trim()) errs.name = "Full name is required";
    else if (values.name.trim().length > 100)
      errs.name = "Full name must be 100 characters or fewer";
    if (!values.email.trim()) errs.email = "Email address is required";
    else if (!EMAIL_RE.test(values.email.trim()))
      errs.email = "Please enter a valid email address";
    if (!values.subject.trim()) errs.subject = "Subject is required";
    else if (values.subject.trim().length > 200)
      errs.subject = "Subject must be 200 characters or fewer";
    if (!values.message.trim()) errs.message = "Message is required";
    else if (values.message.trim().length > 5000)
      errs.message = "Message must be 5000 characters or fewer";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!form.website) {
      const errs = validate(form);
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
    }
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("sent");
      setForm(EMPTY);
      window.setTimeout(() => setStatus("idle"), 5000);
    }, 1200);
  };

  const sending = status === "sending";

  return (
    <>
      <section className="relative overflow-hidden bg-bg pt-36 md:pt-44 pb-16 md:pb-24">
        <div className="glow" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-mist">Contact</p>
            <h1
              className="font-display font-bold text-[clamp(2.3rem,5vw,3.9rem)] leading-[1.06] text-ink max-w-3xl mt-5"
              style={{ letterSpacing: "-0.02em" }}
            >
              Let&apos;s power your next <span className="text-volt">project.</span>
            </h1>
            <p className="text-lg font-light text-mist max-w-2xl mt-5">
              Quotes on solar, pumps, generators, UPS and water treatment
              systems — reach us by form, phone or WhatsApp.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg text-ink py-16 md:py-24">
        <div className="shell">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            <Reveal className="lg:col-span-7">
              <div className="card-dark p-6 md:p-10">
                <h2 className="font-display font-bold text-2xl text-ink">
                  Request a quote
                </h2>
                <p className="text-sm font-light text-mist mt-2">
                  Tell us about your project and we&apos;ll get back to you
                  within one business day.
                </p>
                <form className="mt-8" noValidate onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                    value={form.website}
                    onChange={handleChange}
                  />
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field id="name" label="Full name" error={errors.name}>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClass}
                        style={{
                          borderColor: errors.name
                            ? "#f87171"
                            : "var(--color-line)",
                        }}
                      />
                    </Field>
                    <Field
                      id="email"
                      label="Email address"
                      error={errors.email}
                    >
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={inputClass}
                        style={{
                          borderColor: errors.email
                            ? "#f87171"
                            : "var(--color-line)",
                        }}
                      />
                    </Field>
                  </div>
                  <div className="mt-5">
                    <Field id="subject" label="Subject" error={errors.subject}>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="What do you need?"
                        className={inputClass}
                        style={{
                          borderColor: errors.subject
                            ? "#f87171"
                            : "var(--color-line)",
                        }}
                      />
                    </Field>
                  </div>
                  <div className="mt-5">
                    <Field id="message" label="Message" error={errors.message}>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your site, load or project…"
                        className={inputClass}
                        style={{
                          borderColor: errors.message
                            ? "#f87171"
                            : "var(--color-line)",
                        }}
                      />
                    </Field>
                  </div>
                  <Magnetic>
                    <button
                      type="submit"
                      disabled={sending}
                      className={`btn-volt w-full !py-3.5 mt-2${
                        sending ? " opacity-70" : ""
                      }`}
                    >
                      {sending ? (
                        "Sending…"
                      ) : status === "sent" ? (
                        "Message sent"
                      ) : (
                        <>
                          Send message<span className="btn-arrow">→</span>
                        </>
                      )}
                    </button>
                  </Magnetic>
                  {status === "sent" && (
                    <div
                      className="mt-5 p-4 rounded-[10px] text-sm flex items-center gap-3 border"
                      style={{
                        backgroundColor: "rgba(34,197,94,0.08)",
                        borderColor: "rgba(34,197,94,0.25)",
                        color: "#4ade80",
                      }}
                    >
                      <svg
                        className="w-4 h-4 stroke-green-400 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>
                        Your message has been sent successfully. We&apos;ll be
                        in touch shortly.
                      </span>
                    </div>
                  )}
                  {status === "error" && (
                    <div
                      className="mt-5 p-4 rounded-[10px] text-sm flex items-center gap-3 border"
                      style={{
                        backgroundColor: "rgba(239,68,68,0.08)",
                        borderColor: "rgba(239,68,68,0.25)",
                        color: "#f87171",
                      }}
                    >
                      <svg
                        className="w-4 h-4 stroke-red-400 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4" />
                        <path d="M12 16h.01" />
                      </svg>
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}
                </form>
                <p className="mt-6 text-center text-sm font-light text-mist">
                  Prefer email?{" "}
                  <a
                    href={CONTACT.emailHref}
                    className="text-volt font-medium"
                  >
                    {CONTACT.email}
                  </a>
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-5 flex flex-col gap-5">
              <Reveal delay={80}>
                <div className="card-dark p-6">
                  <p className="eyebrow text-mist">Head office</p>
                  <p className="text-sm font-light text-mist leading-relaxed mt-4">
                    {CONTACT.office}
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <a
                      href={CONTACT.phoneHref}
                      className="block text-ink hover:text-volt transition-colors"
                    >
                      {CONTACT.phone}
                    </a>
                    <a
                      href={CONTACT.emailHref}
                      className="block text-ink hover:text-volt transition-colors"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={140}>
                <div className="card-dark p-6">
                  <p className="eyebrow text-mist">Showroom</p>
                  <p className="text-sm font-light text-mist leading-relaxed mt-4">
                    {CONTACT.showroom}
                  </p>
                  <p className="text-xs font-light text-mist/80 mt-3">
                    Walk-in support, product demos and technical advice.
                  </p>
                  <a
                    href={CONTACT.showroomPhoneHref}
                    className="block text-sm text-volt font-medium mt-4"
                  >
                    0944 44 00 00
                  </a>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="card-dark p-6 md:p-7">
                  <p className="eyebrow text-mist">Fast response</p>
                  <h3 className="font-display font-semibold text-lg text-ink mt-3">
                    Chat with us on WhatsApp
                  </h3>
                  <p className="text-sm font-light text-mist mt-2">
                    Send your specs, photos or site details — a sales engineer
                    replies directly.
                  </p>
                  <Magnetic>
                    <a
                      href={CONTACT.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-volt w-full mt-5"
                    >
                      Start chat<span className="btn-arrow">→</span>
                    </a>
                  </Magnetic>
                </div>
              </Reveal>
              <Reveal delay={260}>
                <div className="card-dark p-6">
                  <p className="eyebrow text-mist">Follow us</p>
                  <div className="mt-5 flex items-center gap-2.5">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        className="flex items-center justify-center rounded-full border border-line text-mist transition-colors hover:bg-volt hover:border-volt hover:text-ink"
                        style={{ width: 38, height: 38 }}
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d={s.path} />
                        </svg>
                      </a>
                    ))}
                  </div>
                  <p className="text-xs font-light text-mist mt-4">
                    @scepto_import — TikTok · Facebook · X
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
