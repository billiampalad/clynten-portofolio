# Portfolio Motion & Interaction Plan
## Reference: SignalIQ — Somya Jain

**Reference:** https://www.somyajain.com/signaliq-concept  
**Purpose:** Menjadikan SignalIQ sebagai referensi interaction design untuk portfolio pribadi, bukan untuk menyalin desain secara identik.

---

## 1. Design Direction

### Core idea

Portfolio harus terasa seperti sebuah **interactive digital product**, bukan sekadar halaman CV.

Prinsip utama:

- Storytelling melalui scroll.
- Animasi mempunyai fungsi, bukan dekorasi semata.
- Data/code/interface digunakan sebagai visual language.
- Transisi antar-section terasa kontinu.
- Typography menjadi bagian dari motion.
- Media besar digunakan sebagai focal point.
- Micro-interactions memberi feedback pada cursor, button, card, dan navigation.
- Motion harus tetap cepat dan nyaman pada desktop maupun mobile.

### Recommended visual identity

Untuk portfolio Clynten:

- Base: deep navy / near-black.
- Primary text: off-white.
- Accent: electric blue.
- Secondary accent: gold/yellow untuk personal identity.
- UI elements: thin borders, subtle grids, terminal/code/data motifs.
- Typography: modern grotesk/sans-serif + monospace untuk technical labels.

---

# 2. SignalIQ Analysis

SignalIQ membangun pengalaman dengan konsep **progressive reveal**: informasi tidak diberikan sekaligus, tetapi diperlihatkan bertahap melalui perjalanan halaman.

Halaman memperkenalkan problem, menunjukkan data mentah, kemudian memperlihatkan bagaimana data tersebut berubah menjadi insight. Struktur ini sangat cocok diadaptasi untuk portfolio developer.

Di halaman tersebut terdapat elemen seperti:

- headline besar,
- status/progress "DATA SCANNED",
- data transaksi yang bergerak/berubah,
- statement dan data mentah,
- sample bank statement,
- kategori behaviour,
- anomaly/pattern indicators,
- concluding message,
- repeated brand/type treatment.

Reference page juga secara eksplisit menggunakan data fictional/anonymised dan menyatakan bahwa halaman tersebut adalah unused concept. 

---

# 3. Animation System

## 3.1 Page Load / Intro Animation

### Goal

Membuat opening portfolio terasa seperti sebuah sistem yang sedang booting.

### Recommended sequence

1. Background muncul.
2. Small technical label muncul.
3. Main headline masuk dengan opacity + vertical movement.
4. Accent line/grid muncul.
5. Hero visual mulai bergerak.
6. CTA muncul terakhir.

### Timing

```text
Background        0ms
Technical label   100ms
Headline          200ms
Supporting text   350ms
Visual            450ms
CTA               600ms
```

### Motion

- opacity: 0 → 1
- y: 20px → 0
- duration: 600–900ms
- easing: ease-out / custom cubic-bezier

Jangan menggunakan bounce animation pada hero.

---

# 4. Hero Text Animation

## Inspiration

SignalIQ menggunakan typography sebagai bagian utama dari storytelling.

### Portfolio implementation

Hero:

```text
Clynten Billam Palad

INFORMATICS STUDENT
DEVELOPER
NETWORKING ENTHUSIAST
```

### Animation

Setiap line muncul secara stagger.

Contoh:

```text
Clynten
        ↓
Billam Palad
        ↓
Informatics Student
        ↓
Developer
```

### Recommended effect

Split text → animate each word/line.

Properties:

```text
opacity: 0 → 1
transform: translateY(40px) → translateY(0)
clip-path: inset(0 0 100% 0) → inset(0)
```

Duration:

```text
700–1000ms
stagger: 50–100ms
```

---

# 5. Data / Code Stream Animation

Ini merupakan salah satu elemen yang paling layak diadaptasi dari SignalIQ.

SignalIQ menampilkan kumpulan data transaksi sebagai visual storytelling.

Untuk portfolio developer, ubah menjadi:

```text
GET /projects
200 OK

Python.................████████
Laravel................██████
React..................███████
Networking.............█████████
Machine Learning.......██████
```

atau:

```text
$ initializing portfolio...
$ loading projects...
$ scanning repositories...
$ detecting skills...
$ system ready.
```

### Animation

Text/data bergerak secara horizontal atau vertical.

Variasi:

- ticker
- terminal stream
- scrolling code
- changing numbers
- blinking cursor
- status indicators

### Important

Gunakan data visual sebagai **background storytelling**, bukan sebagai konten utama yang sulit dibaca.

---

# 6. Scroll-Driven Animation

## Recommended behavior

Saat user scroll:

```text
Hero
  ↓
About
  ↓
Skills
  ↓
Projects
  ↓
Experience
  ↓
Contact
```

Setiap section memiliki progress state.

### Example

```text
SCROLL 0%
[████................]

SCROLL 25%
[████████............]

SCROLL 50%
[████████████........]

SCROLL 75%
[████████████████....]

SCROLL 100%
[████████████████████]
```

Progress indicator dapat digunakan sebagai elemen UI kecil di sisi layar.

---

# 7. Section Reveal Animation

Setiap section jangan langsung muncul ketika masuk viewport.

### Recommended

```text
Before viewport:
opacity: 0
y: 60px
scale: 0.98

In viewport:
opacity: 1
y: 0
scale: 1
```

Duration:

```text
700–900ms
```

Trigger:

```text
IntersectionObserver
```

atau:

```text
GSAP ScrollTrigger
```

---

# 8. About Section Animation

## Concept

Jangan menggunakan About Me sebagai paragraf statis.

Buat seperti system profile.

Contoh:

```text
PROFILE_STATUS
────────────────────

NAME
Clynten Billam Palad

ROLE
Informatics Developer

LOCATION
Manado, Indonesia

FOCUS
Web Development
Networking
AI / Machine Learning
```

### Animation

Label masuk lebih dahulu.

Value masuk 100–150ms kemudian.

Contoh:

```text
NAME
        ↓
Clynten Billam Palad
```

---

# 9. Skills Animation

## Avoid

Jangan menggunakan progress bar:

```text
Python ██████████ 90%
```

karena persentase kemampuan subjektif dan kurang profesional.

## Better

Gunakan interactive skill cards.

```text
PYTHON
Laravel
React
Networking
Machine Learning
Linux
Git
```

### Hover

Card:

```text
normal
↓
translateY(-6px)
border highlight
glow
```

Icon:

```text
scale(1) → scale(1.08)
```

Duration:

```text
250–350ms
```

---

# 10. Featured Projects

Ini harus menjadi salah satu bagian terkuat dari portfolio.

## Project card

Setiap project memiliki:

```text
01
SMART CCTV

AI-powered CCTV monitoring
with YOLOv8 and activity detection.

Python
YOLOv8
Streamlit

VIEW PROJECT →
```

### Card hover

Normal:

```text
image + title
```

Hover:

```text
image scale 1.05
overlay appears
title moves slightly
CTA appears
```

### Image animation

```text
scale: 1 → 1.05
duration: 600ms
```

gunakan `overflow: hidden`.

---

# 11. Project Image / Video Animation

SignalIQ sangat kuat pada penggunaan visual sebagai bagian dari narrative.

Untuk portfolio:

### Priority

1. Video demo project.
2. Animated screen recording.
3. Static screenshot.
4. 3D/device mockup.

### Recommended project media

Smart CCTV:

```text
CCTV footage
      ↓
YOLO detection
      ↓
Bounding box
      ↓
Activity heatmap
      ↓
Alarm
```

Media bisa diputar ketika card masuk viewport.

### Video behavior

- muted
- autoplay
- loop
- playsInline
- pause ketika keluar viewport

Jangan autoplay video dengan audio.

---

# 12. Project Detail Transition

Ketika user memilih project:

```text
Project Card
     ↓
Image expands
     ↓
Page transition
     ↓
Project detail
```

### Recommended transition

Shared element / View Transition style.

Image dari thumbnail berubah menjadi hero image.

```text
thumbnail
   ↓
scale
   ↓
full-width hero
```

Jika stack mendukung View Transitions API, gunakan.

Fallback:

```text
fade + scale
```

---

# 13. Project Detail Page

Setiap project menggunakan storytelling.

## Structure

```text
01 — PROJECT

SMART CCTV

AI-powered security monitoring system.

[Hero Video]

THE PROBLEM

...

THE APPROACH

...

TECH STACK

...

HOW IT WORKS

Camera
  ↓
YOLO
  ↓
Detection
  ↓
Heatmap
  ↓
Alarm

RESULT

...

GITHUB / LIVE DEMO
```

---

# 14. Technical Diagram Animation

Karena portfolio Anda memiliki sisi networking dan AI, gunakan animated diagrams.

Example:

```text
Camera
   │
   ▼
YOLOv8
   │
   ▼
Detection
   │
   ├── Heatmap
   │
   └── Alarm
```

### Animation

Node muncul satu per satu.

```text
Camera      0ms
YOLO       300ms
Detection  600ms
Heatmap    900ms
Alarm     1200ms
```

Connection line:

```text
stroke-dashoffset
```

sehingga terlihat seperti data sedang mengalir.

---

# 15. Cursor Interaction

Desktop only.

### Cursor

Normal:

```text
small dot
```

Hover interactive:

```text
dot expands
```

Hover project:

```text
VIEW
```

Cursor dapat berubah menjadi circle kecil dengan text:

```text
OPEN
```

### Important

Jangan membuat cursor terlalu besar karena mengganggu usability.

Mobile harus menggunakan cursor default.

---

# 16. Navigation Animation

Navbar:

```text
HOME
ABOUT
PROJECTS
SKILLS
CONTACT
```

### On scroll

Top navigation dapat mengecil.

Initial:

```text
height: 80px
```

Scrolled:

```text
height: 60px
background: semi-transparent
backdrop-filter: blur()
```

Transition:

```text
300–400ms
```

---

# 17. Page Transition

Gunakan transition ketika berpindah halaman.

### Recommended

Exit:

```text
opacity 1 → 0
scale 1 → 0.98
```

Enter:

```text
opacity 0 → 1
scale 0.98 → 1
```

Duration:

```text
400–600ms
```

Untuk project detail, gunakan sedikit lebih dramatis:

```text
image expands
background fades
content reveals
```

---

# 18. Text Scramble Effect

Gunakan hanya untuk technical labels.

Contoh:

```text
INITIALIZING...
SCANNING...
BUILDING...
DEPLOYED.
```

atau:

```text
NETWORK
AI
WEB
SYSTEM
```

### Effect

Characters berubah sementara:

```text
SCANNING
SC4NN1NG
SCA@@1NG
SCANNING
```

Duration:

```text
500–800ms
```

Jangan menggunakan efek ini pada paragraph karena akan mengurangi readability.

---

# 19. Number Counter

Gunakan untuk project statistics.

Contoh:

```text
05+
Projects

03+
Years Learning

08+
Technologies

∞
Curiosity
```

Ketika masuk viewport:

```text
0 → 5
0 → 3
0 → 8
```

Duration:

```text
1000–1500ms
```

---

# 20. Horizontal Marquee

Gunakan seperti repeated typography treatment.

Contoh:

```text
DEVELOPER — NETWORKING — AI — WEB — LINUX —
DEVELOPER — NETWORKING — AI — WEB — LINUX —
```

Direction:

```text
right → left
```

atau section tertentu:

```text
left → right
```

Speed:

```text
20–40px/s
```

Pause on hover jika diperlukan.

---

# 21. Background Motion

Background harus subtle.

### Recommended

- animated grid
- noise texture
- moving gradient
- floating particles
- code fragments

### Avoid

- excessive particles
- constant flashing
- heavy 3D everywhere
- background video yang membuat teks sulit dibaca

---

# 22. Scroll Progress Indicator

Buat indicator kecil:

```text
01 ───────────────
02 ───────────────
03 ───────────────
04 ───────────────
```

atau:

```text
01 / 06
```

Contoh:

```text
01 — INTRO
02 — ABOUT
03 — SKILLS
04 — PROJECTS
05 — EXPERIENCE
06 — CONTACT
```

Active section berubah berdasarkan scroll position.

---

# 23. Contact Section

Ending harus terasa seperti conclusion dari sebuah journey.

Contoh:

```text
LET'S BUILD
SOMETHING
USEFUL.

Have an idea?

[LET'S TALK]
```

### Animation

Headline:

```text
LET'S
BUILD
SOMETHING
USEFUL.
```

masuk line-by-line.

Button muncul setelah headline.

---

# 24. Footer Animation

Footer dapat memiliki terminal-style status.

```text
SYSTEM STATUS
● ONLINE

LOCATION
MANADO, INDONESIA

CURRENTLY
BUILDING DIGITAL EXPERIENCES

© 2026 CLYNTEN BILLAM PALAD
```

Tambahkan small blinking indicator:

```text
●
```

Animation:

```text
opacity 1 → 0.3 → 1
```

---

# 25. Recommended Technology

## Option A — Recommended

### Next.js + React

```text
Next.js
React
TypeScript
Tailwind CSS
GSAP
Lenis
Framer Motion
```

Gunakan:

- GSAP → complex scroll animation
- ScrollTrigger → scroll-driven animation
- Framer Motion → UI/micro interaction
- Lenis → smooth scrolling
- Tailwind → styling

Jangan menggunakan semua library untuk fungsi yang sama.

---

# 26. Animation Responsibility

| Feature | Technology |
|---|---|
| Page transition | Framer Motion / View Transition |
| Hero text | GSAP / Framer Motion |
| Scroll animation | GSAP ScrollTrigger |
| Smooth scrolling | Lenis |
| Hover animation | CSS / Framer Motion |
| Cursor | React + CSS |
| Number counter | Framer Motion / GSAP |
| Text scramble | Custom JS |
| Marquee | CSS |
| Video | HTML5 Video |
| SVG diagram | SVG + GSAP |
| Image reveal | GSAP |
| Loading screen | Framer Motion |

---

# 27. Performance Rules

Animation tidak boleh mengorbankan performance.

Prioritaskan:

```text
transform
opacity
```

Hindari animating:

```text
width
height
top
left
box-shadow
filter
```

secara terus-menerus jika tidak diperlukan.

Gunakan:

```text
transform: translate3d()
```

bila relevan.

### Images

Gunakan:

- WebP
- AVIF
- responsive images
- lazy loading

### Video

Gunakan:

- compressed MP4/WebM
- muted autoplay
- poster image
- lazy loading
- pause offscreen

---

# 28. Accessibility

Semua animation harus memiliki fallback.

Implement:

```css
@media (prefers-reduced-motion: reduce) {
  /* disable/reduce non-essential animations */
}
```

Jika user memilih reduced motion:

- disable parallax
- disable text scramble
- disable cursor animation
- reduce page transition
- reduce scroll animation
- tetap tampilkan seluruh content

---

# 29. Mobile Strategy

Jangan sekadar mengecilkan desktop version.

### Mobile

Disable atau simplify:

- custom cursor
- heavy parallax
- large horizontal animation
- complex background effects

Keep:

- section reveal
- image animation
- project transitions
- button hover → tap state
- subtle text animation

---

# 30. Motion Hierarchy

Tidak semua element boleh bergerak.

### Level 1 — Primary

Hero:

```text
large typography
main visual
CTA
```

### Level 2 — Secondary

```text
project cards
section titles
media
```

### Level 3 — Micro

```text
buttons
icons
cursor
labels
```

Jika semuanya bergerak, tidak ada lagi hierarchy.

---

# 31. Recommended Portfolio Flow

Final experience:

```text
┌─────────────────────────┐
│       LOADING           │
│  INITIALIZING...        │
└───────────┬─────────────┘
            ↓
┌─────────────────────────┐
│          HERO           │
│                         │
│ CLYNTEN BILLAM PALAD    │
│ Developer / Informatics │
│                         │
│ [VIEW PROJECTS]         │
└───────────┬─────────────┘
            ↓
       DATA STREAM
            ↓
┌─────────────────────────┐
│        ABOUT            │
│     PROFILE SYSTEM      │
└───────────┬─────────────┘
            ↓
┌─────────────────────────┐
│        SKILLS           │
│  Interactive Tech Stack │
└───────────┬─────────────┘
            ↓
       PROJECT STREAM
            ↓
┌─────────────────────────┐
│    FEATURED PROJECTS    │
│                         │
│ Smart CCTV              │
│ Fuzzy AHP               │
│ Networking / QoS        │
│ Web Applications        │
└───────────┬─────────────┘
            ↓
     PROJECT DETAIL
            ↓
┌─────────────────────────┐
│      EXPERIENCE         │
│      EDUCATION          │
└───────────┬─────────────┘
            ↓
┌─────────────────────────┐
│        CONTACT          │
│                         │
│ LET'S BUILD             │
│ SOMETHING USEFUL.       │
└─────────────────────────┘
```

---

# 32. Development Phases

## Phase 1 — Foundation

- [ ] Setup Next.js
- [ ] Setup TypeScript
- [ ] Setup Tailwind
- [ ] Define typography
- [ ] Define color system
- [ ] Create layout
- [ ] Create responsive navigation

## Phase 2 — Core Sections

- [ ] Hero
- [ ] About
- [ ] Skills
- [ ] Projects
- [ ] Experience
- [ ] Contact
- [ ] Footer

## Phase 3 — Motion

- [ ] Page loader
- [ ] Hero reveal
- [ ] Text reveal
- [ ] Scroll reveal
- [ ] Project hover
- [ ] Image reveal
- [ ] Number counter
- [ ] Marquee
- [ ] Page transition

## Phase 4 — Advanced Motion

- [ ] Data stream
- [ ] SVG technical diagram
- [ ] Cursor interaction
- [ ] Project shared transition
- [ ] Scroll progress
- [ ] Parallax
- [ ] Text scramble

## Phase 5 — Optimization

- [ ] Image optimization
- [ ] Video optimization
- [ ] Lazy loading
- [ ] Mobile testing
- [ ] Reduced motion
- [ ] Lighthouse audit
- [ ] Accessibility audit

## Phase 6 — Deployment

- [ ] Git repository
- [ ] Production build
- [ ] Domain
- [ ] SEO
- [ ] Open Graph
- [ ] Analytics
- [ ] Deployment

---

# 33. Priority Matrix

## Must Have

- Hero text animation
- Section reveal
- Project hover
- Project image/video
- Page transition
- Smooth scrolling
- Responsive design
- Reduced-motion support

## Should Have

- Data stream
- Scroll progress
- Number counter
- Marquee
- SVG technical diagram

## Nice to Have

- Custom cursor
- Text scramble
- Advanced parallax
- Shared element transition
- Interactive 3D

---

# 34. Important Design Rule

**Do not copy SignalIQ visually. Copy its interaction philosophy.**

Yang kita ambil:

```text
Storytelling
Progressive disclosure
Data as visual language
Typography as motion
Scroll as interaction
Visual continuity
Micro-interactions
```

Yang tidak perlu disalin:

```text
Exact layout
Exact typography
Exact copy
Exact graphics
Exact animation timing
Exact color palette
Exact assets
```

Tujuannya adalah membuat portfolio yang terasa **terinspirasi oleh quality level SignalIQ**, tetapi tetap memiliki identitas Clynten sendiri.

---

# 35. Final Creative Direction

Target experience:

> "Portfolio ini terasa seperti sebuah produk teknologi yang sedang hidup."

Bukan:

> "Website yang penuh animasi."

Motion harus selalu menjawab salah satu pertanyaan:

1. Apa yang sedang terjadi?
2. Di mana posisi user?
3. Apa yang harus diperhatikan?
4. Apa yang berubah?
5. Apa yang bisa diklik?
6. Apa hubungan antara satu informasi dengan informasi lainnya?

Jika sebuah animasi tidak menjawab salah satu pertanyaan tersebut, animasi tersebut sebaiknya dihapus.

---

## Reference Notes

SignalIQ reference page:
https://www.somyajain.com/signaliq-concept

The page identifies itself as an unused SignalIQ concept and describes its data as fictional/anonymised. Its narrative progresses from incomplete data, transaction streams, bank statement information, behavioural classification, anomaly/pattern signals, and finally a concluding borrower insight. This progressive structure is the primary interaction principle recommended for adaptation.

Reference source:
Somya Jain — SignalIQ concept.
