import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NAV, CONTACT, SOCIALS } from "../data/content.js";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(6, 13, 26, 0.96)" : "rgba(11, 22, 38, 0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: scrolled ? "1px solid var(--color-line)" : "1px solid transparent",
          zIndex: 100,
        }}
      >
        <div className="shell flex items-center justify-between h-[76px]">
          <Link to="/" aria-label="Scepto Import PLC — home" className="flex items-center">
            <img src="/images/scepto-logo.png" alt="Scepto Import PLC" className="h-11 w-auto" fetchPriority="high" />
          </Link>

          <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className="nav-link" end={item.to === "/"}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center gap-2"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={SOCIALS[3].path} />
              </svg>
              WhatsApp
            </a>
            <Link to="/contact" className="btn-volt text-sm !py-2.5 !px-5">
              Get a quote
            </Link>
          </div>

          <button
            className="lg:hidden flex flex-col justify-center gap-[7px] p-2 -mr-2 relative"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            style={{ zIndex: 110 }}
          >
            <span
              className="block w-6 h-0.5 bg-ink transition-transform duration-200"
              style={{ transform: open ? "rotate(45deg) translate(5px, 5px)" : "none" }}
            />
            <span
              className="block w-6 h-0.5 bg-ink transition-opacity duration-200"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="block w-6 h-0.5 bg-ink transition-transform duration-200"
              style={{ transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none" }}
            />
          </button>
        </div>
      </header>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            top: "76px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#060d1a",
            zIndex: 90,
          }}
        >
          <nav className="shell flex flex-col pt-10" aria-label="Mobile">
            {NAV.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className="py-5 text-2xl font-display font-semibold border-b flex items-center justify-between"
                style={({ isActive }) => ({
                  color: isActive ? "#f7b500" : "#f4f7fb",
                  borderColor: "#22334b",
                })}
              >
                {item.label}
                <span className="text-sm font-body font-normal" style={{ color: "#9badc6" }}>0{i + 1}</span>
              </NavLink>
            ))}
            <div className="flex flex-col gap-3 mt-8">
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full"
              >
                WhatsApp us
              </a>
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-volt w-full">
                Get a quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}