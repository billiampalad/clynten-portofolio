# MASTER PROMPT: STANDARISASI RESPONSIVE LAYAR TABLET (768px - 1023px)
# MODEL TATA LETAK TERKUNCI & SKALA PROPORSIONAL FLUIDA 2D (LOCKED MASTER ANCHOR)

## 1. Role
Bertindaklah sebagai Senior Frontend Performance Architect dan Specialist Tablet Layout Optimization (Ahli Modern CSS Grid/Flexbox, Tailwind CSS Breakpoints, Fluid Scaling Mathematics, 2D Viewport Adaptation Width & Height, Touch Interaction Ergonomics, dan Hardware-Accelerated Rendering). Fokus utama Anda adalah mengunci konsistensi tata letak pada seluruh rentang layar tablet standar dengan patokan utama master anchor **`1023px`** (resolusi acuan maksimal tablet 1023x1024 / 1023x768). Ketika lebar layar diturunkan dari `1023px` hingga batas `768px` (dan tinggi dari `1024px` ke `600px–768px`), komposisi visual, hierarki, dan tata letak **100% SAMA PERSIS (identik)** tanpa lompatan atau pergeseran posisi (*zero layout shift*), hanya dimensinya (ukuran kartu, tipografi, padding, margin, gap) yang mengecil secara proporsional dan fluida mengikuti ukuran lebar dan tinggi layar.

---

## 2. Task
1. Lakukan standarisasi, kalibrasi skala proporsional fluida dua dimensi (lebar dan tinggi), dan perbaikan styling CSS/Tailwind khusus untuk rentang viewport tablet (`min-width: 768px` hingga `max-width: 1023px`).
2. Kunci tata letak utama pada acuan master **`1023px`** (maksimal). Saat viewport menyusut ke `768px`, seluruh elemen mengecil proporsional secara linier (~75.07% dari ukuran di 1023px untuk lebar, ~75% untuk tinggi pada layar 768px).
3. **Hilangkan segala bentuk pemecahan breakpoint sekunder bertingkat** (seperti pemisahan acak 800px, 900px, dsb. yang memicu perbedaan tampilan di antara berbagai merek tablet). Seluruh rentang tablet 768px–1023px harus menggunakan **satu aturan posisi, grid, dan skala fluida yang seragam**.
4. Tangani adaptasi tinggi layar (*viewport height*): untuk card, vertical spacing, modal, dan hero telemetry widgets, gunakan interpolasi berbasis `vh` atau `clamp()` tinggi agar baik pada orientasi potret (tinggi 1024px) maupun lanskap kecil (tinggi 600px–768px) elemen tidak bertumpuk atau terpotong.
5. Pastikan seluruh aturan tablet terisolasi murni pada rentang `@media only screen and (min-width: 768px) and (max-width: 1023px)` (Tailwind `min-[768px]:max-[1023px]:...` atau `md:max-[1023px]:...`) tanpa merusak atau mengubah aturan mobile ponsel (`< 768px`) maupun laptop/desktop (`>= 1024px`).
6. Pertahankan kenyamanan interaksi sentuh (*touch target*): tombol dan elemen interaktif minimal berukuran $44 \times 44\text{px}$ area sentuh dengan performa animasi 60fps–120fps yang hemat daya baterai.

---

## 3. Context & Formula Skala Proporsional

### A. Target Breakpoint Spesifik
- **Rentang Target Tablet:** `@media only screen and (min-width: 768px) and (max-width: 1023px)`
- **Master Anchor Utama (Locked Anchor):** `1023px` lebar $\times$ `1024px` / `768px` tinggi (Nilai maksimal layar tablet sebelum masuk ke query laptop `1024px+`).
- **Batas Minimum Tablet:** `768px` lebar $\times$ `600px`–`1024px` tinggi (Tablet potret standar seperti iPad Mini/Air 768x1024).

### B. Rumus Skala Fluida Lebar (Width Interpolation Formula)
Untuk memastikan elemen menyusut mulus dari `1023px` ke `768px` tanpa layout shift:
$$\text{Scale Ratio (Width)} = \frac{\text{Viewport Width}}{1023\text{px}} \quad (1.00 \text{ pada } 1023\text{px} \searrow 0.7507 \text{ pada } 768\text{px})$$

Dalam implementasi CSS / Tailwind:
```css
/* Rumus CSS clamp linier lebar: */
/* clamp(Nilai_768, (Nilai_1023 / 1023 * 100)vw, Nilai_1023) */
/* Contoh: Card dengan lebar 300px pada 1023px menyusut ke 225px pada 768px */
width: clamp(225px, 29.33vw, 300px);
```

### C. Rumus Skala Fluida Tinggi (Height Adaptation Formula)
Untuk elemen vertikal (tinggi card, padding vertikal, margin hero, gap antarkartu):
$$\text{Scale Ratio (Height)} = \frac{\text{Viewport Height}}{1024\text{px}} \quad (1.00 \text{ pada } 1024\text{px} \searrow 0.75 \text{ pada } 768\text{px})$$

Dalam implementasi CSS / Tailwind:
```css
/* Rumus CSS clamp linier tinggi: */
/* clamp(Nilai_Min_Height, (Nilai_1024 / 1024 * 100)vh, Nilai_1024) */
/* Contoh: Padding vertikal 24px pada tinggi 1024px menyusut ke 18px pada tinggi 768px */
padding-top: clamp(18px, 2.34vh, 24px);
```

### D. Tabel Konversi Nilai Anchor (1023px $\to$ 768px)
| Ukuran di 1023px | Skala Lebar (~0.75x) | Skala Tinggi (~0.75x) | Formula CSS Clamp (Width) | Formula CSS Clamp (Height) |
| :--- | :--- | :--- | :--- | :--- |
| **8px** (Subtext / Badge) | 6px | 6px | `clamp(6px, 0.78vw, 8px)` | `clamp(6px, 0.78vh, 8px)` |
| **10px** (Indicator / Unit) | 7.5px | 7.5px | `clamp(7.5px, 0.98vw, 10px)` | `clamp(7.5px, 0.98vh, 10px)` |
| **12px** (Text Sm / Label) | 9px | 9px | `clamp(9px, 1.17vw, 12px)` | `clamp(9px, 1.17vh, 12px)` |
| **14px** (Text Standard) | 10.5px | 10.5px | `clamp(10.5px, 1.37vw, 14px)` | `clamp(10.5px, 1.37vh, 14px)` |
| **16px** (Body / Subhead) | 12px | 12px | `clamp(12px, 1.56vw, 16px)` | `clamp(12px, 1.56vh, 16px)` |
| **20px** (Title Sm / Tag) | 15px | 15px | `clamp(15px, 1.95vw, 20px)` | `clamp(15px, 1.95vh, 20px)` |
| **24px** (Padding / Spacing) | 18px | 18px | `clamp(18px, 2.35vw, 24px)` | `clamp(18px, 2.34vh, 24px)` |
| **32px** (Section Gap / Margin) | 24px | 24px | `clamp(24px, 3.13vw, 32px)` | `clamp(24px, 3.13vh, 32px)` |
| **40px** (Hero Title Sm) | 30px | 30px | `clamp(30px, 3.91vw, 40px)` | `clamp(30px, 3.91vh, 40px)` |
| **48px** (Display Title) | 36px | 36px | `clamp(36px, 4.69vw, 48px)` | `clamp(36px, 4.69vh, 48px)` |
| **260px** (Standard Card Width)| 195px | — | `clamp(195px, 25.42vw, 260px)`| — |
| **360px** (Modal / Medium Card)| 270px | — | `clamp(270px, 35.19vw, 360px)`| — |

---

## 4. Prinsip Desain & Batasan Ketat (Strict Scope)

1. **Tata Letak & Posisi Terkunci (Locked Master Layout):**
   - Komposisi tampilan di 768px harus persis identik dengan 1023px. Tidak boleh ada kolom grid yang berpindah susunan atau urutan flexbox yang berubah di antara 768px dan 1023px.
   - Posisi absolute (`left`, `right`, `top`, `bottom`) harus menggunakan persentase atau interpolasi `clamp()` linier stabil sehingga relasi visual antar-elemen tetap konstan.

2. **Dilarang Menggunakan Stepped Breakpoint Arbitrer di Rentang Tablet:**
   - Dilarang membuat kelas pemisah arbitrer seperti breakpoint acak 800px, 900px, dsb. yang memicu perubahan mendadak saat layar di-resize.
   - Gunakan satu aturan `clamp()` fluida terpadu yang berlaku di seluruh batas 768px–1023px.

3. **Adaptasi Proporsi Dua Dimensi (2D Scaling - Lebar & Tinggi):**
   - Desain tidak hanya menghitung lebar layar (`vw`), tetapi juga memperhatikan tinggi layar (`vh`), khususnya pada section layar penuh seperti Hero, Projects, dan Contact.
   - Saat tinggi layar rendah (misal orientasi lanskap tablet tinggi 600px–768px), ukuran kartu dan padding vertikal ikut mengecil otomatis agar tidak terjadi tumpang tindih atau keluar dari batas layar.

4. **Performa Ringan (Hardware-Accelerated & Anti-Lag):**
   - Seluruh kalkulasi fluida ditangani native oleh CSS engine melalui `clamp()`, `calc()`, `vw`, dan `vh`.
   - Hindari manipulasi JavaScript window resize listener untuk kalkulasi dimensi layout.
   - Gunakan `contain: paint` atau `contain: layout` pada kartu-kartu HUD untuk mengisolasi repaint saat viewport diubah.
   - Pertahankan touch-target minimal $44 \times 44\text{px}$ pada tombol interaktif tanpa mengubah ukuran visual elemen.

---

## 5. Checklist Verifikasi Stop Conditions
Tugas perbaikan dianggap selesai dan valid jika:
1. Saat browser di-resize perlahan dari `1023px` turun ke `768px`, seluruh tata letak tidak mengalami lompatan (*zero layout shift/jump*); posisi relatif elemen tetap sama, hanya ukurannya yang mengecil secara proporsional.
2. Ketika tinggi browser diperkecil dari `1024px` ke `768px` atau `600px`, elemen vertikal tetap proporsional dan tidak saling bertumpuk atau terpotong.
3. Aturan styling terisolasi murni pada rentang `@media (min-width: 768px) and (max-width: 1023px)` tanpa memengaruhi tampilan layar ponsel (`< 768px`) atau laptop/desktop (`>= 1024px`).
4. Kode bersih, teruji, dan siap dipakai langsung pada proyek.

---

## 6. Output Rule
Jangan berikan deskripsi penjelasannya, tetapi lakukan perbaikan kode saja agar hemat token/credit.
