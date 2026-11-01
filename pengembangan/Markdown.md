# MASTER PROMPT

1. Role
Bertindaklah sebagai Senior Frontend Engineer dan Audio/Animation Integration Specialist (Ahli React, Web Audio API / Audio Lifecycle, Tailwind CSS, dan Browser Performance Optimization). Prioritas utama Anda adalah mengintegrasikan pemicu audio berbasis progres loading (threshold 70%) secara mulus, membangun komponen pengontrol audio mini yang futuristik dan bergaya cyberpunk/HUD, serta memastikan pemutaran audio, transisi visual, dan pemantauan state berjalan ultra-ringan tanpa membebani CPU Main Thread, bebas memory leak, dan tidak memicu stuttering atau jank pada animasi hero section.

2. Task
Rancang dan implementasikan fitur pemutaran audio otomatis saat progres loading mencapai 70% di `HeroRadarLoader.jsx`, buat komponen audio controller mini yang ringkas namun elegan di dalam folder `src/components/sections/Hero/`, lalu integrasikan komponen tersebut ke dalam `Hero.jsx` dengan posisi persis di atas teks/elemen 'scroll to explore telemetry'. Pastikan pemutar audio memiliki fungsi toggle Play/Pause (Mute/Unmute), menangani kebijakan Browser Autoplay Policy dengan benar, dan dirancang dengan arsitektur yang sangat hemat daya serta bebas dari re-render berlebihan.

3. Context
- File Pemicu Loading: `src/components/sections/Hero/HeroRadarLoader.jsx` (memiliki variabel/state progres loading yang saat menyentuh nilai >= 70% atau 0.70 akan memicu pemutaran audio secara aman).
- File Berkas Audio: `public/audio/sound.MP3` (atau `/audio/sound.MP3` pada root publik).
- File Komponen Baru: Buat komponen baru di `src/components/sections/Hero/` Sebutkan nama file komponen baru, yaitu `HeroAudioPlayer.jsx`.
- File Induk Penempatan: `src/components/sections/Hero/Hero.jsx` (posisikan komponen audio player mini tepat di atas tampilan HUD/indikator `'scroll to explore telemetry'`).
- Desain & Karakteristik Komponen Audio Player Mini:
  * Dimensi: Ringkas, kompak, dan minimalis (tidak memakan ruang layar).
  * Estetika: Bergaya Cyberpunk / Sci-Fi HUD Telemetry yang menyatu dengan tema Hero (#0A0907 / aksen neon seperti Cyan `#06b6d4`, Emerald `#10b981`, atau Rose `#f43f5e`).
  * Elemen Visual: Tombol toggle Play/Pause / Mute yang interaktif, dilengkapi equalizer mini animasi gelombang suara (audio visualizer bars sederhana via CSS keyframes) yang bergerak saat audio menyala dan diam saat dijeda/dimatikan.
- Batasan Kinerja & Audio Policy (Wajib Bebas Lag):
  * Gunakan mekanisme audio singleton (menggunakan `HTMLAudioElement` yang dikelola via ref atau Web Audio API) agar tidak membuat instance audio ganda setiap kali komponen re-render.
  * Hindari loop `useEffect` yang mengeksekusi `audio.play()` berulang kali saat progres berada di atas 70% (wajib menyematkan guard flag seperti `hasTriggeredRef.current = true`).
  * Tangani Promise dari `.play()` dengan penanganan error (`catch(error => ...)`) guna mengantisipasi blokir *Browser Autoplay Policy* jika pengguna belum berinteraksi dengan dokumen.
  * Animasi bar visualizer wajib menggunakan akselerasi GPU murni (`transform: scaleY()`, `will-change: transform`) tanpa memanipulasi properti `height` yang memicu layout reflow.
- Kode `ScrollHeadline.jsx` & `Hero.jsx` Saat Ini:
[Tempelkan cuplikan kode ScrollHeadline.jsx dan Hero.jsx Anda di sini, terutama bagian pembacaan progres dan area teks 'scroll to explore telemetry']

4. Reasoning
Memicu audio berdasarkan nilai progres (seperti scroll atau loading counter) sering kali memicu *infinite play call* atau error `AbortError: The play() request was interrupted` apabila logika pemutarannya dijalankan di dalam loop rendering yang tidak terisolasi. Selain itu, menambahkan elemen animasi audio visualizer di atas antarmuka hero yang sudah padat (kanvas sekuens dan HUD) dapat membebani GPU dan Main Thread jika visualizer menganimasikan properti geometri CSS (`height`). Dengan menyematkan guard clause referensial, penanganan status audio asinkron, dan animasi bar berbasis `transform`, audio dapat diputar tepat pada threshold 70% dengan visualizer yang super mulus tanpa mengorbankan frame rate portofolio.

5. Stop Conditions
Tugas dianggap selesai apabila:
- Kode untuk memicu audio saat progres mencapai 70% pada `HeroRadarLoader.jsx` terpasang dengan aman tanpa memicu pemutaran ganda atau memory leak.
- Dihasilkan satu file komponen baru di dalam folder `src/components/sections/Hero/` yang memuat player audio mini dengan tombol toggle on/off dan animasi visualizer bar yang ringan.
- Komponen baru tersebut terpasang rapi di `Hero.jsx` persis di atas elemen 'scroll to explore telemetry'.
- Penanganan Browser Autoplay Policy telah terpasang rapi sehingga tidak memunculkan uncaught console error jika interaksi user belum terdeteksi.
- Seluruh kode yang dihasilkan bebas dari re-render tak perlu, tidak memicu layout reflow, dan disajikan secara utuh dan siap disalin.

6. Output
Sajikan hasil dalam Bahasa Indonesia dengan format:
1. **Analisis Teknis & Mekanisme Pemicu (Threshold 70%)**: Penjelasan singkat bagaimana audio di-trigger satu kali saja tanpa membebani Main Thread CPU.
2. **Implementasi Komponen Pemutar Audio Mini**: Blok kode lengkap untuk komponen baru di folder `src/components/sections/Hero/` (termasuk styling Tailwind, ikon, dan animasi visualizer GPU-friendly).
3. **Modifikasi Kode `HeroRadarLoader.jsx`**: Cuplikan perubahan kode untuk mendeteksi batas 70% dan memicu audio.
4. **Integrasi pada `Hero.jsx`**: Cuplikan kode penempatan komponen baru tepat di atas elemen 'scroll to explore telemetry'.
5. **Panduan Verifikasi & Edge Case**: Langkah singkat menguji tombol toggle serta tips jika browser memblokir audio otomatis sebelum klik pertama.