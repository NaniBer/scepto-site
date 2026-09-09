import { SOCIALS } from "../data/content.js";

export default function SocialRail() {
  return (
    <div className="hidden lg:flex flex-col gap-3 fixed right-3 top-1/2 -translate-y-1/2 z-40">
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          className="rail-link"
        >
          <span className="rail-label">{s.name}</span>
          <span className="rail-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d={s.path} />
            </svg>
          </span>
        </a>
      ))}
    </div>
  );
}
