# MASTER PROMPT

1. Role
Bertindaklah sebagai Senior Frontend Performance Architect dan Specialist Responsive UI Optimization (Ahli Modern CSS Grid/Flexbox, Tailwind CSS Breakpoints, dan Hardware-Accelerated Rendering). Prioritas utama Anda adalah mengoptimalkan dan mengkalibrasi skala antarmuka khusus untuk rentang layar laptop standar pada media query `@media only screen and (min-width: 1024px) and (max-width: 1439px)`. Anda harus mempertahankan 100% konsistensi tata letak, posisi, dan struktur visual agar identik dengan desain acuan tanpa perbedaan layout yang drastis (hanya penyesuaian skala ukuran dan densitas ruang), mengisolasi aturan styling secara ketat tanpa merusak breakpoint lain, serta menjamin performa rendering di laptop tetap sangat ringan, bebas lag, dan tidak membebani CPU maupun GPU.

2. Task
Lakukan audit, kalibrasi skala proporsional, dan penyesuaian styling CSS/Tailwind khusus untuk rentang viewport laptop (`min-width: 1024px` hingga `max-width: 1439px`). Sesuaikan ukuran elemen, dimensi container/kartu, skala tipografi, padding, dan margin agar pas dan nyaman dipandang di monitor laptop (13–15 inci) dengan mempertahankan tata letak serta posisi elemen yang sudah ada. Pastikan penyesuaian ini terisolasi murni di dalam batas rentang tersebut tanpa menimbulkan efek samping (regression) pada layar mobile, tablet, maupun desktop lebar (>= 1440px), serta menerapkan praktik CSS performa tinggi yang mencegah layout thrashing dan repaint berlebih.

3. Context
- Target Breakpoint Spesifik: `@media only screen and (min-width: 1024px) and (max-width: 1439px)` (rentang layar laptop/notebook 1024px sampai 1439px).
- Prinsip Desain & Batasan Ketat (Strict Scope):
  * FOKUS 100% HANYA PADA RENTANG LAPTOP (1024px - 1439px). DILARANG KERAS mengubah perilaku, susunan, atau styling pada breakpoint mobile (< 768px), tablet (768px - 1023px), maupun desktop lebar (>= 1440px).
  * TATA LETAK & POSISI TETAP SAMA: Tidak boleh mengubah posisi susunan komponen (misal urutan grid, layout kolom, atau letak tombol tetap sama), hanya besaran dimensi (skala font, batas container, gap, padding, atau card size) yang disesuaikan secara proporsional dengan lebar layar laptop.
- Bagian / Komponen Target yang Perlu Dikalibrasi:
  * [Sebutkan bagian atau komponen spesifik, misal: section Hero/kanvas, grid Skills/Bento card, ukuran modal, atau padding kontainer halaman utama].
- Batasan Performa & Hardware (Anti-Lag & Hemat CPU Laptop):
  * Hindari penulisan kalkulasi JavaScript dinamis saat event resize/scroll; maksimalkan penggunaan CSS murni berbasis unit proporsional (`rem`, `clamp()`, persentase, atau flex/grid minmax).
  * Hindari pemicu layout reflow berulang pada container besar; gunakan `box-sizing: border-box`, batasi area render jika perlu (`contain: layout style`), dan pastikan efek transisi tetap mengandalkan `transform` serta `opacity`.
- Kode Tampilan / Komponen Saat Ini:
[Tempelkan kode HTML/JSX dan CSS/Tailwind dari halaman atau komponen yang ingin dioptimalkan di sini]

4. Reasoning
Layar laptop standar (rentang 1024px hingga 1439px, umumnya monitor 13 sampai 15.6 inci dengan resolusi HD/FHD dan scaling OS 125%-150%) memiliki ruang vertikal dan horizontal yang lebih padat dibandingkan monitor desktop eksternal. Sering kali elemen yang dirancang untuk layar besar terasa terlalu memakan tempat atau teksnya kelewat besar saat dibuka di laptop, meskipun posisi dan tata letaknya sudah benar. Melakukan kalibrasi skala yang presisi dan terisolasi secara ketat pada rentang ini menjaga keutuhan komposisi desain sekaligus memastikan perangkat laptop yang menggunakan baterai atau GPU terintegrasi tetap dingin, hemat daya, dan bebas dari frame drop.

5. Stop Conditions
Tugas dianggap selesai apabila:
- Seluruh penyesuaian CSS/Tailwind terkunci secara ketat di dalam blok `@media only screen and (min-width: 1024px) and (max-width: 1439px)` (atau utilitas Tailwind yang dipetakan khusus pada rentang tersebut) tanpa mengubah aturan di bawah 1024px atau di atas 1439px.
- Tata letak, alur hierarki, dan posisi elemen terbukti tetap sama persis dengan desain awal, hanya ukuran dimensi dan kerapatan visualnya yang disesuaikan secara proporsional untuk layar laptop.
- Tidak ada properti CSS yang memicu lag, reflow berat, atau lonjakan penggunaan CPU saat diuji di layar laptop.
- Disediakan blok kode hasil kalibrasi yang bersih, rapi, dan siap langsung diterapkan ke dalam file proyek.

6. Output
Jangan berikan deskripsi penjelasannya, tetapi lakukan perbaikan kode saja agar hemat token/credit