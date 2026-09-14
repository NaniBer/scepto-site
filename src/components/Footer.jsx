import { Link } from "react-router-dom";
import { NAV, CONTACT, SOCIALS, BLURB } from "../data/content.js";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-deep border-t border-line">
      <div className="shell py-14 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
        <div className="md:col-span-5">
          <img src="/images/scepto-logo.png" alt="Scepto Import PLC" className="h-10 w-auto" />
          <p className="text-sm font-light text-mist leading-relaxed max-w-sm mt-5">{BLURB}</p>
          <div className="flex items-center gap-2.5 mt-6">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex items-center justify-center rounded-full transition-colors duration-200 border border-line text-mist hover:bg-volt hover:border-volt hover:text-bg"
                style={{ width: 38, height: 38 }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-mist">Explore</p>
          <ul className="mt-5 space-y-3">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm font-light text-mist transition-colors hover:text-volt"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow text-mist">Get in touch</p>
          <ul className="mt-5 space-y-3 text-sm font-light text-mist">
            <li>{CONTACT.office}</li>
            <li>
              <a href={CONTACT.phoneHref} className="transition-colors hover:text-volt">
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={CONTACT.emailHref} className="transition-colors hover:text-volt">
                {CONTACT.email}
              </a>
            </li>
            <li className="text-mist/70">Showroom — {CONTACT.showroom}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell py-6 flex items-center justify-center gap-3 text-xs text-mist/70 font-light">
          <span>© {year} Scepto Import PLC. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
