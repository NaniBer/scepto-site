import { useRef, useEffect } from "react";

export default function Magnetic({ children, strength = 6 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const limit = (val) => Math.max(-strength, Math.min(strength, val * 0.3));
      el.style.transform = `translate(${limit(x)}px, ${limit(y)}px)`;
    };
    const onLeave = () => {
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      style={{
        display: "inline-flex",
        transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </span>
  );
}