export interface Car {
  id: string;
  name: string;
  type: "MPV" | "SUV" | "City Car" | "Luxury";
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
    name: "Toyota Avanza",
    type: "MPV",
    pricePerDay: 300000,
    priceWithDriver: 450000, // +150k untuk driver
    transmission: "Manual",
    seats: 7,
    fuel: "Bensin",
    year: 2022,
    features: ["AC", "Audio", "7 Penumpang", "Bagasi Luas"],
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&h=400&fit=crop",
    tag: "Best Seller",
  },
  {
    id: "2",
    name: "Toyota Avanza Veloz",
    type: "MPV",
    pricePerDay: 350000,
    priceWithDriver: 500000,
    transmission: "Matic",
    seats: 7,
    fuel: "Bensin",
    year: 2023,
    features: ["AC", "Audio Premium", "7 Penumpang", "Sensor Parkir"],
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
    tag: "Best Seller",
  },
  {
    id: "3",
    name: "Daihatsu Xenia",
    type: "MPV",
    pricePerDay: 280000,
    priceWithDriver: 430000,
    transmission: "Manual",
    seats: 7,
    fuel: "Bensin",
    year: 2022,
    features: ["AC", "Audio", "Hemat BBM", "Nyaman"],
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
    tag: "Hemat",
  },
  {
    id: "4",
    name: "Toyota Innova Reborn",
    type: "MPV",
    pricePerDay: 450000,
    priceWithDriver: 600000,
    transmission: "Matic",
    seats: 7,
    fuel: "Diesel",
    year: 2023,
    features: ["AC", "Audio Premium", "Reclining Seat", "USB Port"],
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop",
    tag: "Premium",
  },
  {
    id: "5",
    name: "Toyota Innova Zenix",
    type: "MPV",
    pricePerDay: 550000,
    priceWithDriver: 700000,
    transmission: "Matic",
    seats: 7,
    fuel: "Bensin",
    year: 2024,
    features: ["Hybrid", "Sunroof", "Captain Seat", "Layar Sentuh"],
    image:
      "https://images.unsplash.com/photo-1600705722370-d067bc827a2a?w=600&h=400&fit=crop",
    tag: "Terbaru",
  },
  {
    id: "6",
    name: "Toyota Rush",
    type: "SUV",
    pricePerDay: 400000,
    priceWithDriver: 550000,
    transmission: "Matic",
    seats: 7,
    fuel: "Bensin",
    year: 2023,
    features: ["Ground Clearance Tinggi", "AC", "Audio", "7 Penumpang"],
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&h=400&fit=crop",
  },
  {
    id: "7",
    name: "Daihatsu Terios",
    type: "SUV",
    pricePerDay: 380000,
    priceWithDriver: 530000,
    transmission: "Matic",
    seats: 7,
    fuel: "Bensin",
    year: 2022,
    features: ["SUV Tangguh", "AC", "Audio", "Bagasi Luas"],
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
  },
  {
    id: "8",
    name: "Honda Brio",
    type: "City Car",
    pricePerDay: 250000,
    priceWithDriver: 380000,
    transmission: "Matic",
    seats: 5,
    fuel: "Bensin",
    year: 2023,
    features: ["Hemat BBM", "AC", "Audio", "Cocok Dalam Kota"],
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop",
    tag: "Hemat",
  },
  {
    id: "9",
    name: "Toyota Agya",
    type: "City Car",
    pricePerDay: 230000,
    priceWithDriver: 360000,
    transmission: "Manual",
    seats: 5,
    fuel: "Bensin",
    year: 2022,
    features: ["Irit", "Lincah", "AC", "Audio"],
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop",
    tag: "Hemat",
  },
  {
    id: "10",
    name: "Toyota Hiace Commuter",
    type: "MPV",
    pricePerDay: 650000,
    priceWithDriver: 850000,
    transmission: "Manual",
    seats: 15,
    fuel: "Diesel",
    year: 2022,
    features: ["15 Penumpang", "AC", "Audio", "Cocok Rombongan"],
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&h=400&fit=crop",
  },
  {
    id: "11",
    name: "Isuzu Elf",
    type: "MPV",
    pricePerDay: 700000,
    priceWithDriver: 900000,
    transmission: "Manual",
    seats: 16,
    fuel: "Diesel",
    year: 2023,
    features: ["16-19 Penumpang", "AC", "Audio", "Bagasi Besar"],
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop",
  },
  {
    id: "12",
    name: "Toyota Fortuner",
    type: "SUV",
    pricePerDay: 750000,
    priceWithDriver: 950000,
    transmission: "Matic",
    seats: 7,
    fuel: "Diesel",
    year: 2023,
    features: ["SUV Premium", "4x4", "Leather Seat", "Sunroof"],
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop",
    tag: "Premium",
  },
  {
    id: "13",
    name: "Mitsubishi Pajero Sport",
    type: "SUV",
    pricePerDay: 800000,
    priceWithDriver: 1000000,
    transmission: "Matic",
    seats: 7,
    fuel: "Diesel",
    year: 2024,
    features: ["SUV Mewah", "4x4", "Cruise Control", "Layar Sentuh"],
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop",
    tag: "Premium",
  },
  {
    id: "14",
    name: "Honda CR-V",
    type: "SUV",
    pricePerDay: 700000,
    priceWithDriver: 900000,
    transmission: "Matic",
    seats: 7,
    fuel: "Bensin",
    year: 2023,
    features: ["SUV Modern", "Turbo", "Panoramic", "Honda Sensing"],
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
    tag: "Premium",
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

export const whatsappNumber = "6282337988088"; // Ganti dengan nomor WA asli
export const whatsappLink = `https://wa.me/${whatsappNumber}`;
