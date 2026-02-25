export interface Car {
  id: string;
  name: string;
  type: "MPV" | "SUV" | "City Car" | "Luxury" | "Pickup" | "Van";
  pricePerDay: number;
  priceWithDriver: number; // TAMBAH INI
  transmission: "Matic" | "Manual";
  seats: number;
  fuel: "Bensin" | "Diesel";
  year: number;
  features: string[];
  image: string;
  tag?: "Best Seller" | "Hemat" | "Premium" | "Terbaru";
}

export const cars: Car[] = [
  {
    id: "1",
    name: "Innova Reborn",
    type: "MPV",
    pricePerDay: 600000,
    priceWithDriver: 450000,
    transmission: "Matic",
    seats: 7,
    fuel: "Diesel",
    year: 2025,
    features: [
      "AC Double Blower",
      "Kabin Luas",
      "Nyaman untuk perjalanan jauh",
      "Bagasi Luas",
    ],
    image:
      "https://qbmtbpolskultgnosnzu.supabase.co/storage/v1/object/public/mobil/Mobil1%20(1).webp",
    tag: "Best Seller",
  },
  {
    id: "2",
    name: "Toyota Avanza Type E",
    type: "MPV",
    pricePerDay: 350000,
    priceWithDriver: 500000,
    transmission: "Matic",
    seats: 7,
    fuel: "Bensin",
    year: 2025,
    features: ["AC", "Audio", "7 Penumpang", "Irit BBM"],
    image:
      "https://qbmtbpolskultgnosnzu.supabase.co/storage/v1/object/public/mobil/Mobil2%20(1).webp",
    tag: "Best Seller",
  },
  {
    id: "3",
    name: "Suzuki Carry Pickup",
    type: "Pickup",
    pricePerDay: 300000,
    priceWithDriver: 430000,
    transmission: "Manual",
    seats: 2,
    fuel: "Bensin",
    year: 2020,
    features: ["Bak luas", "Mudah bongkar muat", "Hemat BBM"],
    image:
      "https://qbmtbpolskultgnosnzu.supabase.co/storage/v1/object/public/mobil/Mobil3%20(1).webp",
    tag: "Hemat",
  },
  {
    id: "4",
    name: "Mobilio",
    type: "MPV",
    pricePerDay: 275000,
    priceWithDriver: 600000,
    transmission: "Manual",
    seats: 7,
    fuel: "Bensin",
    year: 2017,
    features: ["AC", "Audio", "7 Penumpang", "Kabin lega"],
    image:
      "https://qbmtbpolskultgnosnzu.supabase.co/storage/v1/object/public/mobil/Mobil4%20(1).webp",
    tag: "Premium",
  },
  {
    id: "5",
    name: "Hiace Premio",
    type: "Van",
    pricePerDay: 1300000,
    priceWithDriver: 700000,
    transmission: "Manual",
    seats: 10,
    fuel: "Diesel",
    year: 2025,
    features: [
      "AC Double Blower",
      "Captain Seat",
      "Kabin luas",
      "Nyaman untuk perjalanan jauh",
      "Cocok untuk wisata & rombongan",
    ],
    image:
      "https://qbmtbpolskultgnosnzu.supabase.co/storage/v1/object/public/mobil/Mobil5%20(1).webp",
    tag: "Terbaru",
  },
  {
    id: "6",
    name: "Expander",
    type: "MPV",
    pricePerDay: 350000,
    priceWithDriver: 550000,
    transmission: "Matic",
    seats: 7,
    fuel: "Bensin",
    year: 2022,
    features: [
      "Ground clearance tinggi",
      "AC",
      "Audio",
      "7 Penumpang",
      "Nyaman untuk keluarga",
    ],
    image:
      "https://qbmtbpolskultgnosnzu.supabase.co/storage/v1/object/public/mobil/Mobil6%20(1).webp",
  },
  {
    id: "7",
    name: "Sigra",
    type: "MPV",
    pricePerDay: 250000,
    priceWithDriver: 530000,
    transmission: "Manual",
    seats: 7,
    fuel: "Bensin",
    year: 2017,
    features: ["AC", "Audio", "7 Penumpang", "Cocok untuk harian"],
    image:
      "https://qbmtbpolskultgnosnzu.supabase.co/storage/v1/object/public/mobil/Mobil7%20(1).webp",
  },
  {
    id: "8",
    name: "Toyota Avanza",
    type: "MPV",
    pricePerDay: 300000,
    priceWithDriver: 380000,
    transmission: "Manual",
    seats: 7,
    fuel: "Bensin",
    year: 2020,
    features: [
      "Hemat BBM",
      "AC",
      "Audio",
      "7 Penumpang",
      "Cocok untuk dalam kota",
    ],
    image:
      "https://qbmtbpolskultgnosnzu.supabase.co/storage/v1/object/public/mobil/Mobil8%20(1).webp",
    tag: "Hemat",
  },
  {
    id: "9",
    name: "Suzuki Carry Pickup",
    type: "Pickup",
    pricePerDay: 300000,
    priceWithDriver: 430000,
    transmission: "Manual",
    seats: 2,
    fuel: "Bensin",
    year: 2020,
    features: ["Bak luas", "Mudah bongkar muat", "Hemat BBM"],
    image:
      "https://qbmtbpolskultgnosnzu.supabase.co/storage/v1/object/public/mobil/Mobil9%20(1).webp",
    tag: "Hemat",
  },
  {
    id: "10",
    name: "Daihatsu Xenia",
    type: "MPV",
    pricePerDay: 275000,
    priceWithDriver: 850000,
    transmission: "Manual",
    seats: 7,
    fuel: "Diesel",
    year: 2018,
    features: [
      "AC",
      "Audio",
      "7 Penumpang",
      "Irit BBM",
      "Cocok untuk keluarga",
    ],
    image:
      "https://qbmtbpolskultgnosnzu.supabase.co/storage/v1/object/public/mobil/Mobil10%20(1).webp",
  },
  {
    id: "11",
    name: "Toyota Calya",
    type: "MPV",
    pricePerDay: 250000,
    priceWithDriver: 900000,
    transmission: "Manual",
    seats: 7,
    fuel: "Bensin",
    year: 2017,
    features: ["AC", "Audio", "7 Penumpang", "Irit BBM", "Cocok untuk harian"],
    image:
      "https://qbmtbpolskultgnosnzu.supabase.co/storage/v1/object/public/mobil/Mobil11%20(1).webp",
  },
  {
    id: "12",
    name: "Toyota Avanza E",
    type: "MPV",
    pricePerDay: 300000,
    priceWithDriver: 900000,
    transmission: "Manual",
    seats: 7,
    fuel: "Bensin",
    year: 2022,
    features: ["AC", "Audio", "7 Penumpang", "Irit BBM", "Cocok untuk harian"],
    image:
      "https://qbmtbpolskultgnosnzu.supabase.co/storage/v1/object/public/mobil/Mobil12%20(1).webp",
  },
  {
    id: "13",
    name: "Toyota Innova Reborn",
    type: "MPV",
    pricePerDay: 500000,
    priceWithDriver: 900000,
    transmission: "Manual",
    seats: 7,
    fuel: "Diesel",
    year: 2018,
    features: [
      "AC Double Blower",
      "Audio",
      "7 Penumpang",
      "Irit BBM",
      "Nyaman untuk perjalanan jauh",
    ],
    image:
      "https://qbmtbpolskultgnosnzu.supabase.co/storage/v1/object/public/mobil/Mobil13%20(1).webp",
  },
  {
    id: "14",
    name: "Daihatsu Xenia",
    type: "MPV",
    pricePerDay: 300000,
    priceWithDriver: 900000,
    transmission: "Manual",
    seats: 7,
    fuel: "Bensin",
    year: 2019,
    features: ["AC", "Audio", "7 Penumpang", "Irit BBM", "Cocok untuk harian"],
    image:
      "https://qbmtbpolskultgnosnzu.supabase.co/storage/v1/object/public/mobil/Mobil14%20(1).webp",
  },
  {
    id: "15",
    name: "Toyota Avanza G",
    type: "MPV",
    pricePerDay: 350000,
    priceWithDriver: 900000,
    transmission: "Manual",
    seats: 7,
    fuel: "Bensin",
    year: 2023,
    features: [
      "AC",
      "Audio",
      "7 Penumpang",
      "Irit BBM",
      "Nyaman untuk keluarga",
    ],
    image:
      "https://qbmtbpolskultgnosnzu.supabase.co/storage/v1/object/public/mobil/Mobil11%20(1).webp",
  },
];

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  link: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Runner Muller",
    location: "Jember",
    rating: 5,
    comment:
      "Best service rentcar se-jember jatim🔥🔥🔥🔥🔥🔥unit allnew semua, cocok buat holidays luar kota dan dalam kota, ataupun buat acara keluarga. …",
    date: "Januari 2026",
    link: "https://maps.app.goo.gl/HyNJVi7PbHiqq5nA7",
  },
  {
    id: "2",
    name: "Winda Jayanti",
    location: "Jember",
    rating: 5,
    comment:
      "sangat memuaskan, buat service dari owner dan drivernya yang sangat rekomended yang mau pake jasa rental ke jogja.  mobil selalu bersih, pengemudi ramah, disiplin on time dan sangat membantu. pengemudinya juga punya kemampuan menjadi tour Quide pengaturan juga fleksibel untuk perubahan paket sewa maupun rencana perjalanan All thumbs up for jogjacars  dan semoga makin sukses. the jogjacars anda teams.",
    date: "Desember 2025",
    link: "https://maps.app.goo.gl/qyrLx2mAbNSSTiNz7",
  },
  {
    id: "3",
    name: "Nony Irma",
    location: "Jember",
    rating: 5,
    comment:
      "cakepp!!! no ita ituu gercep bangett , sewa dadakan oke ajaa selama unit tersediaa gassin yg butuhh buatt acara atauu healing segera booking dinda trans gaess♥️♥️♥️♥️",
    date: "Februari 2026",
    link: "https://maps.app.goo.gl/aWArMF7xVGFf2c3k9",
  },
  {
    id: "4",
    name: "Roro Ayu",
    location: "Jember",
    rating: 5,
    comment:
      "Pelayanan ramah, mobil nyaman, pemilik gercep membantu kebutuhan konsumen. Dijamin memuaskan, rekomend bgt buat wilayah jember dan sekitarnya.",
    date: "Januari 2026",
    link: "https://maps.app.goo.gl/YBTtimN8EsH3iu3T7",
  },
];

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "Bagaimana cara booking rental mobil di Dinda Trans?",
    answer:
      "Anda bisa booking melalui tombol WhatsApp yang tersedia di website, atau langsung hubungi nomor kami. Tim kami akan membantu proses booking Anda dengan cepat dan mudah.",
  },
  {
    id: "2",
    question: "Apakah harga sudah termasuk BBM dan driver?",
    answer:
      "Harga yang tertera adalah untuk sewa mobil lepas kunci (tanpa driver). Jika Anda membutuhkan driver, ada biaya tambahan. BBM ditanggung oleh penyewa. Untuk paket all-in, silakan hubungi kami.",
  },
  {
    id: "3",
    question: "Dokumen apa saja yang diperlukan untuk rental?",
    answer:
      "Untuk rental mobil, Anda perlu menyiapkan KTP asli, SIM A yang masih berlaku, dan deposit sesuai ketentuan. Untuk rental dengan driver, cukup KTP dan uang muka.",
  },
  {
    id: "4",
    question: "Apakah bisa antar-jemput mobil ke lokasi saya?",
    answer:
      "Ya, kami melayani antar-jemput mobil di area Jember dan sekitarnya. Untuk lokasi di luar kota, ada biaya tambahan yang akan kami informasikan saat booking.",
  },
  {
    id: "5",
    question:
      "Bagaimana jika ingin rental untuk jangka panjang (mingguan/bulanan)?",
    answer:
      "Kami menyediakan paket rental mingguan dan bulanan dengan harga spesial. Silakan hubungi tim kami untuk mendapatkan penawaran terbaik sesuai kebutuhan Anda.",
  },
  {
    id: "6",
    question: "Apakah ada biaya overtime atau denda keterlambatan?",
    answer:
      "Jika terlambat mengembalikan mobil dari waktu yang disepakati, akan ada biaya overtime per jam. Kami akan menginformasikan detail biaya ini saat booking.",
  },
];

export const promoSlides = [
  {
    id: "1",
    title: "Promo Spesial Februari!",
    description: "Diskon hingga 20% untuk rental mingguan",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=500&fit=crop",
    cta: "Booking Sekarang",
  },
  {
    id: "2",
    title: "Layanan Antar-Jemput Bandara",
    description: "Gratis antar ke Bandara Blimbingsari atau Stasiun Jember",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=500&fit=crop",
    cta: "Info Selengkapnya",
  },
  {
    id: "3",
    title: "Mobil Terbaru & Terawat",
    description: "Armada tahun 2022-2024, AC dingin, bersih & nyaman",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=500&fit=crop",
    cta: "Lihat Armada",
  },
  {
    id: "4",
    title: "Paket Wisata Keluarga",
    description: "Sewa harian untuk keliling Jember & sekitarnya",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=500&fit=crop",
    cta: "Chat Kami",
  },
  {
    id: "5",
    title: "Siap Temani Mudik Anda",
    description: "Booking mudik sekarang, mobil ready & siap pakai",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=500&fit=crop",
    cta: "Pesan Sekarang",
  },
];

export const whatsappNumber = "6285162640614"; // Ganti dengan nomor WA asli
export const whatsappLink = `https://wa.me/${whatsappNumber}`;
