"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import {
  User,
  Phone,
  Instagram,
  Facebook,
  Upload,
  Car,
  Banknote,
  UserCheck,
  Loader2,
  CheckCircle2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { formatPrice } from "@/lib/utils";
import { Car as CarType, whatsappNumber } from "@/lib/data";
import { fetchAvailability } from "@/lib/data-booking";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// ── Supabase client ──────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// ── Types ────────────────────────────────────────────────────────────────────
type JaminanType = "motor" | "deposit" | "";
type SopirType = "tidak" | "dalam-kota" | "luar-kota";

interface FormData {
  nama: string;
  nohp: string;
  instagram: string;
  facebook: string;
  rental_start: string; // 👈 baru
  pickup_time: string;
  rental_days: number;
  jaminan: JaminanType;
  sopir: SopirType;
}

interface UploadState {
  file: File | null;
  preview: string | null;
  uploading: boolean;
  url: string | null;
  error: string | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  car: CarType;
  priceMode: "lepas-kunci" | "dengan-driver";
}

// ── Validators ───────────────────────────────────────────────────────────────
const isValidInstagram = (val: string) =>
  val === "" ||
  /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?$/.test(val);

const isValidFacebook = (val: string) =>
  val === "" ||
  /^https?:\/\/(www\.)?(facebook|fb)\.com\/[A-Za-z0-9_./-]+\/?$/.test(val);

// ── Upload helper ─────────────────────────────────────────────────────────────
async function uploadToSupabase(
  file: File,
  folder: "ktp" | "selfie" | "motor" | "stnk",
): Promise<string> {
  const ext = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}_${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("rental-docs")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("rental-docs").getPublicUrl(fileName);

  return data.publicUrl;
}

// ── FileUploadBox ─────────────────────────────────────────────────────────────
function FileUploadBox({
  label,
  state,
  onChange,
  accept = "image/*",
}: {
  label: string;
  state: UploadState;
  onChange: (file: File) => void;
  accept?: string;
}) {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) onChange(file);
    },
    [onChange],
  );

  return (
    <div className="space-y-1.5">
      <Label className="text-slate-300 text-xs sm:text-sm">{label}</Label>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`relative border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors
          ${state.url ? "border-green-500/50 bg-green-500/5" : "border-slate-700 hover:border-blue-500/50 bg-slate-800/50"}`}
        onClick={() => document.getElementById(`file-${label}`)?.click()}
      >
        <input
          id={`file-${label}`}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChange(file);
          }}
        />

        {state.uploading ? (
          <div className="flex flex-col items-center gap-1.5 py-2">
            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
            <span className="text-[11px] text-slate-400">Mengupload...</span>
          </div>
        ) : state.url ? (
          <div className="flex flex-col items-center gap-1.5 py-1">
            {state.preview && (
              <img
                src={state.preview}
                alt="preview"
                className="h-16 w-auto rounded object-cover mx-auto"
              />
            )}
            <div className="flex items-center gap-1 text-green-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="text-[11px]">Berhasil diupload</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 py-2">
            <Upload className="w-5 h-5 text-slate-500" />
            <span className="text-[11px] text-slate-400">
              Klik atau drag foto di sini
            </span>
            {state.file && (
              <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                {state.file.name}
              </span>
            )}
          </div>
        )}

        {state.error && (
          <p className="text-[10px] text-red-400 mt-1">{state.error}</p>
        )}
      </div>
    </div>
  );
}

// ── Main Modal ────────────────────────────────────────────────────────────────
export default function RentalFormModal({
  open,
  onClose,
  car,
  priceMode,
}: Props) {
  const [form, setForm] = useState<FormData>({
    nama: "",
    nohp: "",
    instagram: "",
    facebook: "",
    rental_start: "", // 👈 baru
    pickup_time: "",
    rental_days: 1,
    jaminan: "",
    sopir: "tidak",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [ktpState, setKtpState] = useState<UploadState>({
    file: null,
    preview: null,
    uploading: false,
    url: null,
    error: null,
  });
  const [selfieState, setSelfieState] = useState<UploadState>({
    file: null,
    preview: null,
    uploading: false,
    url: null,
    error: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [motorState, setMotorState] = useState<UploadState>({
    file: null,
    preview: null,
    uploading: false,
    url: null,
    error: null,
  });
  const [stnkState, setStnkState] = useState<UploadState>({
    file: null,
    preview: null,
    uploading: false,
    url: null,
    error: null,
  });
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [unavailableDatesMap, setUnavailableDatesMap] = useState<Record<string, number[]>>({});

  useEffect(() => {
    if (open && car?.id) {
      const monthKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
      if (!unavailableDatesMap[monthKey]) {
        fetchAvailability(car.id, currentMonth).then((days) => {
          setUnavailableDatesMap((prev) => ({ ...prev, [monthKey]: days }));
        });
      }
    }
  }, [open, car?.id, currentMonth]);

  useEffect(() => {
    if (!open) {
      setUnavailableDatesMap({});
      setCurrentMonth(new Date());
    }
  }, [open]);

  const isDateUnavailable = (date: Date) => {
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    const days = unavailableDatesMap[monthKey] || [];
    return days.includes(date.getDate());
  };

const isRangeAvailable = (start: Date, days: number) => {
  if (isNaN(start.getTime())) return true;
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    if (isDateUnavailable(d)) return false;
  }
  return true;
};

  // ── Harga Sopir ─────────────────────────────────────────────────────────────
  const sopirAddon =
    form.sopir === "dalam-kota"
      ? 200000
      : form.sopir === "luar-kota"
        ? 250000
        : 0;
  const basePrice =
    priceMode === "lepas-kunci" ? car.pricePerDay : car.priceWithDriver;
  const totalPerDay = basePrice + sopirAddon;
  const totalPrice = totalPerDay * form.rental_days; // 👈 x jumlah hari

  // ── Handle File Upload ───────────────────────────────────────────────────────
  const handleFileChange = async (
    file: File,
    type: "ktp" | "selfie" | "motor" | "stnk",
  ) => {
    const preview = URL.createObjectURL(file);
    const setter =
      type === "ktp"
        ? setKtpState
        : type === "selfie"
          ? setSelfieState
          : type === "motor"
            ? setMotorState
            : setStnkState;

    setter({ file, preview, uploading: true, url: null, error: null });

    try {
      const url = await uploadToSupabase(file, type);
      setter({ file, preview, uploading: false, url, error: null });
    } catch (err: any) {
      setter({
        file,
        preview: null,
        uploading: false,
        url: null,
        error: err.message,
      });
    }
  };

  // ── Validation ───────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!form.nama.trim()) newErrors.nama = "Nama wajib diisi";
    if (!form.nohp.trim()) newErrors.nohp = "No. HP wajib diisi";
    else if (!/^(\+62|62|0)[0-9]{8,13}$/.test(form.nohp.replace(/\s/g, "")))
      newErrors.nohp = "Format No. HP tidak valid";

    // Minimal satu sosmed harus diisi
    if (!form.instagram && !form.facebook) {
      newErrors.instagram = "Isi minimal salah satu akun sosmed";
      newErrors.facebook = "Isi minimal salah satu akun sosmed";
    } else {
      if (form.instagram && !isValidInstagram(form.instagram))
        newErrors.instagram =
          "Link Instagram tidak valid (contoh: https://instagram.com/username)";
      if (form.facebook && !isValidFacebook(form.facebook))
        newErrors.facebook =
          "Link Facebook tidak valid (contoh: https://facebook.com/username)";
    }

    if (!form.jaminan) newErrors.jaminan = "Pilih salah satu opsi jaminan";
    if (!ktpState.url)
      setKtpState((s) => ({ ...s, error: "Foto KTP wajib diupload" }));
    if (!selfieState.url)
      setSelfieState((s) => ({ ...s, error: "Foto selfie wajib diupload" }));
    if (form.jaminan === "motor") {
      if (!motorState.url)
        setMotorState((s) => ({
          ...s,
          error: "Foto kendaraan wajib diupload",
        }));
      if (!stnkState.url)
        setStnkState((s) => ({ ...s, error: "Foto STNK wajib diupload" }));
    }
    if (!form.rental_start) {
      newErrors.rental_start = "Tanggal mulai wajib diisi";
    } else if (
      new Date(form.rental_start) < new Date(new Date().setHours(0, 0, 0, 0))
    ) {
      newErrors.rental_start = "Tanggal mulai tidak boleh masa lalu";
    } else if (!isRangeAvailable(new Date(form.rental_start), form.rental_days || 1)) {
      newErrors.rental_start = "Ada tanggal dalam range tersebut yang ter-booking";
    }

    if (!form.pickup_time) {
      newErrors.pickup_time = "Jam pengambilan wajib diisi";
    }

    if (form.rental_days < 1 || form.rental_days > 30) {
      newErrors.rental_days = "Minimal 1 hari, maksimal 30 hari";
    }

    setErrors(newErrors);
    return (
      Object.keys(newErrors).length === 0 &&
      !!ktpState.url &&
      !!selfieState.url &&
      (form.jaminan !== "motor" || (!!motorState.url && !!stnkState.url)) // 👈 tambah ini
    );
  };

  // Tambah di atas fungsi handleFileChange
  const appendToOrdersSheet = async (): Promise<string> => {
    const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID!;

    // Ambil ID terakhir dari sheet orders untuk auto-increment
    let nextId = "ORD-001";
    try {
      const ORDERS_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=orders&_t=${Date.now()}`;
      const res = await fetch(ORDERS_CSV_URL, { cache: "no-store" });
      const text = await res.text();
      const rows = text
        .trim()
        .split("\n")
        .slice(1) // skip header
        .filter((row) => row.trim() !== "");

      if (rows.length > 0) {
        const lastRow = rows[rows.length - 1].replace(/"/g, "").split(",");
        const lastId = lastRow[0]; // kolom pertama = id (ORD-001, ORD-002, dst)
        const lastNum = parseInt(lastId.replace("ORD-", "")) || 0;
        nextId = `ORD-${String(lastNum + 1).padStart(3, "0")}`;
      }
    } catch {
      nextId = `ORD-${Date.now()}`; // fallback jika gagal baca
    }

    // Hitung tanggal selesai
    const startDate = new Date(form.rental_start);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + form.rental_days);

    const rowData = [
      nextId,
      new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      form.nama,
      form.nohp,
      form.instagram || "-",
      form.facebook || "-",
      car.id,
      car.name,
      car.year,
      form.sopir === "tidak" ? "Lepas Kunci" : "Dengan Driver",
      startDate.toLocaleDateString("id-ID"),
      endDate.toLocaleDateString("id-ID"),
      form.rental_days,
      `${form.pickup_time} WIB`,
      form.jaminan === "motor"
        ? "Motor + STNK (Th.2018+)"
        : "Deposit Rp5.000.000",
      form.sopir === "tidak"
        ? "Tanpa Sopir"
        : form.sopir === "dalam-kota"
          ? "Sopir Dalam Kota (+Rp200.000)"
          : "Sopir Luar Kota (+Rp250.000)",
      formatPrice(basePrice),
      formatPrice(sopirAddon > 0 ? sopirAddon * form.rental_days : 0),
      formatPrice(totalPrice),
      ktpState.url || "-",
      selfieState.url || "-",
      motorState.url || "-",
      stnkState.url || "-",
      "new", // status order
    ];

    // Kirim ke Google Apps Script Web App
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rowData }),
    });

    return nextId;
  };

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    try {
      // ── Step 1: Simpan ke spreadsheet & dapatkan Order ID ──
      let orderId = "ORD-???";
      try {
        orderId = await appendToOrdersSheet();
      } catch (err) {
        console.error("Gagal simpan ke spreadsheet:", err);
        // Tetap lanjut kirim WA meski spreadsheet gagal
      }

      // ── Step 2: Hitung tanggal selesai ──
      const startDate = new Date(form.rental_start);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + form.rental_days);

      const priceLabel =
        form.sopir === "tidak" ? "Lepas Kunci" : "Dengan Driver";
      const jaminanLabel =
        form.jaminan === "motor"
          ? "Motor Tahun 2018+ & STNK"
          : "Uang Deposit Rp 5.000.000";
      const sopirLabel =
        form.sopir === "tidak"
          ? "Tanpa Sopir"
          : form.sopir === "dalam-kota"
            ? "Sopir Dalam Kota (+Rp 200.000/hari)"
            : "Sopir Luar Kota (+Rp 250.000/hari)";

      // ── Step 3: Format pesan WhatsApp ──
      const msg = [
        `*PERMINTAAN RENTAL - DINDA TRANS*`,
        `*Order ID: ${orderId}*`,
        ``,
        `━━━━━━━━━━━━━━━━━━`,
        `*Data Penyewa*`,
        `━━━━━━━━━━━━━━━━━━`,
        `Nama     : ${form.nama}`,
        `No. HP   : ${form.nohp}`,
        form.instagram ? `Instagram: ${form.instagram}` : null,
        form.facebook ? `Facebook : ${form.facebook}` : null,
        ``,
        `━━━━━━━━━━━━━━━━━━`,
        `*Jadwal Rental*`,
        `━━━━━━━━━━━━━━━━━━`,
        `Mulai    : ${startDate.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`,
        `Selesai  : ${endDate.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`,
        `Durasi   : ${form.rental_days} hari`,
        `Jam Ambil: ${form.pickup_time} WIB`, // 👈 tambah ini
        ``,
        `━━━━━━━━━━━━━━━━━━`,
        `*Detail Kendaraan*`,
        `━━━━━━━━━━━━━━━━━━`,
        `Mobil    : ${car.name} (${car.year})`,
        `Tipe     : ${car.type}`,
        `Mode     : ${priceLabel}`,
        `Sopir    : ${sopirLabel}`,
        ``,
        `━━━━━━━━━━━━━━━━━━`,
        `*Rincian Harga*`,
        `━━━━━━━━━━━━━━━━━━`,
        `Harga/hari  : ${formatPrice(basePrice)}`,
        sopirAddon > 0 ? `Sopir/hari  : ${formatPrice(sopirAddon)}` : null,
        `Total/hari  : ${formatPrice(totalPerDay)}`,
        `Durasi      : ${form.rental_days} hari`,
        `*Total       : ${formatPrice(totalPrice)}*`,
        ``,
        `━━━━━━━━━━━━━━━━━━`,
        `*Jaminan*`,
        `━━━━━━━━━━━━━━━━━━`,
        `${jaminanLabel}`,
        ``,
        `━━━━━━━━━━━━━━━━━━`,
        `*Dokumen*`,
        `━━━━━━━━━━━━━━━━━━`,
        `KTP     : ${ktpState.url}`,
        `Selfie  : ${selfieState.url}`,
        form.jaminan === "motor" && motorState.url
          ? `🏍️ Motor  : ${motorState.url}`
          : null,
        form.jaminan === "motor" && stnkState.url
          ? `📄 STNK   : ${stnkState.url}`
          : null,
        ``,
        `Mohon konfirmasi ketersediaan. Terima kasih! 🙏`,
      ]
        .filter((line) => line !== null)
        .join("\n");

      // ── Step 4: Buka WhatsApp ──
      // const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
      // window.open(waUrl, "_blank");
      const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(msg)}`;
      window.location.href = waUrl;
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setSubmitting(false);
      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setForm({
      nama: "",
      nohp: "",
      instagram: "",
      facebook: "",
      rental_start: "", // 👈 baru
      pickup_time: "", // 👈 baru
      rental_days: 1,
      jaminan: "",
      sopir: "tidak",
    });
    setErrors({});
    setKtpState({
      file: null,
      preview: null,
      uploading: false,
      url: null,
      error: null,
    });
    setSelfieState({
      file: null,
      preview: null,
      uploading: false,
      url: null,
      error: null,
    });
    setMotorState({
      file: null,
      preview: null,
      uploading: false,
      url: null,
      error: null,
    }); // 👈
    setStnkState({
      file: null,
      preview: null,
      uploading: false,
      url: null,
      error: null,
    }); // 👈
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          onClose();
          resetForm();
        }
      }}
    >
      <DialogContent className="max-w-lg w-full bg-slate-900 border-slate-800 text-white max-h-[92vh] overflow-y-auto p-0">
        {/* Header sticky */}
        <div className="sticky top-0 z-10 bg-slate-900 border-b border-slate-800 px-5 pt-5 pb-4">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Car className="w-4 h-4 text-blue-400" />
                Form Rental {car.name}
              </DialogTitle>

              {/* 👇 Tombol X */}
              <button
                onClick={() => {
                  onClose();
                  resetForm();
                }}
                className="rounded-md p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </DialogHeader>
          {/* Summary harga */}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-[11px]">
              {form.rental_days} hari •{" "}
              {new Date(form.rental_start).toLocaleDateString("id-ID")}
            </Badge>
            <span className="text-base font-bold text-white">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>

        <div className="px-5 py-4 space-y-5">
          {/* ── Data Diri ── */}
          <section className="space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Data Diri
            </p>

            {/* Nama */}
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs sm:text-sm flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" /> Nama Lengkap *
              </Label>
              <Input
                value={form.nama}
                onChange={(e) => {
                  setForm((f) => ({ ...f, nama: e.target.value }));
                  if (errors.nama)
                    setErrors((er) => ({ ...er, nama: undefined }));
                }}
                placeholder="Masukkan nama lengkap"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-sm h-9"
              />
              {errors.nama && (
                <p className="text-[11px] text-red-400">{errors.nama}</p>
              )}
            </div>

            {/* No HP */}
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs sm:text-sm flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-400" /> No. HP /
                WhatsApp *
              </Label>
              <Input
                value={form.nohp}
                onChange={(e) => {
                  setForm((f) => ({ ...f, nohp: e.target.value }));
                  if (errors.nohp)
                    setErrors((er) => ({ ...er, nohp: undefined }));
                }}
                placeholder="0812xxxx / +6281xxx"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-sm h-9"
              />
              {errors.nohp && (
                <p className="text-[11px] text-red-400">{errors.nohp}</p>
              )}
            </div>
          </section>

          <Separator className="bg-slate-800" />

          {/* ── Sosial Media ── */}
          <section className="space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Sosial Media{" "}
              <span className="normal-case text-slate-500">
                (isi minimal satu)
              </span>
            </p>

            {/* Instagram */}
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs sm:text-sm flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-pink-400" /> Instagram
              </Label>
              <Input
                value={
                  form.instagram.replace(
                    /^https?:\/\/(www\.)?instagram\.com\//i,
                    "",
                  ) || ""
                }
                onChange={(e) => {
                  const username = e.target.value.trim();
                  // ✅ Simpan sebagai URL lengkap, tampilkan hanya username
                  const fullUrl = username
                    ? `https://instagram.com/${username.replace(/^\//, "")}`
                    : "";

                  setForm((f) => ({
                    ...f,
                    instagram: fullUrl,
                  }));

                  if (errors.instagram)
                    setErrors((er) => ({
                      ...er,
                      instagram: undefined,
                      facebook: undefined,
                    }));
                }}
                placeholder="contoh: rizky_rentalcar"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-sm h-9"
              />
              {errors.instagram && (
                <p className="text-[11px] text-red-400">{errors.instagram}</p>
              )}
            </div>

            {/* Facebook */}
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs sm:text-sm flex items-center gap-1.5">
                <Facebook className="w-3.5 h-3.5 text-blue-400" /> Facebook
              </Label>
              <Input
                value={
                  form.facebook.replace(
                    /^https?:\/\/(www\.)?facebook\.com\//i,
                    "",
                  ) || ""
                }
                onChange={(e) => {
                  const username = e.target.value.trim();
                  // ✅ Simpan sebagai URL lengkap, tampilkan hanya username
                  const fullUrl = username
                    ? `https://facebook.com/${username.replace(/^\//, "")}`
                    : "";

                  setForm((f) => ({
                    ...f,
                    facebook: fullUrl,
                  }));

                  if (errors.facebook)
                    setErrors((er) => ({
                      ...er,
                      facebook: undefined,
                      instagram: undefined,
                    }));
                }}
                placeholder="contoh: rizky.rentalcar"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-sm h-9"
              />
              {errors.facebook && (
                <p className="text-[11px] text-red-400">{errors.facebook}</p>
              )}
            </div>
          </section>

          {/* ── Jadwal Rental ── */}
          <section className="space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Jadwal Rental
            </p>

            {/* ✅ Grid: 1 kolom di mobile kecil, 2 kolom di tablet+ */}
            <div className="grid grid-cols-1 gap-3 items-start">
              {/* Tanggal Mulai */}
              <div className="space-y-1.5 flex flex-col w-full">
                <Label className="text-slate-300 text-xs sm:text-sm flex items-center gap-1.5">
                  📅 Tanggal Mulai *
                </Label>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-2 flex justify-center w-full overflow-x-auto">
                  <style>{`
                    .rdp-root {
                      --rdp-accent-color: #3b82f6; 
                      --rdp-background-color: transparent;
                      --rdp-selected-color: #ffffff;
                      --rdp-text-color: #f8fafc;
                    }
                    .rdp-root button:hover:not([disabled]) {
                      background-color: #334155;
                    }
                    .rdp-day_selected, .rdp-day_selected:hover {
                      background-color: var(--rdp-accent-color) !important;
                      color: white !important;
                    }
                    .rdp-day_disabled {
                      opacity: 0.3 !important;
                    }
                    .rdp-nav_button:hover {
                      background-color: #334155 !important;
                    }
                  `}</style>
                  <DayPicker
                    mode="single"
                    required
                    selected={form.rental_start ? new Date(form.rental_start) : undefined}
                    onMonthChange={setCurrentMonth}
                    fromMonth={new Date(2026, 3)} // April (bulan mulai dari 0)
                    toMonth={new Date(2026, 5)}   // Juni
                    onSelect={(date) => {
                      if (!date) return;
                      // format date nicely using local timezone
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, "0");
                      const day = String(date.getDate()).padStart(2, "0");
                      
                      setForm((f) => ({
                        ...f,
                        rental_start: `${year}-${month}-${day}`,
                      }));
                      if (errors.rental_start) setErrors((er) => ({ ...er, rental_start: undefined }));
                    }}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today || isDateUnavailable(date);
                    }}
                    className="m-0 text-sm"
                  />
                </div>
                {errors.rental_start && (
                  <p className="text-[11px] text-red-400">
                    {errors.rental_start}
                  </p>
                )}
              </div>

              {/* Jumlah Hari */}
              <div className="space-y-1.5">
                <Label className="text-slate-300 text-xs sm:text-sm flex items-center gap-1.5">
                  📊 Jumlah Hari *
                </Label>
                <Input
                  type="number"
                  value={form.rental_days}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm((f) => ({
                      ...f,
                      rental_days: val === "" ? ("" as any) : +val,
                    }));
                    if (errors.rental_days)
                      setErrors((er) => ({ ...er, rental_days: undefined }));
                  }}
                  onBlur={(e) => {
                    const val = +e.target.value;
                    setForm((f) => ({
                      ...f,
                      rental_days:
                        isNaN(val) || val < 1 ? 1 : val > 30 ? 30 : val,
                    }));
                  }}
                  min={1}
                  max={30}
                  className="bg-slate-800 border-slate-700 text-white text-sm h-10 px-3
          focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent
          [-webkit-appearance:none] appearance-none [-moz-appearance:textfield]
          [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0
          leading-normal box-border w-full"
                />
                {errors.rental_days && (
                  <p className="text-[11px] text-red-400">
                    {errors.rental_days}
                  </p>
                )}
              </div>
            </div>

            {/* Jam Pengambilan — full width */}
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs sm:text-sm flex items-center gap-1.5">
                🕐 Jam Pengambilan ke Garasi *
              </Label>
              <Input
                type="time"
                value={form.pickup_time}
                onChange={(e) => {
                  setForm((f) => ({ ...f, pickup_time: e.target.value }));
                  if (errors.pickup_time)
                    setErrors((er) => ({ ...er, pickup_time: undefined }));
                }}
                className="bg-slate-800 border-slate-700 text-white text-sm h-10 px-3 w-full
        focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent
        [color-scheme:dark] [-webkit-appearance:none] appearance-none
        leading-normal box-border"
              />
              <p className="text-[10px] text-slate-500">
                ⚠️ Mohon konfirmasi ke admin sebelum datang ke garasi
              </p>
              {errors.pickup_time && (
                <p className="text-[11px] text-red-400">{errors.pickup_time}</p>
              )}
            </div>
          </section>

          <Separator className="bg-slate-800" />

          {/* ── Upload Dokumen ── */}
          <section className="space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Dokumen Identitas *
            </p>
            <div className="grid grid-cols-2 gap-3">
              <FileUploadBox
                label="📋 Foto KTP"
                state={ktpState}
                onChange={(file) => handleFileChange(file, "ktp")}
              />
              <FileUploadBox
                label="🤳 Foto Selfie"
                state={selfieState}
                onChange={(file) => handleFileChange(file, "selfie")}
              />
            </div>
          </section>

          <Separator className="bg-slate-800" />

          {/* ── Jaminan ── */}
          <section className="space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Pilih Jaminan *
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Motor + STNK */}
              <button
                type="button"
                onClick={() => {
                  setForm((f) => ({ ...f, jaminan: "motor" }));
                  if (errors.jaminan)
                    setErrors((er) => ({ ...er, jaminan: undefined }));
                }}
                className={`flex items-start gap-2.5 rounded-lg border p-3 text-left transition-all
                  ${
                    form.jaminan === "motor"
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                  }`}
              >
                <Car
                  className={`w-4 h-4 mt-0.5 shrink-0 ${form.jaminan === "motor" ? "text-blue-400" : "text-slate-500"}`}
                />
                <div>
                  <p
                    className={`text-xs font-semibold leading-tight ${form.jaminan === "motor" ? "text-white" : "text-slate-300"}`}
                  >
                    Motor + STNK
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Tahun 2018 ke atas
                  </p>
                </div>
              </button>

              {/* Deposit */}
              <button
                type="button"
                onClick={() => {
                  setForm((f) => ({ ...f, jaminan: "deposit" }));
                  if (errors.jaminan)
                    setErrors((er) => ({ ...er, jaminan: undefined }));
                }}
                className={`flex items-start gap-2.5 rounded-lg border p-3 text-left transition-all
                  ${
                    form.jaminan === "deposit"
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                  }`}
              >
                <Banknote
                  className={`w-4 h-4 mt-0.5 shrink-0 ${form.jaminan === "deposit" ? "text-blue-400" : "text-slate-500"}`}
                />
                <div>
                  <p
                    className={`text-xs font-semibold leading-tight ${form.jaminan === "deposit" ? "text-white" : "text-slate-300"}`}
                  >
                    Uang Deposit
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Rp 5.000.000
                  </p>
                </div>
              </button>
            </div>
            {/* 👇 Tambahkan blok ini */}
            {form.jaminan === "motor" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 p-3 rounded-lg border border-blue-500/30 bg-blue-500/5 space-y-3">
                  <p className="text-[11px] text-blue-300 flex items-center gap-1.5">
                    <span>ℹ️</span>
                    Upload foto kendaraan dan STNK sebagai jaminan
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <FileUploadBox
                      label="🏍️ Foto Kendaraan"
                      state={motorState}
                      onChange={(file) => handleFileChange(file, "motor")}
                    />
                    <FileUploadBox
                      label="📄 Foto STNK"
                      state={stnkState}
                      onChange={(file) => handleFileChange(file, "stnk")}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {errors.jaminan && (
              <p className="text-[11px] text-red-400">{errors.jaminan}</p>
            )}
          </section>

          <Separator className="bg-slate-800" />

          {/* ── Opsi Sopir ── */}
          <section className="space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Opsi Sopir
            </p>
            <div className="space-y-2">
              {[
                {
                  val: "tidak",
                  label: "Tanpa Sopir",
                  sub: "Kamu yang mengemudi",
                  icon: "🔑",
                },
                {
                  val: "dalam-kota",
                  label: "Dengan Sopir",
                  sub: "Dalam kota  +Rp 200.000/hari",
                  icon: "🏙️",
                },
                {
                  val: "luar-kota",
                  label: "Dengan Sopir",
                  sub: "Luar kota  +Rp 250.000/hari",
                  icon: "🛣️",
                },
              ].map(({ val, label, sub, icon }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() =>
                    setForm((f) => ({ ...f, sopir: val as SopirType }))
                  }
                  className={`w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-all
                    ${
                      form.sopir === val
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                    }`}
                >
                  <span className="text-lg">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-semibold ${form.sopir === val ? "text-white" : "text-slate-300"}`}
                    >
                      {label}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{sub}</p>
                  </div>
                  {form.sopir === val && (
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* ── Submit ── */}
          <div className="pt-1 pb-2 space-y-2">
            <div className="bg-slate-800/60 rounded-lg px-4 py-3 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Estimasi Total/Hari
              </span>
              <span className="text-base font-bold text-white">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <Button
              className={`w-full h-10 text-sm font-semibold transition-all duration-200
    hover:bg-green-600 hover:shadow-[0_0_0_2px_rgba(255,255,255,0.15)] 
    hover:border-white/30 active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={handleSubmit}
              disabled={
                !!(
                  submitting ||
                  ktpState.uploading ||
                  selfieState.uploading ||
                  ktpState.error ||
                  selfieState.error ||
                  (form.jaminan === "motor" &&
                    (motorState.error || stnkState.error))
                )
              }
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4 mr-2" />
                  Kirim via WhatsApp
                </>
              )}
            </Button>

            <p className="text-[10px] text-slate-500 text-center">
              Data akan dikirim ke admin Dinda Trans melalui WhatsApp
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
