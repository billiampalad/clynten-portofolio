# MASTER PROMPT

1. Role
Bertindaklah sebagai Senior Creative Frontend Engineer dan UI Component Specialist (Ahli React, Tailwind CSS, Shadcn UI / React Bits, Canvas WebGL/2D, dan Optimasi Performa Rendering). Prioritas utama Anda adalah mengintegrasikan serta mengkustomisasi komponen `GhostCursor` dari paket `@react-bits/GhostCursor-JS-TW` ke dalam file kursor kustom proyek portofolio, memadukannya dengan aset pointer kustom tanpa merusak interaksi klik native (`pointer-events`), serta memastikan seluruh efek animasi jejak (ghost/trail effect) berjalan sangat halus (60fps–120fps) dan ultra-ringan di CPU maupun GPU.

2. Task
Lakukan audit, integrasi, dan adaptasi komponen animasi kursor menggunakan pustaka `GhostCursor` (yang diinstal melalui CLI `npx shadcn@latest add @react-bits/GhostCursor-JS-TW`) ke dalam proyek portofolio. Sesuaikan implementasi komponen tersebut pada `src/components/layout/Background/cursor.jsx` (atau file wrapper terkait) agar selaras dengan estetika portofolio dan ikon pointer kustom (`public/cursor-pointer.svg`), memperbaiki masalah lag/patah-patah dari implementasi sebelumnya, serta menjaga penggunaan resource perangkat keras tetap minimal.

3. Context
- Paket / Komponen Acuan: `@react-bits/GhostCursor-JS-TW` (diinstal via perintah CLI: `npx shadcn@latest add @react-bits/GhostCursor-JS-TW`).
- File Target Integrasi: `src/components/layout/Background/cursor.jsx`
- Aset Pointer Kustom: `public/cursor-pointer.svg` (harus tetap berfungsi sebagai titik bidik/pointer utama yang akurat).
- Estetika & Skema Warna Portofolio: [Sebutkan palet warna yang diinginkan untuk efek ghost/trail, misal: tema dark dengan jejak warna cyan #06b6d4, emerald #10b981, atau gradasi cyberpunk semi-transparan].
- Karakteristik Interaksi & Efek:
  * Animasi Jejak (Ghost Trail): Efek visual ekor/bayangan yang mengikuti pergerakan mouse secara elastis dan memudar halus.
  * Interaksi Klik: Mikro-reaksi saat kursor ditekan/klik (mousedown) dan dilepas (mouseup).
  * Safe Layering: Wajib memiliki `pointer-events: none` dan `z-index` yang tepat agar tidak menghalangi klik pada tombol, link, dan elemen interaktif lainnya di website.
- Batasan Kinerja (Anti-Lag):
  * Pastikan rendering jejak ghost (baik berbasis Canvas 2D / WebGL maupun requestAnimationFrame) tidak memicu re-render pada React state tree.
  * Event listener `mousemove` dan render loop harus memiliki cleanup function yang bersih saat komponen unmount agar tidak terjadi memory leak.
- Kode `cursor.jsx` atau File Hasil Install Saat Ini:
[Tempelkan kode cursor.jsx yang ingin diperbaiki atau kode hasil generate dari command shadcn di sini]

4. Reasoning
Komponen visual kursor interaktif seperti `GhostCursor` sering kali membawa loop animasi berbasis canvas atau simulasi partikel berkelanjutan. Jika dipasang langsung tanpa kalibrasi yang tepat dengan struktur layout React atau dipadukan secara keliru dengan pointer SVG custom, hal tersebut dapat memicu overdraw, penumpukan canvas context, atau lag akibat frame drop di Main Thread. Integrasi yang terencana dengan baik menjamin keindahan efek visual "ghost" tetap maksimal sementara konsumsi CPU dan GPU tetap dingin dan stabil.

5. Stop Conditions
Tugas dianggap selesai apabila:
- Komponen `GhostCursor` berhasil diadaptasi dan diintegrasikan secara rapi ke dalam file `cursor.jsx` bersama aset `cursor-pointer.svg`.
- Seluruh animasi jejak (trail) dan respons klik berjalan mulus (buttery-smooth) tanpa jeda latensi, stuttering, atau frame drop.
- Terdapat penanganan akurat pada titik koordinat pointer (origin hotspot) sehingga ujung pointer SVG tepat sasaran pada elemen yang diklik.
- Semua elemen interaktif pada halaman tetap dapat diklik secara normal tanpa terhalang layer kursor (`pointer-events: none`).
- Kode disajikan secara utuh, bersih dari dependensi yang tidak perlu, dan siap digunakan langsung.

6. Output
Sajikan hasil dalam Bahasa Indonesia dengan format:
1. **Langkah Instalasi & Setup Modul**: Perintah terminal yang perlu dijalankan dan penempatan file hasil generate `@react-bits/GhostCursor-JS-TW`.
2. **Kode Refaktor Lengkap `cursor.jsx`**: Blok kode komponen React utuh yang menggabungkan logika GhostCursor, penanganan SVG pointer, dan optimasi performa.
3. **Panduan Konfigurasi Props & Estetika**: Penjelasan parameter/props yang dapat diatur (seperti ukuran jejak, durasi fade, elastisitas/damping, dan warna trail).
4. **Validasi Performa & Troubleshooting**: Tips singkat memastikan animasi kursor tidak memicu lag pada layar dengan refresh rate tinggi (90Hz/120Hz/144Hz) serta cara cek di browser DevTools.