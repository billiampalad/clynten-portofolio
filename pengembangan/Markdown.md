# MASTER PROMPT

1. Role
Bertindaklah sebagai Senior Creative Frontend Engineer dan Specialist Browser Performance & Hardware-Accelerated Graphics (Ahli React, WebGL2 Shader Optimization, Tailwind CSS, dan Canvas-DOM Compositing). Prioritas utama Anda adalah mengintegrasikan komponen `GhostCursor` (berbasis WebGL2 GPGPU fluid/smoke simulation) ke dalam file `src/components/layout/Background/cursor.jsx`, memadukannya dengan aset pointer kustom `public/cursor-pointer.svg` dan mikro-animasi klik, serta mengoptimalkan alokasi memori buffer/shader agar animasi jejak asap (fluid trail) berjalan ultra-mulus (60fps–120fps) tanpa membebani GPU/CPU dan tidak merusak interaksi klik elemen website (`pointer-events: none`).

2. Task
Lakukan modifikasi dan penyempurnaan pada file `src/components/layout/Background/cursor.jsx` dengan mengintegrasikan kode shader `GhostCursor` yang sudah disediakan. Gabungkan simulasi jejak WebGL2 tersebut dengan kursor fisik SVG kustom (`cursor-pointer.svg`) yang bergerak sinkron mengikuti mouse dan merespons klik (scale down / ripple). Pastikan integrasi ini mencakup seluruh area layar portofolio (global fixed overlay), teroptimasi penuh untuk perangkat desktop tanpa lag, serta membersihkan event listener dan context WebGL2 dengan aman.

3. Context
- File Target Integrasi: `src/components/layout/Background/cursor.jsx`
- Kode Sumber Acuan (WebGL2 Shader & Sim Engine):
  [Gunakan implementasi lengkap GhostCursor yang memuat VERTEX, SIM, SHADE, DOWN, BLUR, dan COMPOSITE shader seperti yang telah dilampirkan]
- Aset Pointer Kustom: `public/cursor-pointer.svg` (harus muncul sebagai penunjuk utama tepat di titik koordinat pointer mouse dengan animasi mikro saat mouse ditekan/klik).
- Cakupan & Penempatan (Layout Scope):
  * Kursor dan efek fluid trail harus aktif secara global di seluruh halaman portofolio (`position: fixed`, `inset-0`, `pointer-events: none`, dengan `z-index` tinggi agar terlihat di atas background).
  * Kursor asli browser disembunyikan (`cursor: none`) ketika mouse berada di dalam area window.
- Konfigurasi Default Efek Visual (Styling & Cyberpunk/Dark Aesthetic):
  * Warna Fluid Asap: [Sesuaikan warna hex, misal: Cyan `#06b6d4`, Emerald `#10b981`, atau gradasi bawaan `#B497CF`]
  * Parameter Ghost: `size={70-80}`, `trailLength={40-50}`, `bloomStrength={0.5-0.6}`, `clickPuff={true}`.
  * Pointer SVG: Ukuran proporsional (~20px–28px) dengan transisi `transform` yang ringan saat klik (misal: `scale(0.85)` saat mousedown).
- Batasan Kinerja & Hardware (Anti-Lag):
  * Tracking koordinat SVG pointer TIDAK BOLEH menggunakan `useState` (karena akan memicu re-render React 60-120 kali per detik). Gunakan `useRef` dan direct DOM translation (`transform: translate3d(...)`) atau `requestAnimationFrame`.
  * DPR WebGL2 harus dibatasi (`maxDevicePixelRatio = 1.5` atau `2`) untuk mencegah bottleneck resolusi tinggi pada layar Retina/4K.
  * Komponen harus otomatis idle/pause jika tab diminimalkan atau mouse berhenti bergerak (`wake` and sleep loop sudah ada di kode dasar).

4. Reasoning
Komponen `GhostCursor` menggunakan simulasi fluida multi-pass WebGL2 yang sangat memukau, namun jika ditempatkan di dalam wrapper container lokal dengan tinggi statis (`height: 600`), ia tidak dapat berfungsi sebagai cursor global website. Selain itu, pengguna tetap membutuhkan titik bidik fisik yang presisi (ikon pointer kustom) agar navigasi dan klik tautan tidak membingungkan. Menggabungkan pointer SVG yang digerakkan via GPU hardware translation dengan kanvas WebGL2 di dalam satu file modular `cursor.jsx` menghadirkan pengalaman visual sinematik kelas atas tanpa menimbulkan frame drop di Main Thread.

5. Stop Conditions
Tugas dianggap selesai apabila:
- Kode lengkap untuk `src/components/layout/Background/cursor.jsx` disajikan secara utuh, siap disalin tanpa placeholder atau bagian yang terpotong.
- Kursor fisik SVG `cursor-pointer.svg` dan kanvas WebGL2 `GhostCursor` bekerja berdampingan secara presisi pada satu koordinat mouse yang sama.
- Pointer SVG memiliki animasi visual saat ditekan (`mousedown`) dan dilepas (`mouseup`).
- Seluruh overlay kursor memiliki `pointer-events: none` sehingga tidak ada tombol, tautan, atau form di halaman portofolio yang terhalang dari klik.
- Tracking pergerakan pointer terbukti bebas dari `useState` React re-render loop dan aman dari memory leak.

6. Output
Sajikan hasil dalam Bahasa Indonesia dengan format:
1. **Arsitektur Penggabungan WebGL2 & Custom Pointer SVG**: Penjelasan ringkas bagaimana koordinat mouse dibagi antara simulasi WebGL2 dan pergerakan SVG DOM tanpa overhead CPU.
2. **Kode Lengkap `cursor.jsx` (Siap Pakai)**: Blok kode komponen React utuh yang menyatukan shader WebGL2, container fixed full-screen, SVG pointer kustom, dan animasi klik.
3. **Konfigurasi CSS Global**: Baris CSS untuk menyembunyikan kursor default browser (`cursor: none`) pada body/elemen HTML.
4. **Panduan Penyetelan Props & Parameter Performa**: Tips cepat menyesuaikan warna aksen, intensitas bloom, dan batasan resolusi (targetPixels/DPR) untuk menjaga perangkat tetap dingin.