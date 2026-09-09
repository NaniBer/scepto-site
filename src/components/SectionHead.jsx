export default function SectionHead({
  eyebrow,
  title,
  sub,
  tone = "dark",
  align = "left",
  size = "md",
  className = "",
}) {
  const ink = tone === "dark" ? "text-ink" : "text-inklight";
  const mist = tone === "dark" ? "text-mist" : "text-mistlight";
  const titleSize =
    size === "lg"
      ? "text-[clamp(2.2rem,4.5vw,3.2rem)]"
      : "text-[clamp(1.75rem,3.4vw,2.6rem)]";
  return (
    <div
      className={`${align === "center" ? "text-center" : ""} ${className}`}
    >
      {eyebrow && <p className={`eyebrow ${mist}`}>{eyebrow}</p>}
      <h2
        className={`font-display font-bold ${ink} ${titleSize} mt-3 text-balance ${
          align === "center" ? "mx-auto max-w-2xl" : ""
        }`}
        style={{ letterSpacing: "-0.01em" }}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`text-lg font-light ${mist} mt-4 max-w-2xl leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
