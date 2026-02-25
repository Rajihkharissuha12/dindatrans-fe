export interface CarAvailability {
  id: string;
  status: "on" | "off";
}

// URL sudah benar, pakai format gviz CSV
const SHEET_URL = `https://docs.google.com/spreadsheets/d/1XP4uqs4WYKJrZGVpwzPkHu94xHnx952YX75rcO_XdH4/gviz/tq?tqx=out:csv&sheet=status`;

// Helper parse CSV → Record
function parseCSV(text: string): Record<string, "on" | "off"> {
  const rows = text
    .trim()
    .split("\n")
    .slice(1) // skip header
    .map((row) => row.replace(/"/g, "").split(","));

  const map: Record<string, "on" | "off"> = {};
  for (const [id, status] of rows) {
    if (id && status) {
      map[id.trim()] = status.trim().toLowerCase() === "on" ? "on" : "off";
    }
  }
  return map;
}

// ── Server-side (initial load, dipanggil di Server Component) ──
export async function getCarAvailability(): Promise<
  Record<string, "on" | "off">
> {
  try {
    const res = await fetch(SHEET_URL, { cache: "no-store" }); // no-store agar selalu fresh
    const text = await res.text();
    return parseCSV(text);
  } catch {
    return {};
  }
}

// ── Client-side (dipanggil oleh polling hook) ──
export async function fetchCarAvailability(): Promise<
  Record<string, "on" | "off">
> {
  try {
    // Tambah timestamp agar browser tidak cache
    const res = await fetch(`${SHEET_URL}&_t=${Date.now()}`, {
      cache: "no-store",
    });
    const text = await res.text();
    return parseCSV(text);
  } catch {
    return {};
  }
}
