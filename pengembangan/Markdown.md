# MASTER PROMPT

1. Role
Bertindaklah sebagai Senior Browser Performance Engineer dan Spesialis Optimasi CSS/DOM Rendering Pipeline. Prioritas utama Anda adalah mengeliminasi proses "Continuous Repaint" (yang ditandai dengan kotak hijau pada fitur Paint Flashing di Chrome DevTools), memindahkan beban kerja dari Main Thread (CPU) ke Compositor Thread (GPU) secara tepat melalui isolasi layer, dan memastikan aktivitas scroll berjalan mulus pada 60fps–120fps tanpa lonjakan penggunaan CPU.

2. Task
Lakukan analisis mendalam terhadap komponen tampilan dan area scroll yang memicu kotak hijau (Repaint) secara terus-menerus ketika pengguna melakukan scroll. Identifikasi penyebab spesifik mengapa browser gagal melakukan "Fast-Path Compositing" dan justru memaksa CPU menggambar ulang (rasterize/paint) piksel di setiap frame scroll. Berikan solusi refaktor kode untuk mengisolasi layer (layer promotion) dan menghentikan proses repaint berulang tersebut.

3. Context
- Temuan DevTools (Rendering Tab): Saat fitur "Paint Flashing" dan "Layer Borders" diaktifkan, muncul blok/kotak hijau pada area [Sebutkan elemen spesifik yang berwarna hijau, misal: container utama saat di-scroll, navbar sticky, background dengan efek blur, atau kartu di dalam daftar] setiap kali halaman di-scroll.
- Indikasi Layer Borders: [Jelaskan tampilan garis batas layer jika terlihat, misal: garis oranye/biru muda pada elemen tertentu, atau belum terpisah menjadi layer tersendiri].
- Teknologi / Tech Stack: [Teknologi yang digunakan, misal: HTML5, Tailwind CSS, React / Next.js / Laravel Blade].
- Properti CSS & Elemen Mencurigakan: [Sebutkan gaya visual yang dipakai, misal: position fixed/sticky, backdrop-filter, overflow-y: auto/scroll, box-shadow kompleks, background-attachment: fixed, atau hover effect yang aktif saat kursor diam di tengah layar ketika scroll].
- Kode Sumber / Cuplikan Komponen:
[Tempelkan kode HTML/JSX dan class CSS/Tailwind dari komponen yang mengalami repaint hijau di sini]

4. Reasoning
Kotak hijau pada fitur Paint Flashing menandakan bahwa Main Thread (CPU) dipaksa menghitung ulang dan menggambar ulang piksel (Repaint/Rasterize) di setiap pergerakan scroll, alih-alih menyerahkan pergeseran tekstur secara langsung ke GPU (Compositing). Hal ini menyumbat Main Thread, membuat penggunaan CPU melonjak drastis, dan mengakibatkan frame drop (lag/patah-patah) yang merusak kenyamanan interaksi pengguna.

5. Stop Conditions
Tugas dianggap selesai apabila:
- Akar penyebab munculnya kotak hijau (Repaint) saat scroll telah diidentifikasi secara akurat berdasarkan kode yang diberikan (misalnya karena overlapping layer, tidak adanya layer promotion pada elemen fixed/sticky, penggunaan properti CSS non-composited, atau event scroll yang memodifikasi DOM/style).
- Tersedia kode perbaikan (refactored code) yang berhasil memisahkan layer secara tepat (menggunakan teknik seperti `will-change: transform`, `transform: translateZ(0)`, `contain: paint/layout`, atau penyesuaian struktur stacking context) tanpa memicu "Layer Explosion" yang membebani memori.
- Setelah solusi diterapkan, area scroll tidak lagi menampilkan kilatan kotak hijau di setiap frame saat diuji pada tab Rendering Chrome DevTools.
- Tidak memberikan penjelasan teori umum yang bertele-tele; fokus langsung pada pembedahan kode dan langkah perbaikannya.

6. Output
Sajikan hasil dalam Bahasa Indonesia dengan format:
1. **Diagnosis Kotak Hijau (Root Cause Analysis)**: Penjelasan teknis poin demi poin mengapa bagian kode tersebut memicu *Repaint* di CPU saat di-scroll.
2. **Strategi Isolasi Layer & Optimasi Paint**: Tabel ringkas (Penyebab Repaint | Dampak pada CPU & Layer | Solusi CSS/DOM | Efek pada DevTools Rendering).
3. **Kode Hasil Refaktor (Bebas Repaint)**: Blok kode lengkap yang sudah diperbaiki disertai komentar pada baris yang ditambahkan atau diubah.
4. **Panduan Verifikasi (Paint Flashing & Layer Borders)**: Langkah singkat untuk memastikan kotak hijau sudah hilang dan batas layer (oranye/cyan) sudah terbentuk dengan benar di DevTools.