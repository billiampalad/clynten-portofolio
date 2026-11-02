# MASTER PROMPT

1. Role
Bertindaklah sebagai Principal Frontend Architect dan Senior Browser Rendering Performance Engineer (Spesialis React/Next.js, GSAP ScrollTrigger, & HTML5 Canvas 2D Optimization). Prioritas utama Anda adalah merombak kode monolitik menjadi arsitektur modular yang bersih (Clean Architecture & Separation of Concerns), memisahkan logika kalkulasi animasi dari siklus re-render React, serta meminimalkan beban kerja CPU (Main Thread) dan GPU (Compositor/VRAM) agar animasi berjalan stabil di 60fps–120fps dengan prinsip Zero Visual & Functional Regression (tidak mengubah desain, alur animasi, maupun fitur sepeser pun).

2. Task
Rancang struktur modular di dalam folder `Hero/` dan lakukan refaktor terhadap kode komponen Hero saat ini menjadi file-file kecil yang terorganisir, mudah dipahami, dan berkinerja tinggi. Anda harus memisahkan 4 Layer Arsitektur Visual (Backdrop About, Canvas 145 Frame, CodeRain & PixelGrid, serta HUD Telemetry) beserta logika GSAP ScrollTrigger dan Preloader ke dalam modul/sub-komponen dan custom hooks yang terisolasi. Selain itu, berikan strategi optimasi spesifik pada level sub-komponen (seperti penanganan filter blur dinamis, isolasi layer GPU, dan pencegahan re-render React saat scroll) agar perangkat tidak panas dan bebas lag.

3. Context
- Tema & Arsitektur Visual (WAJIB DIPERTAHANKAN 100%):
  * Tema Cinematic Dark Cyberpunk / Brutalist Luxury (#0A0907 & #000000) dengan aksen warna status dinamis seiring scroll (Merah #f43f5e, Biru #06b6d4, Hijau Emerald #10b981).
  * Stacking 4 Layer:
    - Layer 0 (Backdrop): Section About yang fade-in (opacity 0.0 -> 1.0) dan aktivasi interaksi otomatis saat terlihat penuh.
    - Layer 1 (Canvas Frame): Kanvas 2D interaktif pemutar 145 frame WebP (DPR dibatasi maks 1.5, guard clause frame yang sama).
    - Layer 2 & 3 (Matrix & Scanline): Efek CodeRain dan garis monitor CRT (PixelGrid).
    - Layer 4–8 (HUD Telemetry): Antarmuka radar militer/sci-fi (retikel target, indikator ECG, widget radar berputar, node anatomi tubuh).
- Alur Interaksi & Fitur Utama (WAJIB DIPERTAHANKAN 100%):
  * Preloader (`HeroRadarLoader`): Preload & decode asynchronous 145 frame WebP ke memori sebelum animasi mulai.
  * GSAP ScrollTrigger Pinning: Tinggi 350vh, sticky 100vh.
  * Efek Lensa Kamera (Progres 0.00 -> 0.65): Transisi dari blur (8px) & gelap menuju fokus tajam & terang.
  * Multi-Stage Morphing Card (Progres > 0.81):
    - Tahap 1 (100% -> 75%): Membentuk sudut melengkung halus (border-radius).
    - Tahap 2 (75% -> 45%): Mengecil menjadi floating card kokoh dan terang.
    - Tahap 3 (45% -> 25%): Menjadi compact mini card dan meredup halus.
    - Tahap 4 (25% -> 10%): Pinpoint dissolve, memberi jalan ke section About.
  * Sinkronisasi Navbar (`--navbar-reveal`): Tersembunyi selama pemindaian, muncul tepat saat kanvas mencapai 0% (progres >= 0.95).
- Tech Stack Saat Ini: [Sebutkan detail versi/framework, misal: React 18 / Next.js App Router, TypeScript/JavaScript, Tailwind CSS, GSAP]
- Kode Sumber Hero Saat Ini:
[Tempelkan kode lengkap file Hero Anda saat ini di sini, atau kosongkan jika ingin melihat cetak biru arsitektur filenya terlebih dahulu]

4. Reasoning
Menumpuk logika preloader 145 frame, kalkulasi GSAP ScrollTrigger, manipulasi Canvas 2D, efek Matrix/CRT, dan berbagai elemen HUD Telemetry di dalam satu file besar membuat kode sulit dipelihara (sulit dibaca dan di-debug). Lebih parah lagi, penyatuan state atau ref yang tidak terisolasi memicu re-render berantai dan "Continuous Repaint" (kotak hijau di DevTools), terutama saat memproses perubahan filter blur (0.00 -> 0.65) dan morphing ukuran kartu (> 0.81) di atas layer CodeRain dan HUD. Pemecahan file secara modular memungkinkan tiap layer diisolasi ke dalam compositing layer GPU masing-masing dan diperbarui langsung via DOM ref/GSAP tanpa membebani siklus render React.

5. Stop Conditions
Tugas dianggap selesai apabila:
- Tersedia cetak biru pohon direktori (file tree) folder `Hero/` yang memisahkan komponen UI, custom hooks/engine, konfigurasi konstanta (timeline thresholds & warna), dan utilitas dengan tanggung jawab tunggal (Single Responsibility Principle).
- Setiap file yang diusulkan memiliki batasan tanggung jawab yang jelas serta strategi pencegahan beban GPU/CPU (khususnya solusi teknis agar efek blur 8px->0px, CodeRain, dan morphing border-radius/scale tidak memicu repaint berat saat scroll).
- Seluruh fitur, angka threshold progres (0.65, 0.81, 0.95), warna, dan transisi visual tetap 100% identik dengan spesifikasi di bagian Context tanpa ada pengurangan fitur.
- Kode dibagi menjadi modul-modul ringkas yang siap salin dan mudah dipahami.

6. Output
Sajikan hasil dalam Bahasa Indonesia dengan format:
1. **Arsitektur Direktori Folder `Hero/`**: Visualisasi pohon file (`Hero/index.tsx`, sub-komponen layer, hooks, dan constants) beserta penjelasan singkat fungsi tiap file.
2. **Strategi Optimasi GPU & CPU per Modul**: Tabel pemetaan (Nama File/Layer | Potensi Beban GPU/CPU Saat Scroll | Teknik Isolasi & Optimasi Kode).
3. **Implementasi Kode Modular**: Blok kode terpisah untuk masing-masing file di dalam folder `Hero/` yang sudah direfaktor, bersih, menggunakan `React.memo` / direct DOM manipulation via refs, dan siap diintegrasikan.
4. **Panduan Integrasi & Validasi Performa**: Langkah singkat cara menghubungkan file-file tersebut dan memvalidasi bahwa tidak ada *regression* visual maupun *repaint* berlebih di DevTools.