# PLAN.md — Cinematic Hero Reveal

## 1. Tujuan

Membangun ulang **Hero/Hero Section** portfolio dengan pengalaman visual cinematic yang terinspirasi dari pola interaksi SignalIQ, tetapi menggunakan identitas visual, asset, dan konten milik project sendiri.

Pengalaman utama:

1. Halaman dibuka pada fullscreen hero.
2. Video portrait/cinematic menjadi visual utama.
3. Video awalnya gelap, blur, dan tertutup pixel/grid overlay.
4. User melakukan scroll.
5. Scroll mengontrol progress reveal secara langsung.
6. Grid/pixel overlay perlahan menghilang.
7. Blur berkurang sampai tajam.
8. Brightness/contrast meningkat sampai kondisi final.
9. Video mencapai kondisi fully revealed.
10. Hero kemudian dilepas dari pin.
11. Navbar portfolio muncul/menjadi aktif.
12. User melanjutkan ke section portfolio berikutnya.

---

# 2. Prinsip Desain

## Visual direction

Gunakan karakter:

- cinematic
- futuristic
- premium
- minimal
- dark
- sophisticated
- developer portfolio
- subtle cyberpunk
- tidak terlalu ramai

Jangan menyalin desain SignalIQ secara identik. Gunakan konsep interaksinya sebagai referensi: **scroll-driven reveal + pixel/grid mask + blur-to-sharp transition**.

## Prioritas visual

1. Subject/video
2. Camera movement dari video
3. Pixel/grid reveal
4. Blur-to-sharp
5. Brightness reveal
6. Typography
7. Navigation transition

Jangan sampai overlay atau animasi menutupi subject utama.

---

# 3. Target User Experience

## Initial state

Ketika halaman pertama kali dibuka:

- Hero memenuhi viewport.
- Video berjalan jika asset video tersedia.
- Video berada dalam keadaan gelap.
- Video blur.
- Pixel grid terlihat.
- Navbar portfolio belum dominan.
- Hero terasa seperti sebuah cinematic intro.

Target visual:

```text
┌──────────────────────────────────────────┐
│ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ │
│ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ │
│ ▪ ▪       BLURRED VIDEO       ▪ ▪ ▪ │
│ ▪ ▪       DARK PORTRAIT       ▪ ▪ ▪ │
│ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ │
└──────────────────────────────────────────┘
```

## Scroll state

Saat user scroll:

```text
Grid opacity   ↓
Blur           ↓
Darkness       ↓
Brightness     ↑
Contrast       ↑
Video clarity  ↑
```

## Final state

```text
Grid opacity = 0
Blur = 0
Brightness = 1
Contrast = 1
Video = sharp
Hero = fully revealed
```

---

# 4. Arsitektur Hero

Hero sebaiknya dipisahkan menjadi beberapa layer.

```text
Hero
│
├── HeroVideo
│
├── HeroOverlay
│   ├── DarkOverlay
│   └── PixelGrid
│
├── HeroContent
│   ├── Eyebrow / Label
│   ├── Name
│   ├── Role
│   └── CTA (jika diperlukan)
│
└── ScrollIndicator
```

Layer order:

```text
Top
│
├── UI / Hero Content
├── Pixel Grid
├── Dark / Reveal Overlay
├── Video
└── Background
```

Pastikan pointer-events overlay tidak menghalangi interaksi yang diperlukan.

---

# 5. Asset Video

Gunakan video portrait/cinematic yang sudah dibuat.

Konsep video:

- kamera mulai dari belakang subject
- kamera mengorbit ke kiri
- melewati side view
- menuju 3/4 view
- berakhir di front view
- subject relatif stationary
- subject melakukan subtle glasses adjustment
- head sedikit terangkat
- final eye contact

Website **tidak boleh memutar subject menggunakan CSS**.

Camera orbit harus berasal dari video itu sendiri.

Website hanya mengontrol:

- playback
- reveal
- blur
- brightness
- contrast
- scale kecil
- overlay
- scroll progress

---

# 6. Video Element

Gunakan:

```html
<video
  autoPlay
  muted
  loop
  playsInline
>
```

Jika autoplay gagal:

- tampilkan poster/fallback image
- jangan membuat hero kosong

Jika video terlalu berat:

- gunakan compressed web format
- prioritaskan MP4/WebM yang sesuai browser
- pertimbangkan poster image

Jangan preload video berukuran sangat besar tanpa pertimbangan performance.

---

# 7. Pixel Grid Overlay

Buat grid menggunakan HTML/CSS.

Jangan membuat satu gambar overlay statis jika grid dapat dibuat secara CSS.

Konsep:

```css
.pixel-grid {
  display: grid;
  grid-template-columns: repeat(..., 1fr);
  grid-template-rows: repeat(..., 1fr);
}
```

Setiap cell:

```text
┌───┬───┬───┬───┐
│   │   │   │   │
├───┼───┼───┼───┤
│   │   │   │   │
├───┼───┼───┼───┤
│   │   │   │   │
└───┴───┴───┴───┘
```

## Rekomendasi

Desktop:

- sekitar 16–30 kolom
- sekitar 10–20 baris

Jangan terlalu banyak DOM element.

Mobile:

- kurangi jumlah cell
- prioritaskan performance

Grid harus terasa seperti:

- pixelated
- digital
- scanning
- futuristic

Bukan seperti spreadsheet/table.

---

# 8. Grid Reveal

Grid tidak langsung hilang.

Progress:

```text
0%    → opacity 1.0
25%   → opacity 0.75
50%   → opacity 0.45
75%   → opacity 0.15
100%  → opacity 0
```

Jika memungkinkan, tambahkan variasi kecil pada cell agar reveal tidak terasa terlalu linear.

Namun hindari animasi random yang berat.

---

# 9. Blur Animation

Initial:

```text
blur: 14px–18px
```

Mid:

```text
blur: 6px–8px
```

Final:

```text
blur: 0px
```

Progress:

```text
0%    → 16px
25%   → 11px
50%   → 6px
75%   → 2px
100%  → 0px
```

Gunakan CSS filter atau transform yang dikontrol GSAP.

Jangan membuat blur terlalu ekstrem sampai video kehilangan bentuk sepenuhnya.

---

# 10. Brightness / Contrast

Initial:

```text
brightness: 0.5–0.6
contrast: 0.8–0.9
```

Final:

```text
brightness: 1
contrast: 1
```

Progress:

```text
0%    → dark
25%   → slightly brighter
50%   → recognizable
75%   → almost final
100%  → fully clear
```

Tujuannya menciptakan sensasi:

> hidden → discovered → revealed

---

# 11. Optional Color Overlay

Jika diperlukan, gunakan overlay gelap transparan.

Initial:

```text
opacity tinggi
```

Final:

```text
opacity rendah / 0
```

Jangan mengubah warna asli video secara berlebihan.

Pertahankan:

- blue ambient light
- orange/red rim light
- dark cinematic background

---

# 12. GSAP + ScrollTrigger

Gunakan:

- GSAP
- ScrollTrigger

Jika GSAP belum ada:

```bash
npm install gsap
```

Import:

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

---

# 13. Scroll Architecture

Hero menggunakan pin.

Konsep:

```text
NORMAL PAGE
    ↓
HERO ENTERS
    ↓
PIN HERO
    ↓
SCROLL CONTROLS REVEAL
    ↓
REVEAL COMPLETE
    ↓
UNPIN HERO
    ↓
PORTFOLIO CONTENT
```

Gunakan `scrub`.

Contoh konsep:

```js
gsap.timeline({
  scrollTrigger: {
    trigger: heroRef.current,
    start: "top top",
    end: "+=200%",
    pin: true,
    scrub: true,
  }
});
```

Nilai `end` harus diuji secara visual.

Jangan langsung mengunci nilai tanpa testing.

---

# 14. Animation Timeline

Timeline yang disarankan:

## 0–20%

- video sangat blur
- brightness rendah
- grid sangat jelas
- hero content minimal
- camera movement dari video mulai terlihat

## 20–40%

- blur berkurang
- brightness meningkat
- grid mulai fade
- video mulai mudah dikenali

## 40–60%

- video semakin sharp
- grid berkurang signifikan
- brightness mendekati normal

## 60–80%

- blur hampir hilang
- grid hampir tidak terlihat
- video menjadi dominant visual

## 80–100%

- blur = 0
- grid = 0
- brightness = normal
- contrast = normal
- final hero composition terlihat

---

# 15. Hero Content

Text jangan langsung mendominasi initial state.

Jika sudah ada:

- nama
- role
- tagline
- CTA

pertahankan konten yang ada.

Gunakan opacity/transform secara subtle.

Contoh:

```text
Initial
→ content sangat subtle

Mid reveal
→ content mulai terlihat

Final
→ content fully visible
```

Jangan membuat text bergerak terlalu banyak karena video sudah memiliki camera movement.

---

# 16. Scroll Indicator

Tambahkan indikator scroll yang minimal.

Contoh:

```text
SCROLL
   ↓
```

atau line vertical.

Saat user mulai scroll:

- indikator fade out.

---

# 17. Navbar Transition

Navbar tidak harus terlihat sebagai navbar portfolio penuh pada initial state.

Setelah hero reveal:

```text
Hero complete
      ↓
Navbar appears
      ↓
Navbar becomes sticky
```

Navbar dapat:

- fade in
- translateY kecil
- backdrop blur
- dark translucent background

Gunakan transisi sekitar 0.4–0.8 detik.

Jangan membuat navbar tiba-tiba muncul.

---

# 18. Transition ke Section Berikutnya

Setelah reveal selesai:

```text
HERO
 ↓
ABOUT
 ↓
SKILLS
 ↓
PROJECTS
 ↓
EXPERIENCE
 ↓
CONTACT
```

Hero tidak boleh menghalangi scrolling setelah animation selesai.

Pastikan:

- pin dilepas
- body scroll normal
- section berikutnya dapat diakses
- tidak ada blank space akibat ScrollTrigger

---

# 19. Responsive

## Desktop

Target utama:

- fullscreen
- cinematic
- grid lebih detail
- camera framing optimal

## Tablet

- kurangi grid
- sesuaikan crop
- kurangi animation intensity jika perlu

## Mobile

- grid lebih sedikit
- video tidak boleh memotong wajah
- hero tetap fullscreen
- typography mengecil
- ScrollTrigger tetap berfungsi

Gunakan media query atau breakpoint React/CSS dengan bijak.

---

# 20. Performance

Prioritas tinggi.

Hindari:

- ratusan event listener
- React state update setiap frame
- `setState` pada scroll
- nested animation yang tidak perlu
- terlalu banyak DOM cell
- blur berlebihan
- video resolusi terlalu tinggi

Jangan melakukan:

```js
window.addEventListener("scroll", () => {
  setState(...)
});
```

untuk animation utama.

Gunakan ScrollTrigger.

---

# 21. React Lifecycle

Gunakan cleanup yang benar.

Contoh pola:

```js
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // GSAP animation
  }, heroRef);

  return () => ctx.revert();
}, []);
```

Pastikan:

- ScrollTrigger tidak duplicate
- animation dibersihkan
- component unmount tidak meninggalkan listener
- React Strict Mode tidak menyebabkan duplicate animation

---

# 22. Accessibility

Gunakan:

```css
@media (prefers-reduced-motion: reduce) {
  ...
}
```

Jika reduced motion aktif:

- kurangi scroll animation
- grid dapat langsung berada pada final/low-motion state
- jangan membuat efek kamera tambahan
- content tetap mudah dibaca

Video tetap harus memiliki:

```html
muted
playsInline
```

---

# 23. Browser Compatibility

Test:

- Chrome
- Edge
- Firefox
- Safari

Desktop dan mobile.

Pastikan video autoplay tidak bergantung pada audio.

---

# 24. File Structure

Gunakan struktur yang sesuai dengan project yang sudah ada.

Jika belum ada struktur khusus, rekomendasi:

```text
src/
├── components/
│   ├── Hero/
│   │   ├── Hero.jsx
│   │   ├── Hero.css
│   │   ├── PixelGrid.jsx
│   │   └── heroAnimation.js
│   │
│   └── Navbar/
│       ├── Navbar.jsx
│       └── Navbar.css
│
├── assets/
│   └── video/
│       └── hero.mp4
│
├── App.jsx
└── main.jsx
```

Namun jangan memaksa struktur ini jika project sudah memiliki struktur yang berbeda.

---

# 25. Component Responsibility

## Hero.jsx

Bertanggung jawab untuk:

- markup hero
- video
- overlay
- content
- refs

## PixelGrid.jsx

Bertanggung jawab untuk:

- generate grid
- responsive cell count
- visual grid

## heroAnimation.js

Bertanggung jawab untuk:

- GSAP
- ScrollTrigger
- blur
- brightness
- contrast
- grid opacity
- hero pin
- content animation

## Navbar.jsx

Bertanggung jawab untuk:

- navigation
- visibility transition
- sticky behavior

---

# 26. Configuration Variables

Buat nilai animation mudah diubah.

Contoh:

```js
const HERO_CONFIG = {
  blurStart: 16,
  blurEnd: 0,

  brightnessStart: 0.55,
  brightnessEnd: 1,

  contrastStart: 0.85,
  contrastEnd: 1,

  gridOpacityStart: 1,
  gridOpacityEnd: 0,

  scrollDistance: "200%",
};
```

Tujuannya agar visual mudah dituning tanpa mencari angka di banyak file.

---

# 27. Visual Tuning Checklist

Setelah implementasi:

### Grid

- [ ] Tidak terlalu besar
- [ ] Tidak terlalu kecil
- [ ] Tidak terlihat seperti tabel
- [ ] Tidak menutupi wajah secara berlebihan
- [ ] Tidak menyebabkan performance issue

### Blur

- [ ] Initial blur cukup terasa
- [ ] Subject masih dapat dikenali
- [ ] Final benar-benar sharp

### Brightness

- [ ] Initial cukup gelap
- [ ] Final tidak overexposed

### Scroll

- [ ] Animation mengikuti scroll
- [ ] Tidak terasa tersendat
- [ ] Tidak terlalu cepat
- [ ] Tidak terlalu panjang

### Video

- [ ] Autoplay
- [ ] Muted
- [ ] Loop
- [ ] PlaysInline
- [ ] Tidak crop wajah secara buruk

### Navbar

- [ ] Tidak mengganggu initial hero
- [ ] Muncul setelah reveal
- [ ] Sticky setelah muncul

---

# 28. Final Acceptance Criteria

Implementasi dianggap selesai jika semua kondisi berikut terpenuhi:

- [ ] Hero fullscreen
- [ ] Video portrait tampil sebagai visual utama
- [ ] Video initial blur
- [ ] Video initial dark
- [ ] Pixel/grid overlay terlihat
- [ ] Scroll mengontrol animation
- [ ] Grid menghilang secara progresif
- [ ] Blur berkurang secara progresif
- [ ] Brightness meningkat secara progresif
- [ ] Contrast meningkat secara progresif
- [ ] Final video sharp
- [ ] Hero menggunakan ScrollTrigger pin
- [ ] Hero tidak menyebabkan blank space
- [ ] Navbar muncul setelah reveal
- [ ] Portfolio section dapat di-scroll normal
- [ ] Responsive desktop/tablet/mobile
- [ ] Reduced-motion tersedia
- [ ] Tidak ada duplicate ScrollTrigger
- [ ] Tidak ada console error
- [ ] Tidak ada React warning
- [ ] Performance tetap baik
- [ ] Existing portfolio sections tidak rusak

---

# 29. Testing Scenario

## Test 1 — Initial load

Refresh halaman.

Expected:

```text
Fullscreen hero
+
dark video
+
blur
+
pixel grid
```

## Test 2 — Slow scroll

Scroll sangat perlahan.

Expected:

```text
Grid → gradually disappears
Blur → gradually decreases
Brightness → gradually increases
```

Animation harus mengikuti posisi scroll.

## Test 3 — Fast scroll

Scroll cepat.

Expected:

- ScrollTrigger tetap stabil
- hero tidak flicker
- tidak ada animation jump
- section berikutnya tetap dapat diakses

## Test 4 — Scroll backward

Scroll kembali ke atas.

Expected:

```text
sharp → blur
bright → dark
grid hidden → grid visible
```

Animation harus reversible.

## Test 5 — Resize

Resize browser.

Expected:

- hero tetap fullscreen
- grid menyesuaikan
- video tetap ter-position dengan benar
- ScrollTrigger refresh dengan benar

## Test 6 — Mobile

Test viewport mobile.

Expected:

- tidak overflow horizontal
- video tidak rusak
- grid tetap ringan
- scroll tetap smooth

---

# 30. Final Design Flow

Keseluruhan experience:

```text
                    PAGE LOAD
                        │
                        ▼
              ┌─────────────────┐
              │   CINEMATIC      │
              │   HERO VIDEO     │
              │                  │
              │   DARK + BLUR    │
              │   PIXEL GRID     │
              └─────────────────┘
                        │
                      SCROLL
                        │
                        ▼
              ┌─────────────────┐
              │ GRID DECREASES   │
              │ BLUR DECREASES   │
              │ BRIGHTNESS ↑     │
              └─────────────────┘
                        │
                      SCROLL
                        │
                        ▼
              ┌─────────────────┐
              │   CLEAR VIDEO    │
              │   SHARP IMAGE    │
              │   GRID = NONE    │
              └─────────────────┘
                        │
                        ▼
                HERO COMPLETES
                        │
                        ▼
                 NAVBAR APPEARS
                        │
                        ▼
              ┌─────────────────┐
              │      ABOUT      │
              ├─────────────────┤
              │      SKILLS     │
              ├─────────────────┤
              │     PROJECTS    │
              ├─────────────────┤
              │   EXPERIENCE    │
              ├─────────────────┤
              │     CONTACT     │
              └─────────────────┘
```

---

# 31. Development Order

Implementasikan secara bertahap, jangan langsung membuat semua efek sekaligus.

### Phase 1 — Hero Foundation

- [ ] Inspect existing project
- [ ] Setup Hero component
- [ ] Load video
- [ ] Fullscreen layout
- [ ] Responsive positioning

### Phase 2 — Pixel Grid

- [ ] Create PixelGrid
- [ ] Responsive grid
- [ ] Initial overlay
- [ ] Performance check

### Phase 3 — ScrollTrigger

- [ ] Install/configure GSAP
- [ ] Pin hero
- [ ] Create scrub timeline
- [ ] Test scroll progress

### Phase 4 — Reveal

- [ ] Blur animation
- [ ] Brightness animation
- [ ] Contrast animation
- [ ] Grid fade

### Phase 5 — Content

- [ ] Hero text
- [ ] Scroll indicator
- [ ] Content reveal

### Phase 6 — Navbar

- [ ] Navbar transition
- [ ] Sticky behavior
- [ ] Hero → portfolio transition

### Phase 7 — Optimization

- [ ] Mobile
- [ ] Reduced motion
- [ ] Video optimization
- [ ] DOM optimization
- [ ] ScrollTrigger cleanup

### Phase 8 — Final QA

- [ ] Desktop
- [ ] Tablet
- [ ] Mobile
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Resize test
- [ ] Reverse scroll
- [ ] Console check
- [ ] Performance check

---

# 32. Important Development Rule

Jangan mengejar "persis secara pixel" dengan SignalIQ.

Yang harus dipertahankan adalah **konsep interaction**:

```text
Cinematic Hero
        +
Pixel Grid
        +
Blur
        +
Brightness
        +
Scroll-driven Reveal
        +
Smooth Transition
```

Visual akhir harus tetap memiliki identitas portfolio pribadi.

Target akhirnya:

> A cinematic, futuristic developer portfolio hero where the user's portrait feels like it is being digitally scanned and progressively revealed as the visitor scrolls.
