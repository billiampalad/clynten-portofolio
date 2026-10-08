# Project Structure Plan — Clynten Portfolio

## 1. Tujuan

Dokumen ini menjadi standar struktur folder untuk website portfolio personal agar mudah dikembangkan, dipelihara, dicari filenya, dan siap production.

Stack utama:
- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- GSAP / ScrollTrigger untuk animasi kompleks
- Framer Motion untuk micro-interactions
- Lenis untuk smooth scrolling

## 2. Prinsip Arsitektur

```text
Route
  ↓
Page / Section
  ↓
Component
  ↓
UI
  ↓
Utility / Library
```

Data portfolio dipisahkan:

```text
content/
  ↓
projects / experience / skills / profile
```

Asset dipisahkan:

```text
public/
  ↓
images / videos / icons / fonts
```

## 3. Recommended Project Tree

```text
clynten-portfolio/
├── public/
│   ├── images/
│   │   ├── profile/
│   │   ├── projects/
│   │   │   ├── smart-cctv/
│   │   │   ├── fuzzy-ahp/
│   │   │   └── networking/
│   │   ├── certificates/
│   │   └── og/
│   ├── videos/
│   │   ├── projects/
│   │   └── hero/
│   ├── icons/
│   │   ├── tech/
│   │   ├── social/
│   │   └── ui/
│   ├── fonts/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── about/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── certificates/page.tsx
│   │   └── contact/page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── sections/
│   │   │   ├── Hero/
│   │   │   ├── About/
│   │   │   ├── Skills/
│   │   │   ├── Projects/
│   │   │   ├── Experience/
│   │   │   ├── Certificates/
│   │   │   └── Contact/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── SectionTitle.tsx
│   │   │   ├── MagneticButton.tsx
│   │   │   └── ImageReveal.tsx
│   │   ├── motion/
│   │   │   ├── FadeIn.tsx
│   │   │   ├── Reveal.tsx
│   │   │   ├── Stagger.tsx
│   │   │   ├── TextReveal.tsx
│   │   │   ├── PageTransition.tsx
│   │   │   ├── ImageReveal.tsx
│   │   │   └── Parallax.tsx
│   │   ├── effects/
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── TextScramble.tsx
│   │   │   ├── Marquee.tsx
│   │   │   ├── NoiseOverlay.tsx
│   │   │   ├── GridBackground.tsx
│   │   │   └── ScrollProgress.tsx
│   │   └── project/
│   │       ├── ProjectHero.tsx
│   │       ├── ProjectGallery.tsx
│   │       ├── ProjectOverview.tsx
│   │       ├── ProjectTechStack.tsx
│   │       ├── ProjectArchitecture.tsx
│   │       ├── ProjectResults.tsx
│   │       └── ProjectLinks.tsx
│   │
│   ├── content/
│   │   ├── profile.ts
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   ├── certificates.ts
│   │   └── projects/
│   │       ├── smart-cctv.ts
│   │       ├── fuzzy-ahp.ts
│   │       ├── networking.ts
│   │       └── index.ts
│   │
│   ├── lib/
│   │   ├── animations/
│   │   │   ├── gsap.ts
│   │   │   ├── scrollTrigger.ts
│   │   │   └── animationConfig.ts
│   │   ├── utils/
│   │   │   ├── cn.ts
│   │   │   ├── formatDate.ts
│   │   │   └── slugify.ts
│   │   └── constants/
│   │       ├── routes.ts
│   │       ├── navigation.ts
│   │       └── social.ts
│   │
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   ├── useIsMobile.ts
│   │   ├── useScrollProgress.ts
│   │   ├── useReducedMotion.ts
│   │   └── useLenis.ts
│   │
│   ├── types/
│   │   ├── project.ts
│   │   ├── experience.ts
│   │   ├── skill.ts
│   │   └── navigation.ts
│   │
│   └── styles/
│       ├── globals.css
│       ├── animations.css
│       └── typography.css
│
├── .env.local
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── README.md
└── plan.md
```

## 4. Tanggung Jawab Folder

### `public/`
File statis yang langsung dapat diakses browser: gambar, video, icon, font, favicon.

### `src/app/`
Routing dan page composition. `page.tsx` sebaiknya tidak berisi seluruh UI.

### `src/components/`
Pusat UI. Pisahkan menjadi `layout`, `sections`, `ui`, `motion`, `effects`, dan `project`.

### `src/content/`
Semua data portfolio: profil, skills, pengalaman, sertifikat, dan project. Dengan begitu UI tidak perlu diubah saat isi project berubah.

### `src/lib/`
Utility, constants, dan konfigurasi library seperti GSAP.

### `src/hooks/`
Reusable React behavior seperti media query, scroll progress, reduced motion, dan Lenis.

### `src/types/`
TypeScript contracts agar struktur data konsisten.

### `src/styles/`
Global CSS, typography, dan keyframes/animation CSS khusus.

## 5. Aturan `app/`

`app/` adalah routing layer.

```text
src/app/projects/page.tsx
→ /projects

src/app/projects/[slug]/page.tsx
→ /projects/smart-cctv
→ /projects/fuzzy-ahp
→ /projects/networking
```

Page hanya mengatur route dan composition.

Contoh:

```tsx
import { Hero } from "@/components/sections/Hero/Hero";
import { About } from "@/components/sections/About/About";
import { Skills } from "@/components/sections/Skills/Skills";
import { FeaturedProjects } from "@/components/sections/Projects/FeaturedProjects";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
    </>
  );
}
```

## 6. Aturan Component

### `components/layout`
Komponen global seperti Header, Footer, Navigation, MobileMenu.

### `components/sections`
Section utama halaman. Setiap section boleh memiliki subcomponent sendiri.

### `components/ui`
Komponen generic yang tidak mengetahui project tertentu.

### `components/motion`
Reusable animation wrapper seperti FadeIn, Reveal, TextReveal, Parallax, dan PageTransition.

### `components/effects`
Efek visual seperti CustomCursor, TextScramble, Marquee, NoiseOverlay, GridBackground, dan ScrollProgress.

### `components/project`
Komponen khusus case-study/detail project.

## 7. Data Project

Setiap project memiliki file sendiri:

```text
content/projects/
├── smart-cctv.ts
├── fuzzy-ahp.ts
├── networking.ts
└── index.ts
```

Contoh:

```ts
export const smartCctv = {
  slug: "smart-cctv",
  title: "Smart CCTV",
  description: "...",
  technologies: ["Python", "YOLOv8", "Streamlit"],
};
```

## 8. Animation Architecture

Animation reusable berada di:

```text
components/motion/
```

Konfigurasi/helper GSAP berada di:

```text
lib/animations/
```

Contoh:

```text
components/motion/Reveal.tsx
lib/animations/gsap.ts
lib/animations/scrollTrigger.ts
```

Jangan menaruh seluruh animation logic di `page.tsx`.

## 9. Naming Convention

Gunakan PascalCase untuk React component:

```text
ProjectCard.tsx
ContactForm.tsx
CustomCursor.tsx
```

Gunakan kebab-case untuk asset:

```text
smart-cctv-cover.webp
smart-cctv-dashboard.webp
hero-background.mp4
```

Hindari:

```text
IMG_9283.PNG
Screenshot 2026.png
final-final-benar.png
```

## 10. Import Alias

Gunakan:

```tsx
import { Button } from "@/components/ui/Button";
import { Hero } from "@/components/sections/Hero/Hero";
import { projects } from "@/content/projects";
```

Hindari relative path panjang seperti:

```tsx
../../../../components/ui/Button
```

## 11. Separation of Concerns

```text
PAGE
↓
SECTION
↓
COMPONENT
↓
UI
↓
UTILITY
```

Data:

```text
CONTENT
```

Animation:

```text
MOTION / EFFECTS
```

Asset:

```text
PUBLIC
```

## 12. Project Detail Architecture

`src/app/projects/[slug]/page.tsx` hanya mengambil project berdasarkan slug lalu merender:

```tsx
<ProjectHero project={project} />
<ProjectOverview project={project} />
<ProjectTechStack technologies={project.technologies} />
<ProjectArchitecture project={project} />
<ProjectGallery images={project.images} />
<ProjectResults project={project} />
<ProjectLinks project={project} />
```

## 13. Accessibility

Gunakan:

```text
hooks/useReducedMotion.ts
```

untuk mendeteksi `prefers-reduced-motion`.

Jika user meminta reduced motion:
- kurangi/disable parallax,
- disable text scramble,
- disable custom cursor animation,
- kurangi page transition,
- kurangi scroll animation,
- semua konten tetap tersedia.

## 14. Responsive

Jangan membuat:

```text
desktop/
mobile/
```

Gunakan responsive CSS dan hook jika animation perlu dibedakan.

Animation berat dapat disederhanakan pada mobile.

## 15. Environment

Gunakan:

```text
.env.local
.env.example
```

Contoh `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GITHUB_URL=
NEXT_PUBLIC_LINKEDIN_URL=
```

Jangan commit `.env.local`.

## 16. Git Convention

Gunakan commit berdasarkan pekerjaan:

```text
feat: create hero section
feat: add project cards
feat: implement scroll reveal
feat: add project detail page
fix: mobile navigation
perf: optimize project videos
style: improve typography
docs: update project documentation
```

Hindari commit seperti:

```text
update
fix
final
final2
final-benar
```

## 17. Urutan Development

```text
01  Project setup
02  Global layout
03  Typography + colors
04  Navigation
05  Hero
06  About
07  Skills
08  Projects
09  Project detail
10  Experience
11  Certificates
12  Contact
13  Motion system
14  Advanced effects
15  Responsive
16  Accessibility
17  Performance
18  SEO
19  Deployment
```

## 18. Architecture Rules

```text
app/         = routing
components/  = UI
content/     = portfolio data
lib/         = helper/configuration
hooks/       = reusable React behavior
types/       = TypeScript contracts
public/      = static assets
styles/      = global styling
```

## 19. Anti-Pattern

Jangan membuat:

```text
src/components/Everything.tsx
```

atau mencampur semua data, UI, animation, dan utility dalam satu file.

Jangan membuat folder asset tanpa kategori.

Jangan membuat nama file ambigu seperti `data.ts`, `utils2.ts`, atau `final.tsx` jika tanggung jawabnya dapat dibuat spesifik.

## 20. Scalability

Struktur ini sengaja dibuat sedikit lebih besar daripada portfolio sederhana agar dapat berkembang dari:

```text
5 projects
```

menjadi:

```text
10–20+ projects
```

serta dari animation sederhana menjadi:

```text
GSAP + ScrollTrigger
video
interactive diagrams
advanced page transitions
3D
```

tanpa refactor besar.

## 21. Decision Rule

Sebelum membuat file baru:

```text
Apakah ini route?
→ app/

Apakah ini UI?
→ components/

Apakah ini data?
→ content/

Apakah ini animation?
→ components/motion atau effects/

Apakah ini reusable logic?
→ hooks/

Apakah ini helper/config?
→ lib/

Apakah ini TypeScript type?
→ types/

Apakah ini image/video/icon?
→ public/

Apakah ini global styling?
→ styles/
```

## 22. Final Objective

Target arsitektur:

```text
Clean
Scalable
Maintainable
Reusable
Type-safe
Animation-ready
Responsive
Accessible
SEO-ready
Production-ready
```

Struktur ini menjadi **single source of truth organisasi file portfolio Clynten** selama proses development.
