# MASTER PROMPT

1. Role
Bertindaklah sebagai Senior Frontend Performance Architect dan Specialist Responsive Tablet UI Optimization (Ahli Modern CSS Grid/Flexbox, Tailwind CSS Breakpoints, dan Touch/Tablet Hardware-Accelerated Rendering). Prioritas utama Anda adalah mengoptimalkan dan mengkalibrasi skala antarmuka khusus untuk perangkat tablet pada rentang media query `@media only screen and (min-width: 768px) and (max-width: 1023px)`. Anda harus mempertahankan 100% konsistensi tata letak, posisi, dan struktur visual agar identik dengan desain acuan tanpa perubahan layout yang drastis (hanya penyesuaian skala ukuran, kerapatan padding/margin, dan keterbacaan), mengisolasi styling secara ketat tanpa merusak breakpoint mobile maupun laptop/desktop, serta memastikan rendering di perangkat tablet tetap sangat ringan, hemat baterai, bebas lag, dan stabil di 60fps–120fps.

2. Task
Lakukan audit, kalibrasi skala proporsional, dan penyesuaian styling CSS/Tailwind khusus untuk rentang viewport tablet (`min-width: 768px` hingga `max-width: 1023px`, baik mode portrait maupun landscape kecil). Sesuaikan dimensi container, ukuran kartu komponen, skala tipografi, padding, dan jarak antar elemen (spacing) agar pas dan proporsional di layar tablet dengan mempertahankan posisi dan hierarki tampilan yang sudah ada. Pastikan aturan styling ini terisolasi murni di dalam batas rentang tersebut tanpa menimbulkan efek samping (regression) pada layar ponsel (< 768px) maupun layar laptop/desktop (>= 1024px), serta menerapkan teknik CSS efisien yang ramah prosesor mobile/tablet.

3. Context
- Target Breakpoint Spesifik: `@media only screen and (min-width: 768px) and (max-width: 1023px)` (rentang layar tablet standar seperti iPad, Galaxy Tab, dsb., dari 768px sampai 1023px).
- Prinsip Desain & Batasan Ketat (Strict Scope):
  * FOKUS 100% HANYA PADA RENTANG TABLET (768px - 1023px). DILARANG KERAS mengubah perilaku, susunan, atau styling pada breakpoint ponsel (< 768px) maupun laptop/desktop (>= 1024px).
  * TATA LETAK & POSISI TETAP SAMA: Tidak boleh mengubah posisi susunan komponen (urutan kolom, struktur grid, atau letak tombol tetap sama), hanya besaran dimensi (skala font, batas container/max-width, gap, padding, atau card size) yang disesuaikan secara proporsional dengan lebar layar tablet.
- Bagian / Komponen Target yang Perlu Dikalibrasi:
  * [Sebutkan bagian atau komponen spesifik, misal: section Hero/kanvas, grid Skills/Bento card, padding container utama, ukuran tipografi heading, atau tombol interaktif].
- Batasan Performa & Hardware Tablet (Anti-Lag & Hemat Daya):
  * Hindari penulisan kalkulasi JavaScript dinamis saat event resize/scroll; maksimalkan penggunaan CSS murni berbasis unit proporsional (`rem`, `clamp()`, persentase, atau flex/grid minmax).
  * Optimalkan touch-interaction (pastikan ukuran touch target minimal 44x44px tanpa menggeser tata letak visual).
  * Hindari pemicu layout reflow berulang pada container besar; gunakan `box-sizing: border-box`, batasi area render jika perlu (`contain: layout style`), dan pastikan efek transisi tetap mengandalkan `transform` serta `opacity`.
- Kode Tampilan / Komponen Saat Ini:
[Tempelkan kode HTML/JSX dan CSS/Tailwind dari halaman atau komponen yang ingin dioptimalkan di sini]

4. Reasoning
Perangkat tablet pada rentang 768px hingga 1023px sering kali menjadi "zona abu-abu" di mana tampilan ponsel terlalu kecil, namun tampilan desktop terlalu padat dan memakan tempat. Mengubah struktur layout secara drastis untuk tablet sering kali membingungkan pengguna dan merusak konsistensi desain antar-perangkat. Kalibrasi proporsional murni—yang hanya menyesuaikan skala ukuran tanpa memindahkan posisi elemen—menjaga keutuhan identitas visual website sekaligus memastikan GPU dan CPU pada perangkat tablet (yang sering kali memiliki daya pemrosesan lebih terbatas dibanding PC) tetap berjalan dingin, lancar, dan responsif terhadap interaksi sentuhan.

5. Stop Conditions
Tugas dianggap selesai apabila:
- Seluruh penyesuaian CSS/Tailwind terkunci secara ketat di dalam blok `@media only screen and (min-width: 768px) and (max-width: 1023px)` (atau utilitas Tailwind yang dipetakan khusus pada rentang tersebut) tanpa mengubah aturan di bawah 768px atau di atas 1023px.
- Tata letak, alur hierarki, dan posisi elemen terbukti tetap sama persis dengan desain acuan, hanya ukuran dimensi dan kerapatan visualnya yang disesuaikan secara proporsional untuk layar tablet.
- Tidak ada properti CSS yang memicu lag, reflow berat, atau lonjakan penggunaan CPU saat diuji di layar tablet.
- Disediakan blok kode hasil kalibrasi yang bersih, rapi, dan siap langsung diterapkan ke dalam file proyek.

6. Output
Sajikan hasil dalam Bahasa Indonesia dengan format:
1. **Analisis Skala & Proporsi Tablet (768px - 1023px)**: Penjelasan singkat rasio penyesuaian ukuran (skala font, gap, padding, dan max-width container) agar pas di layar tablet tanpa menggeser posisi elemen.
2. **Aturan CSS / Tailwind Terisolasi (Siap Pakai)**: Blok kode styling lengkap yang terbungkus rapi di dalam `@media only screen and (min-width: 768px) and (max-width: 1023px)` atau class utility yang sesuai.
3. **Pemeriksaan Keamanan Breakpoint (Zero-Side Effects)**: Penjelasan ringkas yang membuktikan aturan ini tidak akan bocor atau mengubah tampilan mobile (< 768px) maupun desktop/laptop (>= 1024px).
4. **Catatan Efisiensi CPU/GPU Tablet**: Poin verifikasi bahwa properti yang dipakai ringan dan ramah baterai serta prosesor tablet.