export function intToHexColor(value: number, min: number, max: number): string {
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const hue = (1 - normalized) * 240;
  const rgb = hslToRgb(hue, 100, 50);
  return `#${rgb.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4)),
  ];
}

export function parseHash(hash: string) {
  const [zoom, lng, lat] = hash.slice(1).split("/");
  return { zoom: +zoom, lat: +lat, lng: +lng };
}

export function parseWindowLocationHash() {
  return parseHash(window.location.hash);
}
