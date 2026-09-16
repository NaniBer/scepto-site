import contentData from "../../public/content.json";

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Contact", to: "/contact" },
];

export const TAGLINE = "Sole JA Solar agent · Authorized KSTAR dealer";

export const SOCIALS = [
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@scepto_import",
    path: "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.77.12V9.79a5.68 5.68 0 0 0-.77-.05A5.68 5.68 0 1 0 15.54 15.4V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.24-1.48z",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/scepto_import",
    path: "M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z",
  },
  {
    name: "X",
    href: "https://x.com/scepto_import",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/251988888855",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  },
];

export const CATEGORIES = [
  { name: "Solar PV Modules", img: "/images/products/solar-panel.jpg" },
  { name: "Hybrid Inverters", img: "/images/products/kstar-hybrid-inverter.png" },
  { name: "Energy Storage", img: "/images/products/lithium-battery.jpg" },
  { name: "UPS Systems", img: "/images/products/kstar-6kva-tower.png" },
  { name: "Generators", img: "/images/products/generator-kp-bd20p.jpg" },
  { name: "Pumps", img: "/images/products/pump.png" },
  { name: "Precision Cooling", img: "/images/products/kstar-cooling.png" },
  { name: "Water Treatment", img: "/images/products/ro-drinking.jpeg" },
];

export const UPS_RANGE = [
  { model: "UID Industrial", capacity: "10–120 kVA", phase: "3:3 · PF 0.9", type: "Online transformer" },
  { model: "UID", capacity: "10–800 kVA", phase: "3:3 · PF 0.9", type: "Online transformer" },
  { model: "HPM", capacity: "40–1000 kVA", phase: "1:1 / 3:1 / 3:3", type: "Modular" },
  { model: "EG / UA / Micro", capacity: "600 VA–3 kVA", phase: "1:1 · PF 0.6", type: "Line-interactive" },
];

export const BATTERY_RANGE = [
  { series: "GFM", capacity: "100–3000 Ah", application: "Telecom & electric power" },
  { series: "Solar deep cycle", capacity: "38–2000 Ah", application: "Solar energy storage" },
  { series: "High rate", capacity: "230–2900 Ah", application: "UPS backup" },
  { series: "Gel AGM", capacity: "38–2000 Ah", application: "Emergency lighting, alarms" },
];

export const ACCESSORIES = [
  { name: "DC Breaker", img: "/images/accessories/breaker.jpeg" },
  { name: "Changeover Switch", img: "/images/accessories/changeover-switch.jpeg" },
  { name: "Earthing Rod", img: "/images/accessories/earthing.webp" },
  { name: "Water Probe", img: "/images/accessories/water-probe-sensor.jpeg" },
  { name: "PV Surge Protector", img: "/images/accessories/surge-protection.jpg" },
];

export const DEFAULTS = contentData;