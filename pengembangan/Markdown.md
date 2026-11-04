# MASTER PROMPT

1. Role
Bertindaklah sebagai Senior Creative Frontend Engineer dan Browser Rendering & Animation Specialist (Ahli Web Animation API, CSS Transitions/Keyframes, GSAP, & GPU Compositing). Prioritas utama Anda adalah mengeliminasi jank, frame drop, dan micro-stuttering pada animasi teks, mengalihkan seluruh proses interpolasi visual ke Compositor Thread (GPU-accelerated), serta menghasilkan animasi blok teks yang mengalir sangat mulus (buttery smooth 60fps–120fps) tanpa membebani CPU Main Thread.

2. Task
Lakukan audit performa mendalam dan perbaiki kode animasi pada elemen/blok teks bertuliskan **“continuously learning, building, and growing through technology”** yang saat ini masih patah-patah dan lag. Identifikasi penyebab teknis ketidakhalusan tersebut (seperti pemicu layout reflow/repaint terus-menerus, animating non-composited properties, konflik frame timing, atau re-render loop di JavaScript/React) dan berikan kode hasil refaktor yang siap pakai dengan transisi ultra-halus.

3. Context
- Teks Target Animasi: **“continuously learning, building, and growing through technology”**
- Jenis/Efek Animasi yang Dijalankan: [Sebutkan jenis animasi, misal: running text / marquee horizontal loop, typewriter effect, text scramble/decrypt, fade-in staggered per kata/huruf, atau reveal text dengan sliding clip-path/background block]
- Library / Teknologi Penggerak: [Sebutkan yang digunakan, misal: CSS @keyframes murni, Tailwind CSS animation classes, GSAP / ScrollTrigger, Framer Motion, atau requestAnimationFrame / setInterval di JavaScript]
- Properti CSS yang Saat Ini Di-animasikan: [Sebutkan properti yang diubah dalam animasi, misal: width/max-width, left/margin-left, clip-path, opacity, transform: translateX(), atau filter: blur()]
- Kode Sumber Animasi Saat Ini:
[Tempelkan kode HTML/JSX, CSS/Tailwind, dan JavaScript/animasi dari blok teks tersebut di sini]

4. Reasoning
Animasi teks sering kali mengalami lag dan patah-patah karena menganimasikan properti geometri yang memicu siklus Layout (Reflow) atau Repaint di setiap frame (seperti `width`, `left`, `margin`, atau `clip-path` tanpa layer promotion). Setiap kali nilai tersebut berubah, browser terpaksa menghitung ulang tata letak dokumen di Main Thread CPU, merusak batas anggaran frame (frame budget 16.6ms). Mengubah mekanisme animasi ke properti yang ramah GPU Compositor (`transform: translate3d/translate`, `opacity`) serta menerapkan akselerasi hardware yang tepat adalah satu-satunya cara memastikan teks bergerak dengan kehalusan sub-pixel yang konsisten di berbagai perangkat.

5. Stop Conditions
Tugas dianggap selesai apabila:
- Akar masalah penyebab lag dan animasi teks patah-patah teridentifikasi secara presisi berdasarkan properti dan loop animasi yang digunakan.
- Tersedia kode perbaikan (refactored code) yang sepenuhnya beralih ke properti terakselerasi GPU (`transform`, `opacity`) dengan pemanfaatan `will-change` secara tepat (tanpa layer leak).
- Jika menggunakan JavaScript/GSAP, tidak ada mutasi layout sinkron, timer interval yang tidak presisi (`setInterval`/`setTimeout`), atau state re-render yang memotong siklus animasi.
- Efek visual teks tetap sesuai konsep awal, namun pergerakannya terbukti berjalan stabil di 60fps–120fps tanpa lonjakan CPU.

6. Output
Sajikan hasil dalam Bahasa Indonesia dengan format:
1. **Diagnosis Bottleneck Animasi**: Analisis teknis singkat mengapa kode saat ini memicu stutter/lag pada rendering browser.
2. **Strategi GPU Compositing**: Penjelasan solusi (properti mana yang diganti dan teknik apa yang digunakan untuk mengunci 60fps/120fps).
3. **Kode Hasil Refaktor (Ultra-Smooth)**: Blok kode lengkap (HTML/JSX, CSS/Tailwind, atau JS/GSAP) yang sudah dioptimasi, bebas lag, dan siap langsung disalin.
4. **Tips Kalibrasi Kehalusan**: Panduan singkat (1-3 poin) mengenai pengaturan durasi, easing curve (seperti cubic-bezier yang tepat), atau sinkronisasi refresh rate layar.