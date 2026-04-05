const getMonthSheetName = (date: Date) => {
  return date.toLocaleString("en-US", {
    month: "long",
    timeZone: "Asia/Jakarta",
  });
};

export const fetchAvailability = async (carId: string, month: Date = new Date()) => {
  const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID!;
  const sheetName = getMonthSheetName(month);
  console.log(sheetName)

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
  
  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();

  if (!res.ok || text.includes("<html")) {
    return [];
  }

  const rows = text
    .split("\n")
    .map((r) => r.replace(/"/g, "").split(","));

  const headers = rows[0]; // ["id","1","2","3",...]
  const carRow = rows.find((row) => row[0] === carId);

  if (!carRow) return [];

  // Ambil tanggal yang OFF (tidak tersedia)
  const unavailableDates: number[] = [];

  for (let i = 1; i < headers.length; i++) {
    if (carRow[i] === "off") {
      unavailableDates.push(parseInt(headers[i]));
    }
  }
  console.log(unavailableDates)

  return unavailableDates; // contoh: [2,5,10]
};