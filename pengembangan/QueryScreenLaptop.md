# MASTER PROMPT: STANDARISASI RESPONSIVE LAYAR LAPTOP (1024px - 1439px)
# MODEL TATA LETAK TERKUNCI & SKALA PROPORSIONAL FLUIDA 2D (LOCKED MASTER ANCHOR)

## 1. Role
Bertindaklah sebagai Senior Frontend Performance Architect dan Specialist Laptop Layout Optimization (Ahli Modern CSS Grid/Flexbox, Tailwind CSS Breakpoints, Fluid Scaling Mathematics, 2D Viewport Adaptation Width & Height, dan Hardware-Accelerated Rendering). Fokus utama Anda adalah mengunci konsistensi tata letak pada seluruh rentang layar laptop standar dengan patokan utama master anchor **`1439px`** (resolusi acuan maksimal laptop 1439x900). Ketika lebar layar diturunkan dari `1439px` hingga batas `1024px` (dan tinggi dari `900px` ke `600px–768px`), komposisi visual, hierarki, dan tata letak **100% SAMA PERSIS (identik)** tanpa lompatan atau pergeseran posisi (*zero layout shift*), hanya dimensinya (ukuran kartu, tipografi, padding, margin, gap) yang mengecil secara proporsional dan fluida mengikuti ukuran lebar dan tinggi layar.

---

## 2. Task
1. Lakukan standarisasi, kalibrasi skala proporsional fluida dua dimensi (lebar dan tinggi), dan perbaikan styling CSS/Tailwind khusus untuk rentang viewport laptop (`min-width: 1024px` hingga `max-width: 1439px`).
2. Kunci tata letak utama pada acuan master **`1439px`** (maksimal). Saat viewport menyusut ke `1024px`, seluruh elemen mengecil proporsional secara linier (~71.16% dari ukuran di 1439px untuk lebar, ~85.3% pada 768px atau ~77.8% pada 700px untuk tinggi).
3. **Hilangkan segala bentuk pemecahan breakpoint sekunder bertingkat** (seperti pemisahan Tailwind `xl:` pada 1280px, query statis 1366px, atau aturan terisolasi khusus 1439px saja). Seluruh rentang laptop 1024px–1439px harus menggunakan **satu aturan posisi, grid, dan skala fluida yang seragam**.
4. Tangani adaptasi tinggi layar (*viewport height*): untuk card, vertical spacing, dan hero telemetry widgets, gunakan interpolasi berbasis `vh` atau `clamp()` tinggi agar pada laptop dengan layar pendek/aspek rasio 16:9 (seperti 1366x768 atau 1280x720) elemen tidak saling bertumpuk atau terpotong.
5. Pastikan seluruh aturan laptop terisolasi murni pada rentang `@media only screen and (min-width: 1024px) and (max-width: 1439px)` (Tailwind `min-[1024px]:max-[1439px]:...` atau kelas rentang `lg:max-[1439px]:...`) tanpa merusak atau mengubah aturan desktop monitor lebar (`>= 1440px`) maupun mobile/tablet (`< 1024px`).

---

## 3. Context & Formula Skala Proporsional

### A. Target Breakpoint Spesifik
- **Rentang Target Laptop:** `@media only screen and (min-width: 1024px) and (max-width: 1439px)`
- **Master Anchor Utama (Locked Anchor):** `1439px` lebar $\times$ `900px` tinggi (Nilai maksimal layar laptop sebelum masuk ke query desktop `1440px+`).
- **Batas Minimum Laptop:** `1024px` lebar $\times$ `600px`–`768px` tinggi (Laptop compact / layar 12-13 inci).

### B. Rumus Skala Fluida Lebar (Width Interpolation Formula)
Untuk memastikan elemen menyusut mulus dari `1439px` ke `1024px` tanpa layout shift:
$$\text{Scale Ratio (Width)} = \frac{\text{Viewport Width}}{1439\text{px}} \quad (1.00 \text{ pada } 1439\text{px} \searrow 0.7116 \text{ pada } 1024\text{px})$$

Dalam implementasi CSS / Tailwind:
```css
/* Rumus CSS clamp linier lebar: */
/* clamp(Nilai_1024, (Nilai_1439 / 1439 * 100)vw, Nilai_1439) */
/* Contoh: Card dengan lebar 260px pada 1439px menyusut ke 185px pada 1024px */
width: clamp(185px, 18.07vw, 260px);
```

### C. Rumus Skala Fluida Tinggi (Height Adaptation Formula)
Untuk elemen vertikal (tinggi card, padding vertikal, margin hero, gap antarkartu):
$$\text{Scale Ratio (Height)} = \frac{\text{Viewport Height}}{900\text{px}} \quad (1.00 \text{ pada } 900\text{px} \searrow 0.778 \text{ pada } 700\text{px})$$

Dalam implementasi CSS / Tailwind:
```css
/* Rumus CSS clamp linier tinggi: */
/* clamp(Nilai_Min_Height, (Nilai_900 / 900 * 100)vh, Nilai_900) */
/* Contoh: Padding vertikal 16px pada tinggi 900px menyusut ke 12px pada tinggi 700px */
padding-top: clamp(12px, 1.78vh, 16px);
```

### D. Tabel Konversi Nilai Anchor (1439px $\to$ 1024px)
| Ukuran di 1439px | Skala Lebar (~0.712x) | Skala Tinggi (~0.778x) | Formula CSS Clamp (Width) | Formula CSS Clamp (Height) |
| :--- | :--- | :--- | :--- | :--- |
| **8px** (Subtext / Tag) | 6px | 6px | `clamp(6px, 0.56vw, 8px)` | `clamp(6px, 0.89vh, 8px)` |
| **10px** (Indicator / Unit) | 7px | 8px | `clamp(7px, 0.69vw, 10px)` | `clamp(8px, 1.11vh, 10px)` |
| **12px** (Text Sm / Label) | 8.5px | 9.5px | `clamp(8.5px, 0.83vw, 12px)` | `clamp(9.5px, 1.33vh, 12px)` |
| **16px** (Body / Standard) | 11.5px | 12.5px | `clamp(11.5px, 1.11vw, 16px)` | `clamp(12.5px, 1.78vh, 16px)` |
| **20px** (Subheader / Tag) | 14px | 15.5px | `clamp(14px, 1.39vw, 20px)` | `clamp(15.5px, 2.22vh, 20px)` |
| **24px** (Padding / Spacing) | 17px | 18.5px | `clamp(17px, 1.67vw, 24px)` | `clamp(18.5px, 2.67vh, 24px)` |
| **32px** (Section Gap / Margin) | 23px | 25px | `clamp(23px, 2.22vw, 32px)` | `clamp(25px, 3.56vh, 32px)` |
| **48px** (Large Icon / Title) | 34px | 37px | `clamp(34px, 3.34vw, 48px)` | `clamp(37px, 5.33vh, 48px)` |
| **260px** (Skill Card Width) | 185px | — | `clamp(185px, 18.07vw, 260px)` | — |
| **480px** (Profile Scanned Width) | 340px | — | `clamp(340px, 33.36vw, 480px)` | — |

---

## 4. Prinsip Desain & Batasan Ketat (Strict Scope)

1. **Tata Letak & Posisi Terkunci (Locked Master Layout):**
   - Komposisi tampilan di 1024px harus persis identik dengan 1439px. Tidak boleh ada kolom grid yang berpindah susunan atau urutan flexbox yang berubah di antara 1024px dan 1439px.
   - Posisi absolute (`left`, `right`, `top`, `bottom`) harus menggunakan persentase atau interpolasi `clamp()` linier stabil sehingga relasi visual antar-elemen (misalnya kartu skills terhadap subjek 3D tengah) tetap konstan.

2. **Dilarang Menggunakan Stepped Breakpoint Arbitrer di Rentang Laptop:**
   - Dilarang memberi kelas `xl:` (1280px), breakpoint 1366px, atau query tunggal `(width: 1439px)` yang memicu perubahan mendadak saat layar di-resize.
   - Gunakan satu aturan `clamp()` fluida terpadu yang berlaku di seluruh batas 1024px–1439px.

3. **Adaptasi Proporsi Dua Dimensi (2D Scaling - Lebar & Tinggi):**
   - Desain tidak hanya menghitung lebar layar (`vw`), tetapi juga memperhatikan tinggi layar (`vh`), khususnya pada section layar penuh seperti Hero dan Projects.
   - Saat tinggi layar rendah (misal 768px pada resolusi 1366x768 atau 720px pada 1280x720), ukuran kartu dan padding vertikal ikut mengecil otomatis agar tidak terjadi tumpang tindih atau keluar dari batas layar.

4. **Performa Ringan (Hardware-Accelerated & Anti-Lag):**
   - Seluruh kalkulasi fluida ditangani native oleh CSS engine melalui `clamp()`, `calc()`, `vw`, dan `vh`.
   - Hindari manipulasi JavaScript window resize listener untuk kalkulasi dimensi layout.
   - Gunakan `contain: paint` atau `contain: layout` pada kartu-kartu HUD untuk mengisolasi repaint saat viewport diubah.

---

## 5. Checklist Verifikasi Stop Conditions
Tugas perbaikan dianggap selesai dan valid jika:
1. Saat browser di-resize perlahan dari `1439px` turun ke `1024px`, seluruh tata letak tidak mengalami lompatan (*zero layout shift/jump*); posisi relatif elemen tetap sama, hanya ukurannya yang mengecil secara proporsional.
2. Ketika tinggi browser diperkecil dari `900px` ke `768px` atau `600px`, elemen vertikal tetap proporsional dan tidak saling bertumpuk atau terpotong.
3. Aturan styling terisolasi murni pada rentang `@media (min-width: 1024px) and (max-width: 1439px)` tanpa memengaruhi tampilan layar tablet/mobile (`< 1024px`) atau desktop lebar (`>= 1440px`).
4. Kode bersih, teruji, dan siap dipakai langsung pada proyek.

---

## 6. Output Rule
Jangan berikan deskripsi penjelasannya, tetapi lakukan perbaikan kode saja agar hemat token/credit.
