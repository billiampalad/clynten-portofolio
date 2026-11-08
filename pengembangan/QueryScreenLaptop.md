# MASTER PROMPT: STANDARISASI RESPONSIVE LAYAR LAPTOP (1024px - 1439px)
# MODEL TATA LETAK TERKUNCI & SKALA PROPORSIONAL FLUIDA (LOCKED MASTER ANCHOR)

## 1. Role
Bertindaklah sebagai Senior Frontend Performance Architect dan Specialist Responsive UI Optimization (Ahli Modern CSS Grid/Flexbox, Tailwind CSS Breakpoints, Fluid Scaling Mathematics, dan Hardware-Accelerated Rendering). Fokus utama Anda adalah mengunci konsistensi tata letak pada seluruh rentang layar laptop standar `@media only screen and (min-width: 1024px) and (max-width: 1439px)`. Desain dipatok dan dikunci pada acuan `max-width: 1439px`, dan ketika lebar layar diperkecil turun hingga `min-width: 1024px`, posisi dan komposisi tata letak **100% SAMA PERSIS (identik)** tanpa lompatan atau pergeseran posisi, hanya dimensinya (ukuran kartu, tipografi, padding, gap) yang mengecil secara proporsional dan fluida mengikuti penyusutan layar.

---

## 2. Task
1. Lakukan standarisasi, kalibrasi skala proporsional fluida, dan perbaikan styling CSS/Tailwind khusus untuk rentang viewport laptop (`min-width: 1024px` hingga `max-width: 1439px`).
2. Hilangkan segala bentuk pemecahan breakpoint sekunder (seperti Tailwind `xl:` pada 1280px) yang memicu perbedaan tampilan/posisi di antara laptop 13-14 inci (1024-1279px) dan laptop 15.6 inci (1280-1439px). Seluruh rentang laptop harus menggunakan satu aturan posisi yang seragam.
3. Terapkan formula *Linear Fluid Downscaling* berbasis anchor `1439px`, di mana ukuran elemen saat `1024px` menyusut proporsional sekitar ~71%–75% dari ukurannya saat `1439px`.
4. Pastikan aturan terkunci murni di dalam batas `@media only screen and (min-width: 1024px) and (max-width: 1439px)` tanpa memengaruhi tampilan layar tablet/mobile (< 1024px) atau desktop monitor lebar (>= 1440px).

---

## 3. Context & Formula Skala Proporsional

### A. Target Breakpoint Spesifik
- **Rentang Target Laptop:** `@media only screen and (min-width: 1024px) and (max-width: 1439px)`
- **Anchor Acuan Utama (Locked Anchor):** `1439px` (Nilai maksimal tampilan laptop sebelum masuk ke query desktop 1440px+).

### B. Rumus Skala Fluida (Fluid Interpolation Formula)
Untuk memastikan elemen mengecil mulus dari `1439px` ke `1024px` tanpa layout shift:
$$\text{Scale Ratio} = \frac{\text{Viewport Width}}{1439\text{px}} \quad (1.00 \text{ pada } 1439\text{px} \searrow 0.71 \text{ pada } 1024\text{px})$$

Dalam implementasi CSS / Tailwind:
- **Metode CSS `clamp()` Linier:**
  ```css
  /* Contoh: Elemen berukuran 280px pada 1439px yang menyusut ke 200px pada 1024px */
  width: clamp(200px, 19.45vw, 280px);
  
  /* Rumus umum clamp linier: */
  /* clamp(Nilai_Min_1024, (Nilai_Max_1439 / 1439 * 100)vw, Nilai_Max_1439) */
  ```
- **Metode Tailwind Arbitrary Media Query:**
  ```html
  <!-- Kelas laptop tunggal yang seragam tanpa pemisahan lg: vs xl: -->
  <div class="[@media(min-width:1024px)_and_(max-width:1439px)]:w-[clamp(190px,18vw,260px)] ...">
  ```

---

## 4. Prinsip Desain & Batasan Ketat (Strict Scope)

1. **Tata Letak & Posisi Terkunci (Locked Hierarchy):**
   - Tidak boleh ada perubahan susunan grid, urutan flexbox, atau lompatan koordinat absolut antara 1024px dan 1439px.
   - Posisi elemen `left`, `right`, `top`, dan `bottom` pada layar laptop harus menggunakan formula proporsional fluida atau offset persentase yang stabil sehingga relasi visual antar-elemen (misalnya kartu terhadap subjek 3D/tengah) tetap konstan.

2. **Dilarang Menggunakan Breakpoint Split `xl` (1280px) di Rentang Laptop:**
   - Dilarang memberi kelas `lg:left-10 xl:left-28` yang membuat tampilan di 1279px berbeda dengan 1280px.
   - Gunakan satu aturan posisi yang konsisten di seluruh 1024px–1439px.

3. **Performa Ringan (Hardware-Accelerated & Anti-Lag):**
   - Skala fluida sepenuhnya dihitung oleh CSS engine browser melalui `clamp()`, `calc()`, dan unit `vw`/`%`.
   - Hindari manipulasi JavaScript window resize listener untuk kalkulasi dimensi.
   - Gunakan `contain: paint` atau `contain: layout` pada kartu-kartu HUD untuk mencegah reflow global saat resolusi berubah.

---

## 5. Checklist Verifikasi Stop Conditions
Tugas perbaikan dianggap selesai dan valid jika:
1. Saat browser di-resize perlahan dari `1439px` turun ke `1024px`, seluruh tata letak tidak mengalami lompatan (zero layout shift/jump); posisi relatif elemen tetap sama, hanya ukurannya yang mengecil secara serentak.
2. Aturan styling terisolasi murni pada rentang `(min-width: 1024px) and (max-width: 1439px)`.
3. Tampilan pada tablet/mobile (`< 1024px`) dan desktop lebar (`>= 1440px`) tetap utuh tanpa efek samping (no regressions).
4. Kode bersih, teruji, dan siap dipakai langsung pada proyek.

---

## 6. Output Rule
Jangan berikan deskripsi penjelasannya, tetapi lakukan perbaikan kode saja agar hemat token/credit.
