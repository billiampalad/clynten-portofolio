PLAN — Developer Signal Experience
1. Konsep Utama

Hero tidak langsung menampilkan informasi portfolio secara biasa.

Pengunjung akan mengalami proses:

SCAN → DETECT → ANALYZE → REVEAL → PROFILE COMPLETE

Seolah-olah website sedang melakukan scanning terhadap seorang developer.

Contoh:

CBP // DEVELOPER PROFILE

PROFILE SCANNED
027%

PARTIAL PROFILE

SYS_00482
WEB_2938
API_00192

DEVELOPER SIGNAL
WEB DEVELOPMENT

Ketika user scroll:

PROFILE SCANNED
054%

SYSTEM DESIGN
PROJECT SIGNAL DETECTED

WD4
SYSTEM INFORMATION
COOPERATION

Dan akhirnya:

PROFILE SCANNED
100%

PROFILE COMPLETE

DEVELOPER SIGNAL
CLYNTEN BILLIAM PALAD

FULL STACK
SYSTEM DEVELOPMENT
2. Struktur Visual

Hero terdiri dari 4 layer utama.

┌─────────────────────────────────────────┐
│             CINEMATIC VIDEO             │
│                                         │
│       [ Person / Developer ]            │
│                                         │
│   ┌───────────────────────────────┐     │
│   │ PIXEL / SCAN GRID             │     │
│   └───────────────────────────────┘     │
│                                         │
│  DATA STREAM                 SIGNAL      │
│  SYS_00482                  DETECTED     │
│  WEB_2938                   WEB DEV      │
│                                         │
│       PROFILE SCANNED 027%              │
└─────────────────────────────────────────┘
Layer 1 — Cinematic Video

Video menjadi elemen visual utama.

Initial:

blur: 16px
brightness: 0.55
contrast: 0.85
opacity: 0.75

Kemudian saat scroll:

blur → 0
brightness → 1
contrast → 1
opacity → 1
3. Layer 2 — Pixel / Scan Grid

Tambahkan grid transparan di atas video.

Misalnya:

□ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □
□ □ □ □ □ □ □ □

Grid tidak harus selalu terlihat.

Awal
opacity: 0.8
Tengah
opacity: 0.4
Akhir
opacity: 0

Efeknya memberikan kesan:

sistem sedang memproses / scanning data.

4. Layer 3 — Data Stream

Di sekitar video muncul data-data kecil.

Contoh:

SYS_00482
WEB_2938
API_00192
NET_8271
DB_01928
USR_00291

Kemudian data tersebut berubah menjadi informasi yang lebih bermakna.

Initial
SYS_00482
WEB_2938
API_00192
NET_8271
Middle
WEB DEVELOPMENT
SYSTEM DESIGN
REST API
NETWORKING
DATABASE
Final
FULL STACK
SYSTEM DEVELOPMENT
NETWORKING
DATABASE

Ini memberikan kesan bahwa sistem:

raw data → analysis → meaningful profile

5. Layer 4 — Developer Signal

Ini adalah elemen paling penting.

Gunakan beberapa kategori signal.

Signal 01
DEVELOPER SIGNAL

WEB DEVELOPMENT

DETECTED
Signal 02
PROJECT SIGNAL

WD4

SYSTEM INFORMATION
COOPERATION

VERIFIED
Signal 03
BUILD SIGNAL

MULTI-DOMAIN DEVELOPMENT

WEB
ANDROID
NETWORK
GIS
Signal 04
DEVELOPER SIGNAL

CLYNTEN BILLIAM PALAD

FULL STACK
SYSTEM DEVELOPMENT
6. Scroll Timeline

Semua elemen dikontrol oleh satu ScrollTrigger timeline.

SCROLL
  │
  ├── 0%
  │    ├── Video blurred
  │    ├── Grid visible
  │    ├── Raw data
  │    └── Profile 027%
  │
  ├── 25%
  │    ├── Video mulai sharp
  │    ├── Raw data berubah
  │    └── Web Development detected
  │
  ├── 50%
  │    ├── Project Signal
  │    ├── WD4 muncul
  │    └── System Design
  │
  ├── 75%
  │    ├── Networking
  │    ├── Android
  │    ├── GIS
  │    └── Build Signal
  │
  └── 100%
       ├── Video sharp
       ├── Grid hilang
       ├── Profile 100%
       ├── Profile Complete
       └── Developer Identity
7. State Detail
State 01 — Initial Scan

Saat halaman pertama dibuka:

CBP // DEVELOPER PROFILE

PROFILE SCANNED
027%

PARTIAL PROFILE

Di background:

SYS_00482
WEB_2938
API_00192
DB_01928

Video masih cukup gelap dan blur.

State 02 — Data Detection

Saat mulai scroll:

PROFILE SCANNED
042%

DEVELOPER SIGNAL

WEB DEVELOPMENT
DETECTED

Data mentah mulai berubah:

WEB_2938
      ↓
WEB DEVELOPMENT
8. State 03 — Project Detection

Sekitar 40–60%:

PROFILE SCANNED
061%

PROJECT SIGNAL

WD4

SYSTEM INFORMATION
COOPERATION

PROJECT DETECTED

Tambahkan line animation:

───────────────●────────

atau:

───╱╲────╱╲────────●───

Garis bergerak mengikuti progress scroll.

9. State 04 — Skill Detection

Sekitar 65–80%:

BUILD SIGNAL

MULTI-DOMAIN
DEVELOPMENT DETECTED

WEB
ANDROID
NETWORK
GIS
DATABASE

Bisa dibuat seperti beberapa signal card yang muncul satu per satu.

Misalnya:

┌──────────────────────┐
│ WEB DEVELOPMENT      │
│ DETECTED             │
└──────────────────────┘

          ↓

┌──────────────────────┐
│ ANDROID DEVELOPMENT  │
│ DETECTED             │
└──────────────────────┘
10. State 05 — Final Reveal

Saat mencapai 100%:

PROFILE SCANNED

100%

Kemudian:

PROFILE COMPLETE

Setelah itu:

DEVELOPER SIGNAL

CLYNTEN BILLIAM PALAD

FULL STACK
SYSTEM DEVELOPMENT

Pada titik ini:

video sudah sharp
pixel grid menghilang
data stream menghilang
signal elements fade
typography utama muncul
navbar mulai masuk
11. Navbar Transition

Jangan langsung tampilkan navbar sejak awal.

Hero menjadi semacam intro sequence.

0–80%

Navbar:

opacity: 0
transform: translateY(-20px)
80–100%

Navbar:

opacity: 1
transform: translateY(0)

Kemudian setelah hero selesai:

HOME
ABOUT
PROJECTS
SKILLS
EXPERIENCE
CONTACT
12. Arsitektur React

Saya sarankan struktur:

src/
│
├── components/
│   ├── Hero/
│   │   ├── Hero.jsx
│   │   ├── Hero.css
│   │   ├── PixelGrid.jsx
│   │   ├── DataStream.jsx
│   │   ├── DeveloperSignal.jsx
│   │   └── heroAnimation.js
│   │
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   │
│   └── ...
│
├── data/
│   └── developerSignals.js
│
└── App.jsx
13. Data Jangan Hardcode di JSX

Buat data terpisah.

Contoh:

export const developerSignals = [
  {
    id: "web",
    label: "DEVELOPER SIGNAL",
    title: "WEB DEVELOPMENT",
    status: "DETECTED",
    start: 0.15,
    end: 0.35,
  },

  {
    id: "system",
    label: "PROJECT SIGNAL",
    title: "WD4",
    subtitle: "SYSTEM INFORMATION COOPERATION",
    status: "VERIFIED",
    start: 0.35,
    end: 0.6,
  },

  {
    id: "multi",
    label: "BUILD SIGNAL",
    title: "MULTI-DOMAIN DEVELOPMENT",
    subtitle: "WEB / ANDROID / NETWORK / GIS",
    start: 0.6,
    end: 0.8,
  },

  {
    id: "profile",
    label: "DEVELOPER SIGNAL",
    title: "CLYNTEN BILLIAM PALAD",
    subtitle: "FULL STACK / SYSTEM DEVELOPMENT",
    start: 0.8,
    end: 1,
  },
];

Dengan begitu nanti mudah menambahkan project atau skill baru.

14. GSAP ScrollTrigger

Konsep animasinya:

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: heroRef.current,
    start: "top top",
    end: "+=3000",
    scrub: 1,
    pin: true,
  }
});

Kemudian timeline:

0.00 → video blur
0.15 → first signal
0.30 → data transformation
0.45 → project signal
0.60 → skill detection
0.75 → multi-domain signal
0.90 → identity reveal
1.00 → profile complete
15. Efek Data Transformation

Ini yang akan membuat website terasa lebih hidup.

Misalnya:

SYS_00482

berubah:

SYS_00482
SYSTEM_00482
SYSTEM DESIGN

kemudian:

SYSTEM DESIGN
DETECTED

Jangan langsung mengganti text.

Buat efek:

SYS_00482
SY5_00482
SYS_0A482
SYS_00482
SYSTEM DESIGN

Seolah-olah data sedang didekripsi/dianalisis.

16. Line / Signal Animation

Tambahkan satu visual line yang bergerak.

Contoh:

──────────╱╲──────╱╲────────●────

Line tersebut bisa menggunakan SVG.

Progress:

scroll progress
       ↓
SVG stroke-dashoffset
       ↓
signal line bergerak

Jadi garis bukan sekadar dekorasi, tetapi benar-benar mengikuti proses scanning.

17. Visual Hierarchy

Jangan membuat semua elemen terlalu terang.

Prioritasnya:

1. PERSON / VIDEO
       ↓
2. DEVELOPER SIGNAL
       ↓
3. PROFILE SCANNED
       ↓
4. DATA STREAM
       ↓
5. GRID

Data kecil hanya menjadi ambience.

Person tetap menjadi focal point.

18. Warna

Gunakan palette yang konsisten dengan portfolio kamu:

Background
#050505

Primary
White

Secondary
Gray

Signal
Blue / Cyan

Alert
Orange / Red

Success
Green

Tetapi gunakan warna signal secara hemat.

Contohnya:

PROFILE SCANNED     white
027%                cyan

DETECTED            cyan
ANOMALY             orange

VERIFIED            green
19. Responsive
Desktop

Semua data bisa muncul di kiri dan kanan video.

DATA                 PERSON                SIGNAL
Tablet

Kurangi jumlah data.

        PERSON
DATA              SIGNAL
Mobile

Jangan mempertahankan layout desktop.

Gunakan:

PERSON

PROFILE SCANNED
027%

DEVELOPER SIGNAL
WEB DEVELOPMENT

Data stream lebih sedikit agar tidak menutupi wajah.

20. Performance

Karena hero menggunakan video + GSAP + banyak DOM element:

gunakan video .webm jika memungkinkan
fallback .mp4
compress video
gunakan playsInline
muted
autoplay
loop
jangan membuat ratusan DOM element untuk grid
gunakan CSS Grid untuk pixel overlay
gunakan transform dan opacity untuk animasi
hindari animasi top, left, width, height
gunakan will-change secara terbatas
21. Accessibility

Jika user menggunakan:

prefers-reduced-motion

maka:

No camera-like animation
No heavy parallax
No rapid data transformation
No excessive blur transition

Hero langsung berada pada kondisi:

PROFILE COMPLETE

atau animasinya sangat minimal.

22. Final User Experience

Alur akhirnya kira-kira:

                 PAGE LOAD
                     │
                     ▼
           ┌──────────────────┐
           │  CBP // PROFILE  │
           │                  │
           │  SCANNING...     │
           └────────┬─────────┘
                    │
                    ▼
               USER SCROLL
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
     DATA SCANNED        VIDEO REVEAL
          │                   │
          ▼                   ▼
    SIGNAL DETECTED       SHARPEN
          │
          ▼
    PROJECT DETECTED
          │
          ▼
     SKILLS ANALYZED
          │
          ▼
     PROFILE 100%
          │
          ▼
    PROFILE COMPLETE
          │
          ▼
      NAVBAR REVEAL
          │
          ▼
       PORTFOLIO
Intinya

Fitur ini jangan dianggap sebagai sekadar overlay text di atas video. Kita buat sebagai interactive narrative yang menjadikan scroll sebagai proses “menganalisis developer”.

Dan yang paling penting, kita mengambil mekanisme pengalaman dari SignalIQ—data scanning, progressive reveal, signal detection, dan perubahan informasi—bukan menyalin konten atau desainnya. Pada halaman SignalIQ sendiri, konsep tersebut memang menggunakan narasi “DATA SCANNED”, perubahan data, serta “signals” untuk mengungkap informasi secara bertahap.

Kalau diimplementasikan dengan baik, hero kamu akan terasa seperti “AI/developer profile scanning interface”, tetapi tetap menjadi identitas portfolio CBP / Clynten Billiam Palad, bukan clone SignalIQ.