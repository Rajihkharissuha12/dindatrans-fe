import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export function extractStoragePath(url: string) {
  const marker = "/storage/v1/object/public/";
  if (!url.includes(marker)) return null;

  const fullPath = url.split(marker)[1];
  // Hapus bucket name "rental-docs/" di awal
  return fullPath.replace(/^rental-docs\//, "");
}

export async function POST(req: Request) {
  try {
    // Ambil data dari Google Sheets via doPost web app URL
    // Ganti dengan URL web app doGet kamu yang return JSON seluruh orders
    const SHEET_API_URL = process.env.APPS_SCRIPT_URL!;

    const sheetResponse = await fetch(SHEET_API_URL, {
      method: "GET",
      mode: "no-cors", // Bypass CORS, opaque response OK karena kita cuma baca JSON
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (!sheetResponse.ok) {
      throw new Error("Failed to fetch sheet data");
    }
    const ordersData = await sheetResponse.json();

    // Filter orders dengan status 'end'
    const endOrders = ordersData.filter((order: any) => order.status === "end"); // Kolom 24 = index 23

    if (endOrders.length === 0) {
      return NextResponse.json(
        { message: "No 'end' status orders found" },
        { status: 200 },
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const deletePromises = endOrders.map(async (order: any) => {
      // Extract file paths dari kolom 20-23 (ktp_url, selfie_url, motor_url, stnk_url)
      const fileUrls = [
        order.ktp_url, // ktp_url
        order.selfie_url, // selfie_url
        order.motor_url, // motor_url
        order.stnk_url, // stnk_url
      ].filter(Boolean);

      const filePaths = fileUrls
        .map(extractStoragePath)
        .filter(Boolean) as string[];
      console.log("filePaths:", filePaths);

      if (filePaths.length > 0) {
        // Delete files dari Supabase Storage
        const { error } = await supabase.storage
          .from("rental-docs")
          .remove(filePaths);

        if (error) {
          console.error(`Delete files error for order ${order[0]}:`, error);
          return { orderId: order[0], success: false, error: error.message };
        }
      }

      // ✅ FIX: Buat rowData MANUAL sesuai 24 kolom spreadsheet
      const rowData = [
        order.id, // 1. id
        order.timestamp, // 2. timestamp
        order.nama, // 3. nama
        order.nohp, // 4. nohp
        order.instagram, // 5. instagram
        order.facebook, // 6. facebook
        order.car_id, // 7. car_id
        order.car_name, // 8. car_name
        order.car_year, // 9. car_year
        order.price_mode, // 10. price_mode
        order.rental_start, // 11. rental_start
        order.rental_days, // 12. rental_days
        order.total_hari, // 13. total_hari
        order.jam_ambil, // 14. jam_ambil
        order.jaminan, // 15. jaminan
        order.sopir, // 16. sopir
        order.harga_dasar, // 17. harga_dasar
        order.biaya_sopir, // 18. biaya_sopir
        order.total, // 19. total
        order.ktp_url, // 20. ktp_url
        order.selfie_url, // 21. selfie_url
        order.motor_url, // 22. motor_url
        order.stnk_url, // 23. stnk_url
        "complete", // 24. status ← UPDATE
      ];

      const updatePayload = {
        rowId: order.id,
        rowData: rowData,
      };

      const updateResponse = await fetch(process.env.APPS_SCRIPT_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });

      if (!updateResponse.ok) {
        console.error(
          `Update error order ${order.id}:`,
          await updateResponse.text(),
        );
        return { orderId: order.id, success: false, error: "Update failed" };
      }

      return { orderId: order.id, success: true, deletedFiles: filePaths };
    });

    const results = await Promise.all(deletePromises);
    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    return NextResponse.json({
      success: true,
      processed: endOrders.length,
      successful: successful.length,
      successful_orders: successful,
      failed_orders: failed.length > 0 ? failed : null,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
