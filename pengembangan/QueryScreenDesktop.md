# MASTER PROMPT: STANDARISASI RESPONSIVE LAYAR DESKTOP (1440px - 1920px+)
# MODEL TATA LETAK TERKUNCI & SKALA PROPORSIONAL FLUIDA 2D (LOCKED MASTER ANCHOR)

## 1. Role
Bertindaklah sebagai Senior Frontend Performance Architect dan Specialist Desktop Layout Optimization (Ahli Modern CSS Grid/Flexbox, Tailwind CSS Breakpoints, Fluid Scaling Mathematics, 2D Viewport Adaptation Width & Height, dan Hardware-Accelerated Rendering). Fokus utama Anda adalah mengunci konsistensi tata letak pada seluruh rentang layar desktop dengan patokan utama master anchor `1920px` (Full HD 1920x1080). Ketika lebar layar diturunkan dari `1920px` hingga batas `1440px` (dan tinggi dari `1080px` ke `900px`), komposisi visual, hierarki, dan tata letak **100% SAMA PERSIS (identik)** tanpa lompatan atau pergeseran posisi, hanya dimensinya (ukuran kartu, tipografi, padding, margin, gap) yang mengecil secara proporsional dan fluida mengikuti ukuran lebar dan tinggi layar.

---

## 2. Task
1. Lakukan standarisasi, kalibrasi skala proporsional fluida dua dimensi (lebar dan tinggi), dan perbaikan styling CSS/Tailwind khusus untuk rentang viewport desktop (`min-width: 1440px` hingga `1920px+`).
2. Kunci tata letak utama pada acuan master `1920px` (maksimal). Saat viewport menyusut ke `1440px`, seluruh elemen mengecil proporsional secara linier (~75% dari ukuran di 1920px untuk lebar, ~83.3% untuk tinggi).
3. Hilangkan segala bentuk pemecahan breakpoint sekunder (seperti pemisahan bertingkat `min-width: 1600px` vs `min-width: 1920px` atau variasi kelas yang menyebabkan pergeseran layout mendadak). Seluruh rentang desktop 1440px–1920px harus menggunakan satu aturan posisi dan grid yang seragam.
4. Tangani adaptasi tinggi layar (viewport height): untuk card, vertical spacing, dan hero widgets, gunakan interpolasi berbasis `vh` atau `clamp()` tinggi agar pada monitor/laptop layar pendek (tinggi 900px atau 1080px) elemen tidak bertumpuk atau terpotong.
5. Untuk layar ultrawide di atas `1920px`, kunci kontainer utama pada `max-width: 1920px` dengan `margin: 0 auto` agar komposisi tetap presisi dan tidak meregang tak terbatas.
6. Pastikan seluruh aturan desktop terisolasi murni pada `@media only screen and (min-width: 1440px)` (Tailwind `2xl:` atau `[@media(min-width:1440px)]:`) tanpa merusak atau mengubah aturan laptop (`1024px - 1439px`) maupun mobile/tablet (`< 1024px`).

---

## 3. Context & Formula Skala Proporsional

### A. Target Breakpoint Spesifik
- **Rentang Target Desktop:** `@media only screen and (min-width: 1440px)` (rentang aktif 1440px hingga 1920px).
- **Master Anchor Utama (Locked Anchor):** `1920px` lebar $\times$ `1080px` tinggi (Full HD).
- **Batas Minimum Desktop:** `1440px` lebar $\times$ `900px` tinggi (Desktop standar / Layar 15-16 inci resolusi tinggi).
- **Ultrawide Safeguard (> 1920px):** `max-w-[1920px] mx-auto` untuk menjaga proporsi tetap terkunci pada master anchor.

### B. Rumus Skala Fluida Lebar (Width Interpolation Formula)
Untuk memastikan elemen menyusut mulus dari `1920px` ke `1440px` tanpa perubahan posisi:
$$\text{Scale Ratio (Width)} = \frac{\text{Viewport Width}}{1920\text{px}} \quad (1.00 \text{ pada } 1920\text{px} \searrow 0.75 \text{ pada } 1440\text{px})$$

Dalam implementasi CSS / Tailwind:
```css
/* Rumus CSS clamp linier lebar: */
/* clamp(Nilai_1440, (Nilai_1920 / 1920 * 100)vw, Nilai_1920) */
/* Contoh: Elemen lebar 400px pada 1920px menyusut ke 300px pada 1440px */
width: clamp(300px, 20.83vw, 400px);
```

### C. Rumus Skala Fluida Tinggi (Height Adaptation Formula)
Untuk elemen vertikal (tinggi card, padding vertikal, margin hero, dialog HUD):
$$\text{Scale Ratio (Height)} = \frac{\text{Viewport Height}}{1080\text{px}} \quad (1.00 \text{ pada } 1080\text{px} \searrow 0.833 \text{ pada } 900\text{px})$$

Dalam implementasi CSS / Tailwind:
```css
/* Rumus CSS clamp linier tinggi: */
/* clamp(Nilai_900, (Nilai_1080 / 1080 * 100)vh, Nilai_1080) */
/* Contoh: Tinggi card 240px pada tinggi layar 1080px menyusut ke 200px pada tinggi 900px */
height: clamp(200px, 22.22vh, 240px);
```

### D. Tabel Konversi Nilai Anchor (1920px $\to$ 1440px)
| Ukuran di 1920px | Skala Lebar (0.75x) | Skala Tinggi (0.833x) | Formula CSS Clamp (Width) | Formula CSS Clamp (Height) |
| :--- | :--- | :--- | :--- | :--- |
| **16px** (Text Sm) | 12px | 13px | `clamp(12px, 0.83vw, 16px)` | `clamp(13px, 1.48vh, 16px)` |
| **20px** (Text Base) | 15px | 17px | `clamp(15px, 1.04vw, 20px)` | `clamp(17px, 1.85vh, 20px)` |
| **24px** (Padding / Gap) | 18px | 20px | `clamp(18px, 1.25vw, 24px)` | `clamp(20px, 2.22vh, 24px)` |
| **32px** (Spacing Lg) | 24px | 26.6px | `clamp(24px, 1.67vw, 32px)` | `clamp(27px, 2.96vh, 32px)` |
| **48px** (Title / Margin) | 36px | 40px | `clamp(36px, 2.5vw, 48px)` | `clamp(40px, 4.44vh, 48px)` |
| **300px** (Card Width) | 225px | 250px | `clamp(225px, 15.62vw, 300px)` | `clamp(250px, 27.77vh, 300px)` |
| **400px** (Panel Width) | 300px | 333px | `clamp(300px, 20.83vw, 400px)` | `clamp(333px, 37.03vh, 400px)` |

---

## 4. Prinsip Desain & Batasan Ketat (Strict Scope)

1. **Tata Letak & Posisi Terkunci (Locked Master Layout):**
   - Komposisi tampilan di 1440px harus persis identik dengan 1920px. Tidak boleh ada kolom grid yang berpindah atau urutan flexbox yang berubah di antara 1440px dan 1920px.
   - Posisi absolute (`left`, `right`, `top`, `bottom`) harus menggunakan persentase atau interpolasi `clamp()` linier yang menjaga jarak proporsional terhadap kontainer acuan.

2. **Dilarang Menggunakan Stepped Breakpoint Arbitrer (1600px / 1800px / 1920px):**
   - Dilarang membuat variasi acak seperti `[@media(min-width:1600px)]:p-8 [@media(min-width:1920px)]:p-14` yang memicu perubahan mendadak saat resize.
   - Gunakan satu aturan `clamp()` fluida dari batas bawah 1440px ke batas atas 1920px.

3. **Adaptasi Proporsi Dua Dimensi (2D Scaling - Lebar & Tinggi):**
   - Desain tidak hanya menghitung lebar layar (`vw`), tetapi juga memperhatikan tinggi layar (`vh`), khususnya pada section layar penuh seperti Hero, Projects, atau modal HUD.
   - Saat tinggi layar rendah (misal 900px pada resolusi 1440x900 atau 1600x900), ukuran kartu dan padding vertikal ikut mengecil otomatis agar tidak terjadi overflow atau menabrak footer/kontrol navigasi.

4. **Performa Ringan (Hardware-Accelerated & Anti-Lag):**
   - Seluruh kalkulasi fluida ditangani native oleh CSS engine melalui `clamp()`, `calc()`, `vw`, dan `vh`.
   - Hindari manipulasi JavaScript window resize listener untuk kalkulasi dimensi layout.
   - Gunakan `contain: paint` atau `contain: layout` pada kartu-kartu HUD untuk mengisolasi repaint saat viewport diubah.

---

## 5. Checklist Verifikasi Stop Conditions
Tugas perbaikan dianggap selesai dan valid jika:
1. Saat browser di-resize perlahan dari `1920px` turun ke `1440px`, seluruh tata letak tidak mengalami lompatan (zero layout shift/jump); posisi relatif elemen tetap sama, hanya dimensinya yang mengecil secara proporsional.
2. Ketika tinggi browser diperkecil dari `1080px` ke `900px`, elemen vertikal tetap proporsional dan tidak bertumpuk atau tumpang tindih.
3. Aturan styling terisolasi murni pada rentang `@media (min-width: 1440px)` tanpa menimbulkan efek samping atau merusak rentang laptop (`1024px - 1439px`) maupun mobile/tablet (`< 1024px`).
4. Pada layar ultrawide (`> 1920px`), layout tetap rapi di tengah dengan batas maksimal `1920px` (`max-w-[1920px] mx-auto`).
5. Kode bersih, teruji, dan siap dipakai langsung pada proyek.

---

## 6. Output Rule
Jangan berikan deskripsi penjelasannya, tetapi lakukan perbaikan kode saja agar hemat token/credit.
