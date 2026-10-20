# PROMPT IMPLEMENTASI — INFINITE DEEP SPACE TUNNEL 2.0
## Cinematic Realism · Three.js + GSAP · Soft Emergence

### 1. Tujuan Utama

Kembangkan animasi transisi scroll sinematik pada website portfolio React saya dengan konsep **Infinite Deep Space Tunnel 2.0**.

Transisi harus memberikan kesan bahwa kamera bergerak menjauh dari sebuah dunia digital futuristik, memasuki ruang yang sangat dalam, kemudian menghilang secara halus menuju section `About Me`.

Gunakan pendekatan visual cinematic realism, bukan cyberpunk berlebihan. Prioritaskan kedalaman ruang, pencahayaan atmosferis, gerakan kamera yang natural, komposisi profesional, dan perpindahan antar-section yang mulus.

Teknologi utama:
- React untuk struktur komponen.
- Three.js untuk rendering ruang 3D, kamera, partikel, dan elemen lingkungan.
- GSAP + ScrollTrigger untuk sinkronisasi animasi dengan scroll.
- CSS untuk overlay, typography, vignette, dan transisi section.
- Gunakan library tambahan hanya jika benar-benar diperlukan.

Sebelum mengubah kode, periksa struktur proyek, framework, package yang sudah terpasang, komponen hero, struktur section, serta konfigurasi build. Pertahankan arsitektur yang sudah ada dan hindari menulis ulang bagian yang tidak berkaitan.

### 2. Art Direction

Gunakan gaya visual:
- Background dominan near-black, charcoal, dan deep navy.
- Ambient lighting berwarna biru gelap dan cyan lembut.
- Aksen crimson atau merah hanya digunakan secara terbatas pada tepi HUD.
- Cahaya putih kebiruan sebagai sumber cahaya utama.
- Partikel debu digital yang kecil, jarang, dan realistis.
- Grid perspektif yang sangat halus, bukan pola neon yang memenuhi layar.
- Bloom lembut hanya pada sumber cahaya tertentu.
- Vignette sinematik yang meningkat secara bertahap.
- Hindari saturasi berlebihan, ledakan energi, glitch agresif, dan gerakan dekoratif yang tidak memiliki tujuan.

Hasil akhirnya harus terlihat seperti pengalaman pembuka website creative developer profesional, dengan kualitas visual premium tetapi tetap nyaman digunakan untuk mencari informasi dan melihat proyek.

### 3. Struktur Adegan

Buat animasi menjadi satu rangkaian yang kontinu, terdiri atas lima fase.

#### Fase A — Digital World Establishing Shot (Progress 0.00–0.75)

Tampilkan canvas utama atau HUD landscape yang sudah digunakan pada hero portfolio.

Persyaratan:
- Canvas memenuhi area visual hero.
- Pertahankan konten, indikator, typography, dan identitas desain yang sudah ada.
- Kamera memiliki gerakan mikro yang sangat halus, bukan bergetar.
- Partikel bergerak lambat untuk menciptakan kesan kedalaman.
- Grid perspektif mengikuti ruang 3D.
- Cahaya ambient berubah secara minimal.
- Jangan memulai transisi utama sebelum bagian scroll yang telah ditentukan.

#### Fase B — Cinematic Camera Pull-Back (Progress 0.75–0.84)

Kamera mulai bergerak mundur menjauhi canvas menuju ruang 3D yang lebih dalam.

Implementasi:
- Gunakan Three.js PerspectiveCamera dengan perubahan posisi atau kedalaman kamera yang terkontrol.
- Canvas atau panel HUD diperlakukan sebagai objek yang memiliki posisi, ukuran, dan orientasi dalam ruang.
- Objek bergerak menjauh secara progresif, bukan langsung diperkecil secara drastis.
- Gunakan perubahan skala dan perspektif yang konsisten dengan pergerakan kamera.
- Pertahankan garis tepi panel dengan pencahayaan tipis berwarna cyan dan crimson.
- Latar belakang mulai menunjukkan partikel dan lapisan ruang.
- Tambahkan parallax antara foreground, midground, dan background.

Gerakan harus terasa seperti kamera film bergerak mundur menggunakan dolly, bukan seperti gambar yang sekadar mengecil.

#### Fase C — Deep Space Tunnel Traversal (Progress 0.84–0.92)

Saat kamera semakin jauh, lingkungan ruang 3D menjadi lebih terlihat.

Buat tunnel abstrak yang tersusun dari:
- Partikel kecil dengan distribusi kedalaman berbeda.
- Garis cahaya tipis yang bergerak perlahan mengikuti perspektif.
- Grid atau garis ruang yang mengarah ke titik fokus.
- Lapisan kabut tipis menggunakan pendekatan shader atau fog yang efisien.
- Perubahan pencahayaan yang halus dan bertahap.

Efek yang diinginkan:
- Parallax semakin terasa saat kamera bergerak.
- Objek yang jauh memiliki kontras lebih rendah.
- Vignette meningkat perlahan.
- Canvas utama tetap dapat dikenali selama sebagian transisi.
- Chromatic aberration, jika digunakan, harus sangat minimal dan hanya muncul menjelang akhir.
- Jangan memenuhi layar dengan streak, partikel besar, atau efek warp yang membuat konten tidak terbaca.

Hindari menggerakkan semua partikel dengan kecepatan yang sama. Gunakan beberapa lapisan dengan kecepatan dan kedalaman berbeda agar ruang terasa lebih natural.

#### Fase D — Focus Convergence (Progress 0.92–0.97)

Canvas kini sudah sangat jauh dan mendekati titik fokus di tengah layar.

Implementasi:
- Canvas mengecil secara bertahap sampai hampir tidak terlihat.
- Cahaya ambient mengarahkan perhatian ke titik pusat.
- Partikel dan garis perspektif bergerak menuju atau melewati area fokus dengan gerakan halus.
- Background semakin gelap, tetapi jangan berubah menjadi hitam secara mendadak.
- Kurangi kontras visual canvas utama secara bertahap.
- Hindari efek flash, ledakan energi, dan camera shake.

Pada akhir fase ini, ruang 3D harus memberikan kesan kedalaman yang tenang dan terkontrol.

#### Fase E — Soft Emergence About (Progress 0.97–1.00)

Section `About Me` mulai muncul ketika adegan ruang 3D mencapai titik paling gelap dan tenang.

Gunakan transisi Soft Emergence:
1. Judul About muncul terlebih dahulu dengan opacity yang meningkat.
2. Kontainer utama About mengikuti dengan perpindahan vertikal yang sangat kecil.
3. Foto profil muncul melalui opacity dan perubahan skala ringan.
4. Deskripsi, informasi diri, serta tombol muncul secara bertahap.
5. Background ruang 3D memudar ketika section About sudah terbentuk sepenuhnya.

Karakter animasi:
- Lembut, elegan, tidak terlalu dramatis.
- Hindari scale besar pada seluruh section.
- Jangan menggunakan zoom agresif.
- Jangan membuat elemen About meledak dari pusat layar.
- Jangan membuat elemen bertabrakan dengan canvas.
- Pastikan About dapat dibaca dan digunakan begitu muncul.

Section About harus menjadi bagian dari layout normal halaman, bukan konten yang terkunci di dalam canvas WebGL.

### 4. Implementasi Three.js

Bangun scene 3D dengan pendekatan modular.

Komponen yang direkomendasikan:
- `DeepSpaceScene.jsx` untuk canvas dan lifecycle Three.js.
- `DeepSpaceParticles.js` untuk sistem partikel.
- `CameraController.js` untuk pengaturan kamera.
- `ScrollExperience.jsx` untuk mengintegrasikan section dan timeline GSAP.
- `deep-space.css` untuk overlay visual dan styling.
- `useReducedMotion.js` atau pendekatan setara untuk mendeteksi preferensi gerakan pengguna.

Sesuaikan penamaan dan lokasi file dengan struktur proyek yang sudah ada. Jangan membuat duplikasi komponen jika fungsi yang sama telah tersedia.

Teknis rendering:
- Gunakan `THREE.WebGLRenderer` dengan konfigurasi yang sesuai.
- Gunakan `PerspectiveCamera` untuk perspektif ruang.
- Gunakan `BufferGeometry` dan `BufferAttribute` untuk partikel dalam jumlah banyak.
- Utamakan `THREE.Points` atau pendekatan instanced yang sesuai daripada membuat ribuan mesh individual.
- Gunakan material ringan dan hindari shader mahal yang tidak diperlukan.
- Gunakan fog atau depth fading untuk memperkuat kedalaman.
- Terapkan tone mapping dan color space yang konsisten.
- Batasi penggunaan transparent layers yang saling bertumpuk.
- Hindari efek post-processing berat kecuali memiliki manfaat visual yang jelas.

Jangan membangun terowongan dengan geometri yang sangat kompleks hanya untuk menampilkan garis perspektif. Gunakan pendekatan procedural dan sederhana bila hasil visualnya memadai.

### 5. Integrasi GSAP dan ScrollTrigger

Buat satu timeline utama yang mengontrol progres transisi.

Persyaratan:
- Gunakan `gsap.context()` atau pendekatan lifecycle yang sesuai untuk React.
- Buat dan bersihkan ScrollTrigger dengan benar.
- Gunakan `pin` hanya pada area transisi yang memang membutuhkannya.
- Tentukan rentang scroll yang proporsional terhadap tinggi viewport dan panjang konten.
- Sinkronkan kamera, posisi objek, opacity, vignette, serta reveal About dengan timeline yang sama.
- Gunakan scrub yang halus tanpa membuat animasi terasa tertinggal jauh dari posisi scroll.
- Pastikan timeline dapat dibalik ketika pengguna scroll ke atas.
- Gunakan fungsi easing untuk gerakan yang tidak langsung mengikuti scroll secara linear, tanpa membuat progress scroll tidak konsisten.
- Jangan membuat timeline baru pada setiap render React.
- Jangan memanggil `setState` setiap frame untuk menggerakkan kamera atau partikel.
- Gunakan refs untuk menyimpan objek Three.js yang harus diperbarui secara langsung.

Gunakan progress ternormalisasi 0–1 sebagai dasar perhitungan fase. Nilai persentase yang disebutkan dalam prompt ini merupakan titik awal dan boleh disesuaikan setelah pengujian.

### 6. Sinkronisasi Kamera dan Scroll

Pastikan kamera dan elemen visual menggunakan sumber progres yang konsisten.

Gunakan interpolasi yang sesuai untuk:
- Posisi kamera.
- Target kamera.
- Posisi dan skala canvas.
- Kepadatan visual partikel.
- Opacity dan intensitas pencahayaan.
- Tingkat vignette.
- Kemunculan section About.

Jangan mengubah terlalu banyak properti secara bersamaan jika menghasilkan kesan gerakan yang tidak natural.

Gerakan kamera harus menjadi fokus utama. Efek tambahan hanya mendukung gerakan tersebut.

### 7. Performa dan Stabilitas

Performa merupakan persyaratan utama, bukan tahap tambahan setelah animasi selesai.

Terapkan:
- Gunakan `requestAnimationFrame` atau render loop yang sesuai untuk kebutuhan scene.
- Hindari render loop duplikat.
- Pertimbangkan render berbasis permintaan atau berhenti merender saat tab tidak terlihat dan saat scene tidak membutuhkan animasi.
- Gunakan `renderer.setPixelRatio()` dengan batas yang sesuai untuk mencegah beban GPU berlebihan.
- Batasi resolusi dan jumlah partikel pada perangkat mobile.
- Gunakan transformasi GPU-friendly jika memungkinkan.
- Hindari layout thrashing dan perubahan layout berulang.
- Jangan melakukan operasi alokasi objek besar setiap frame.
- Gunakan kembali vector, color, dan objek sementara pada render loop.
- Hentikan animation loop, lepaskan event listener, dan dispose geometri, material, tekstur, serta renderer ketika komponen dilepas.
- Tangani perubahan ukuran viewport dan perubahan orientasi perangkat.
- Sediakan fallback jika WebGL tidak tersedia atau gagal dibuat.

Jangan menjanjikan 60 FPS pada seluruh perangkat. Uji pada perangkat yang berbeda dan sesuaikan kualitas secara adaptif.

### 8. Responsivitas

Desktop:
- Gunakan seluruh kemampuan perspektif 3D.
- Pertahankan komposisi cinematic yang lebar.
- Tampilkan lapisan partikel dan grid secara proporsional.

Tablet:
- Kurangi kepadatan partikel dan detail yang tidak penting.
- Sesuaikan perspektif agar konten utama tetap menjadi fokus.

Mobile:
- Jangan sekadar mengecilkan komposisi desktop.
- Sederhanakan tunnel menjadi lapisan kedalaman yang lebih ringan.
- Kurangi atau nonaktifkan efek chromatic aberration dan post-processing.
- Pastikan teks HUD tidak menjadi terlalu kecil.
- Kurangi durasi atau panjang pinning bila mengganggu navigasi.
- Pastikan section About tetap mudah dicapai dan digunakan.
- Jika pengalaman WebGL terlalu berat, gunakan fallback CSS yang mempertahankan ide transisi tanpa efek 3D kompleks.

### 9. Accessibility

- Hormati `prefers-reduced-motion`.
- Dalam mode reduced motion, tampilkan transisi sederhana tanpa camera pull-back yang intens.
- Pastikan konten About tidak bergantung pada WebGL untuk dapat dibaca.
- Jangan menyembunyikan informasi penting di balik canvas.
- Hindari flicker, flash, dan perubahan cahaya yang menyilaukan.
- Pastikan navigasi keyboard dan tombol tetap berfungsi.
- Jangan menonaktifkan scroll pengguna secara permanen.

### 10. Kriteria Keberhasilan

Implementasi dinyatakan berhasil jika:
1. Canvas bergerak menjauh dengan perspektif 3D yang meyakinkan.
2. Tunnel memiliki kedalaman melalui parallax, fog, dan pencahayaan, bukan hanya gambar latar.
3. Perubahan antar-fase terasa kontinu dan tidak patah.
4. Section About muncul melalui Soft Emergence yang elegan.
5. Scroll ke bawah dan ke atas sama-sama berfungsi.
6. Tidak ada flash hitam, flicker, layout shift yang tidak diinginkan, atau elemen yang saling bertabrakan.
7. Tidak ada kebocoran memori akibat lifecycle Three.js atau GSAP.
8. Perangkat mobile tetap dapat menggunakan halaman dengan nyaman.
9. Efek visual tidak mengalahkan keterbacaan konten portfolio.
10. Struktur file, kode, dan dependensi tetap rapi.

### 11. Workflow Pengerjaan

Kerjakan secara bertahap:
1. Audit kode proyek dan identifikasi hero, canvas, serta section About yang sudah ada.
2. Jelaskan secara singkat file yang akan dibuat atau diubah.
3. Implementasikan scene Three.js dasar dan pastikan cleanup berfungsi.
4. Integrasikan timeline GSAP dan ScrollTrigger.
5. Tambahkan partikel, depth fog, vignette, dan pencahayaan secara bertahap.
6. Integrasikan Soft Emergence pada section About.
7. Optimalkan desktop dan mobile.
8. Jalankan build dan perbaiki error yang muncul.
9. Periksa kembali scroll maju-mundur, resize, reduced motion, dan lifecycle komponen.
10. Laporkan file yang berubah, dependensi baru, cara pengujian, dan keterbatasan yang masih ada.

Jangan berhenti pada mockup atau penjelasan konsep. Implementasikan fitur pada kode proyek yang sebenarnya. Jangan menghapus atau mengganti konten yang sudah ada tanpa alasan teknis yang jelas.

**Hasil akhir yang diinginkan:** transisi Infinite Deep Space Tunnel 2.0 yang terasa seperti satu pengambilan gambar sinematik berkesinambungan, dengan kamera 3D yang halus, atmosfer ruang yang realistis, dan section About yang muncul secara elegan tanpa mengorbankan performa, responsivitas, maupun usability.
