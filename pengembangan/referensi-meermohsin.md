# Analisis & Panduan Referensi: Meer Mohsin Portfolio (Awwwards Winner)

Dokumen ini berisi analisis teknis, arsitektur visual, struktur animasi, dan kode referensi dari situs [meermohsin.me](https://www.meermohsin.me) sebagai panduan pengembangan dan referensi fitur untuk portofolio Clynten.

---

## 1. Identitas Visual & Art Direction

### A. Karakter & Gaya Desain
* **Tema Utama:** *Cinematic Dark Avant-Garde / Brutalist Luxury*.
* **Emosi Pengalaman:** Misterius, presisi, berbobot (*heavy & smooth*), dan berorientasi sinematik (*immersive storytelling*).
* **Tekstur & Layer:** Menggunakan kombinasi background hitam pekat, aksen merah darah tajam, garis grid geometris (SVG blueprints), dan overlay tekstur *noise/grain* animasi halus.

### B. Palet Warna (Design Tokens)
```css
:root {
  --bg-primary: #000000;
  --bg-surface: #0d0d0d;
  --bg-card: #222222;
  --accent-red: #990000;
  --accent-crimson: #d60407;
  --text-white: #f5f5f5;
  --text-muted: rgba(255, 255, 255, 0.45);
  --border-subtle: rgba(255, 255, 255, 0.12);
}
```

### C. Kombinasi Tipografi (Font Pairing)
Kunci estetika situs ini terletak pada kontras tajam antara font clean modern dan kaligrafi tulisan tangan artistik:
1. **Primary Sans (Modern / Geometric):** `StackSansHeadline` & `Neue Montreal` — digunakan untuk navigasi, body, dan headline utama berbobot tebal/tipis (`font-weight: 200` & `500`).
2. **Signature Accent (Cursive / Calligraphy):** Font `Ruthie` — dipakai khusus untuk memberikan aksen kontras pada kata kunci (seperti *"Feel"*, *"part"*, *"CREATIVE"*, nomor preloader `000` raksasa, dan hover link menu).
3. **Display / Technical:** `Bebas Neue` — dipakai pada label tag, metadata tanggal, dan tombol navigasi.

---

## 2. Arsitektur & Tech Stack

| Komponen | Library / Teknologi | Peran dalam Website |
| :--- | :--- | :--- |
| **Framework & Build** | Vite + Vanilla JS / Modern ES Modules | Menjamin bundle ringan dan performa rendering tinggi |
| **Smooth Scroll** | **Lenis** (`@studio-freight/lenis`) | Menghilangkan patah-patah scroll native, menghasilkan inersia sinematik |
| **Motion Engine** | **GSAP (GreenSock)** | Core timeline, interpolation, dan easing untuk semua animasi |
| **Scroll Animations** | **GSAP ScrollTrigger** | Pinning section, text split scrub, dan step counter |
| **3D Rendering** | **Three.js** | Menampilkan 3D models GLTF/GLB (Roman statue viewer & mesh lighting) |
| **Interactive Fluid** | **WebGL Shader Canvas** (`#fluid2`) | Simulasi cairan/asap interaktif merah yang bereaksi terhadap kursor |
| **Audio Ambiance** | Web Audio API + HTML5 Audio | Sound visualizer bar (`.sound-wave`) dan audio latar interaktif |

---

## 3. Bedah Efek & Cuplikan Implementasi

### A. WebGL Interactive Fluid Canvas (`#fluid2`)
Canvas ini membentang di seluruh layar di balik konten, menghasilkan efek asap / cairan merah yang bergerak saat mouse bergerak.

**Parameter Fisika Simulasi yang Digunakan:**
```javascript
const fluidConfig = {
  SIM_RESOLUTION: 48,        // Resolusi simulasi fluida
  DYE_RESOLUTION: 384,       // Kerapatan tinta/warna
  DENSITY_DISSIPATION: 5.5,  // Kecepatan asap memudar
  VELOCITY_DISSIPATION: 3.8, // Kecepatan hilangnya dorongan
  PRESSURE: 0.12,            // Tekanan cairan
  PRESSURE_ITERATIONS: 6,
  CURL: 1.2,                 // Turbulensi/pusaran asap
  SPLAT_RADIUS: 0.035,       // Radius cipratan per gerak mouse
  SPLAT_FORCE: 1700,         // Dorongan energi kursor
  SHADING: false,
  COLOR_UPDATE_SPEED: 0.5    // Transisi palet warna crimson
};
```

---

### B. Setup Smooth Scrolling: Lenis + GSAP ScrollTrigger
Kombinasi ini membuat scroll browser sinkron dengan animasi scrubbing GSAP tanpa frame drop.

```javascript
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Inisialisasi Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

// 2. Sinkronisasi Lenis RAF dengan GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(1000, 16);
```

---

### C. Kinetic Text Reveal (Split Word Animation)
Setiap paragraf penting dan judul dipecah menjadi kata/huruf yang dibungkus tag dengan CSS `overflow: hidden`.

**CSS Pattern:**
```css
.line {
  display: block;
  overflow: hidden;
}

.word {
  display: inline-block;
  transform: translateY(120%);
  opacity: 0;
  will-change: transform, opacity;
}
```

**GSAP Timeline:**
```javascript
gsap.to('.cinematic-text .word', {
  scrollTrigger: {
    trigger: '.cinematic-text',
    start: 'top 80%',
    end: 'bottom 40%',
    scrub: 1,
  },
  y: '0%',
  opacity: 1,
  stagger: 0.05,
  ease: 'power3.out'
});
```

---

### D. Hover State Navigasi dengan Perubahan Font Dinamis
Navigasi atas memiliki efek transisi instan font kaligrafi saat kursor mendekat.

```css
nav ul li a {
  text-decoration: none;
  color: #f5f5f5;
  font-family: 'Neue Montreal', sans-serif;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

/* Transformasi ke kaligrafi saat hover */
nav ul li a:hover {
  font-family: 'Ruthie', cursive;
  color: #d60407;
  font-size: 1.8rem; /* Penyesuaian optical size font script */
}

/* Ikon Plus berputar dan membesar */
nav ul li .plus-for-hover img {
  transform: rotate(45deg) scale(0);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

nav ul li:hover .plus-for-hover img {
  transform: rotate(0deg) scale(1);
}
```

---

### E. Layered Project Cards Pinning (`#work`)
Bagian showcase proyek menggunakan efek layar terkunci (*pinned*) selagi kartu-kartu proyek saling bertumpuk ke atas saat pengguna scroll ke bawah:

```javascript
ScrollTrigger.create({
  trigger: '.container#work',
  start: 'top top',
  end: '+=400%',
  pin: true,
  scrub: 1,
  onUpdate: (self) => {
    // 1. Update lingkaran progress SVG
    const circle = document.querySelector('.circle-steps circle');
    const circumference = 219.91;
    const offset = circumference - (self.progress * circumference);
    circle.style.strokeDashoffset = offset;

    // 2. Update step number (01, 02, 03)
    const activeStep = Math.min(Math.floor(self.progress * 4) + 1, 4);
    document.querySelector('.circle-steps h1').textContent = `0${activeStep}`;
  }
});
```

---

### F. Case Study Off-Canvas Drawer (`clip-path` Transition)
Sidebar studi kasus proyek tidak menggunakan slide translateX standar, melainkan pemotongan geometri (*clip-path inset*) yang memberikan efek gorden modern:

```css
.case-study-side-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 40vw;
  height: 100vh;
  background-color: #222222;
  z-index: 2200;
  overflow-y: scroll;
  clip-path: inset(100% 0% 0% 0%); /* Tertutup penuh dari bawah */
  transition: clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

body.sidebar-open .case-study-side-bar {
  clip-path: inset(0% 0% 0% 0%);   /* Terbuka penuh */
}
```

---

### G. Rotating Badge CTA Button (Footer)
Tombol kontak bundar dengan lingkaran teks berputar bebas:

```css
.ring-circle img {
  width: 100%;
  height: 100%;
  animation: ringRotate 12s linear infinite;
}

@keyframes ringRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.cta-footer:hover {
  box-shadow: 0 0 25px #990000;
  background-color: #000000;
  color: #990000;
  border-color: #990000;
}
```

---

## 4. Rekomendasi Adaptasi untuk Portofolio Clynten

Untuk diterapkan ke codebase `clynten-portfolio`:

1. **Integrasi ke Hero Section (`Hero.jsx` / `signal.md`):**
   * Gabungkan konsep scanner radar sinyal pengembang yang sudah ada di [pengembangan/signal.md](file:///c:/laragon/www/clynten-portfolio/pengembangan/signal.md) dengan efek **Fluid WebGL Canvas** di latar belakang.
   * Gunakan tipografi kontras: tambahkan sentuhan font script/kaligrafi untuk status sistem atau highlight nama.

2. **Kombinasi Kursor & Hover Card:**
   * Di section **Projects**, pasang custom magnetic hover follower bertuliskan **"VIEW SIGNAL"** atau **"INSPECT"** yang mengikuti kursor saat mendekati kartu proyek.

3. **Smooth Scroll Engine:**
   * Pasang `Lenis` di level root (`App.jsx`) agar transisi scroll antar section (About, Hero, Projects, Contact) berjalan mulus seperti standar Awwwards.
