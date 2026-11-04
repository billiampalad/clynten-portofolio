# MASTER PROMPT

1. Role
Bertindaklah sebagai Senior Creative Frontend Engineer dan Web Audio API Specialist (Ahli Audio Programming di Browser, React Hooks, Event Delegation, dan Browser Performance Optimization). Prioritas utama Anda adalah merancang sistem efek suara klik (micro-interaction sound effects) yang responsif, berlatensi ultra-rendah (zero-latency playback), serta bebas lag dan tidak membebani CPU Main Thread bahkan saat terjadi klik beruntun berkecepatan tinggi (rapid clicking).

2. Task
Rancang dan bangun sistem pemutar suara audio klik yang modular, efisien, dan siap diintegrasikan ke dalam proyek website portofolio menggunakan berkas suara di dalam direktori `public/audio`. Implementasikan arsitektur audio berbasis Web Audio API (`AudioContext` dan `AudioBuffer`) yang melakukan pre-decode berkas audio ke memori saat awal, mendukung polyphonic playback (suara tidak terpotong saat diklik cepat), menyediakan mekanisme event delegation otomatis untuk mendeteksi elemen interaktif, serta menyertakan tombol kendali suara (Sound Toggle Mute/Unmute) global yang tersimpan di `localStorage`.

3. Context
- Direktori Berkas Audio: `public/audio/`
- Nama & Format Berkas Audio Klik: [Sebutkan nama file spesifik di dalam folder public/audio, misal: `public/audio/click.mp3`, `click.wav`, atau `click-soft.ogg`]
- Tech Stack Proyek: React / Next.js (Client Component), Tailwind CSS, JavaScript (ES6+) / TypeScript.
- Elemen Target Suara Klik: Seluruh elemen interaktif pada portofolio (seperti tombol `<button>`, tautan navigasi `<a>`, kartu proyek, filter tab, dan toggle switch).
- Batasan Kinerja & Kerapian Sistem (Anti-Lag):
  * DILARANG menggunakan `new Audio().play()` pada setiap event klik karena memicu alokasi objek berulang, kebocoran memori (memory leak), pemblokiran Main Thread saat proses decode, dan latensi suara yang lambat.
  * Wajib menggunakan `AudioContext` tunggal (singleton) dengan buffer yang di-preload dan di-decode satu kali ke memori.
  * Terapkan penanganan aturan browser modern terkait *Audio Autoplay Policy* (membuka status `AudioContext` yang tersuspensi pada interaksi pertama pengguna secara transparan).
  * Pemantauan klik harus efisien (disarankan menggunakan Event Delegation pada level `window`/`document` atau atribut data khusus seperti `data-sound="click"` agar tidak perlu memasang `onClick` manual di ratusan elemen).
- Kode Komponen / Layout Saat Ini:
[Tempelkan kode file layout utama atau komponen tempat Anda ingin memanggil hook/sistem audio ini, atau kosongkan jika ingin dibuatkan modul terpisah]

4. Reasoning
Menghadirkan umpan balik audio (tactile sound) membuat interaksi portofolio terasa lebih nyata, berbobot, dan hidup layaknya antarmuka aplikasi modern atau video game. Namun, pemutaran audio di web sering kali menjadi penyebab utama lag atau audio yang berbunyi terlambat (jank/latency) jika diproses secara naif menggunakan tag HTML5 `<audio>`. Dengan memanfaatkan Web Audio API, data audio didekode ke dalam bentuk *Pulse-Code Modulation* (PCM) di memori sejak awal, sehingga pemutaran suara hanya membutuhkan pembuatan node sumber sekali pakai (`AudioBufferSourceNode`) yang sangat ringan bagi CPU dan menghasilkan respon suara instan (sub-millisecond) tanpa pernah membuat browser patah-patah.

5. Stop Conditions
Tugas dianggap selesai apabila:
- Sistem audio dibangun menggunakan Web Audio API murni (`AudioContext` + `decodeAudioData`) dengan pengelolaan lifecycle yang aman dari memory leak.
- Suara klik berbunyi instan tepat di momen tombol ditekan tanpa delay atau jeda yang terasa.
- Ketika pengguna mengklik berkali-kali secara cepat, setiap suara klik terdengar tumpang-tindih secara harmonis tanpa memutus playback sebelumnya dan tanpa lonjakan konsumsi CPU.
- Terdapat penanganan *AudioContext resume* otomatis untuk memenuhi regulasi keamanan browser tanpa memunculkan pesan error/peringatan di console.
- Tersedia opsi tombol kontrol Mute/Unmute yang elegan dan mengingat preferensi pengguna via `localStorage`.
- Kode disajikan secara modular (misal berupa utilitas `soundManager.js` dan custom hook `useClickSound.js`) yang mudah dipanggil dan dipelihara.

6. Output
Sajikan hasil dalam Bahasa Indonesia dengan format:
1. **Arsitektur Sistem (Web Audio API vs HTML5 Audio)**: Penjelasan teknis singkat mengapa Web Audio API menjamin nol latensi dan nol lonjakan CPU.
2. **Implementasi Modul `soundManager.js` / Custom Hook**: Blok kode lengkap untuk memuat buffer audio, menangani autoplay policy, dan memutar suara klik secara aman.
3. **Komponen Pengontrol Suara (`SoundToggle.jsx`)**: Blok kode tombol switch Mute/Unmute audio dengan ikon dan animasi Tailwind CSS.
4. **Panduan Integrasi Global (Event Delegation)**: Cara memasang listener klik terpusat di file root/layout portofolio agar semua tombol langsung bersuara secara otomatis tanpa koding manual satu per satu.
5. **Tips Optimasi Berkas Audio**: Saran pengaturan ukuran berkas (sample rate, bit depth, dan durasi) agar berkas audio di folder `public/audio` super ringan saat diunduh browser.