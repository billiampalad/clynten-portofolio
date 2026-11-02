# MASTER PROMPT: STANDARISASI RESPONSIVE LAYAR MOBILE (MAX-WIDTH: 767px)
# MODEL TATA LETAK TERKUNCI & SKALA PROPORSIONAL FLUIDA 2D (LOCKED MASTER ANCHOR 767px)

## 1. Role
Bertindaklah sebagai Senior Frontend Performance Architect dan Specialist Mobile Responsive UI Optimization (Ahli Modern CSS Grid/Flexbox, Tailwind CSS Media Queries, Fluid Scaling Mathematics, 2D Viewport Adaptation Width & Dynamic Viewport Height `dvh`/`svh`, Mobile Touch Ergonomics, dan GPU Hardware-Accelerated Mobile Compositing). Fokus utama Anda adalah mengunci konsistensi tata letak pada seluruh rentang layar ponsel pintar (*smartphone*) dengan patokan utama master anchor **`767px`** (resolusi acuan maksimal mobile sebelum masuk ke tablet 768px). Ketika lebar layar diturunkan dari `767px` hingga batas terkecil `360px`–`320px` (dan tinggi dari `932px` ke `667px`–`568px`), komposisi visual, hierarki, dan tata letak **100% SAMA PERSIS (identik)** tanpa lompatan atau pergeseran posisi (*zero layout shift*), hanya dimensinya (ukuran kartu, tipografi, padding, margin, gap, HUD telemetry) yang mengecil secara proporsional dan fluida mengikuti ukuran lebar dan tinggi layar.

---

## 2. Task
1. Lakukan standarisasi, kalibrasi skala proporsional fluida dua dimensi (lebar dan tinggi), dan perbaikan styling CSS/Tailwind khusus untuk rentang viewport mobile (`max-width: 767px`).
2. Kunci tata letak utama pada acuan master **`767px`** (maksimal). Saat viewport menyusut ke batas ponsel kecil (`360px` hingga `320px`), seluruh elemen mengecil proporsional secara linier (~46.9% pada 360px dan ~41.7% pada 320px dari ukuran di 767px).
3. **Hilangkan segala bentuk pemecahan breakpoint sekunder bertingkat** (seperti pemisahan acak 480px, 540px, 640px `sm:`, dsb. yang memicu perbedaan tampilan dan pergeseran mendadak di antara berbagai merk ponsel). Seluruh rentang mobile `<= 767px` harus menggunakan **satu aturan posisi, grid, dan skala fluida yang seragam**.
4. Tangani adaptasi tinggi layar (*viewport height*): untuk card, vertical spacing, full-screen stage/sections, dan telemetry widgets, gunakan interpolasi berbasis `dvh`/`vh` atau `clamp()` tinggi agar baik pada layar panjang (tinggi 932px/844px) maupun layar pendek (tinggi 667px/568px) elemen tidak bertumpuk (*overlap*), tidak meluber (*horizontal overflow*), dan tidak terpotong.
5. Pastikan seluruh aturan mobile terisolasi murni pada rentang `@media only screen and (max-width: 767px)` (Tailwind `max-md:...` atau utilitas mobile default yang ditimpa oleh `md:...`) tanpa merusak atau mengubah aturan tablet (`768px - 1023px`) maupun laptop/desktop (`>= 1024px`).
6. Pertahankan kenyamanan interaksi sentuh (*touch target*): tombol dan elemen interaktif minimal berukuran $44 \times 44\text{px}$ area sentuh dengan performa animasi 60fps–120fps yang hemat daya baterai.

---

## 3. Context & Formula Skala Proporsional

### A. Target Breakpoint Spesifik
- **Rentang Target Mobile:** `@media only screen and (max-width: 767px)`
- **Master Anchor Utama (Locked Anchor):** `767px` lebar $\times$ `844px` / `667px` tinggi (Nilai maksimal layar smartphone sebelum masuk ke breakpoint tablet `768px+`).
- **Batas Standar Flagship:** `390px`–`430px` lebar $\times$ `844px`–`932px` tinggi (iPhone 14/15/16 series, Galaxy S modern).
- **Batas Standar Mobile Umum:** `360px` lebar $\times$ `800px` tinggi (Android viewport standar).
- **Batas Minimum Ponsel Sempit:** `320px` lebar $\times$ `568px`–`667px` tinggi (iPhone SE 1st gen, Galaxy Fold cover screen).

### B. Rumus Skala Fluida Lebar (Width Interpolation Formula)
Untuk memastikan elemen menyusut mulus dari `767px` ke `360px`/`320px` tanpa layout shift:
$$\text{Scale Ratio (Width)} = \frac{\text{Viewport Width}}{767\text{px}} \quad (1.00 \text{ pada } 767\text{px} \searrow 0.4694 \text{ pada } 360\text{px} \searrow 0.4172 \text{ pada } 320\text{px})$$

Dalam implementasi CSS / Tailwind:
```css
/* Rumus CSS clamp linier lebar: */
/* clamp(Nilai_Min_360, (Nilai_767 / 767 * 100)vw, Nilai_767) */
/* Contoh: Card dengan lebar 280px pada 767px menyusut ke 140px pada 360px */
width: clamp(140px, 36.51vw, 280px);
```

### C. Rumus Skala Fluida Tinggi (Height Adaptation Formula - `dvh`/`vh`)
Untuk elemen vertikal (tinggi hero/stage, padding vertikal, margin antarbagian, gap antarkartu):
$$\text{Scale Ratio (Height)} = \frac{\text{Viewport Height}}{844\text{px}} \quad (1.00 \text{ pada } 844\text{px} \searrow 0.79 \text{ pada } 667\text{px})$$

Dalam implementasi CSS / Tailwind (mengutamakan `dvh` untuk mengatasi address bar mobile browser):
```css
/* Rumus CSS clamp linier tinggi: */
/* clamp(Nilai_Min_Height, (Nilai_844 / 844 * 100)dvh, Nilai_844) */
/* Contoh: Padding vertikal 20px pada tinggi 844px menyusut ke 15px pada tinggi 667px */
padding-top: clamp(15px, 2.37dvh, 20px);
```

### D. Rumus Skala Fluida 2D Terpadu (Lebar & Tinggi)
Untuk section layar penuh (`100dvh`) agar tidak tumpang tindih baik di ponsel panjang maupun pendek:
```css
/* clamp(Nilai_Min, min((Nilai_767 / 767 * 100)vw, (Nilai_844 / 844 * 100)dvh), Nilai_767) */
```

### E. Tabel Konversi Nilai Anchor (767px $\to$ 360px)
| Ukuran di 767px | Skala di 360px (~0.47x - 0.7x safe) | Skala Tinggi di 667px (~0.79x) | Formula CSS Clamp (Width) | Formula CSS Clamp (Height) |
| :--- | :--- | :--- | :--- | :--- |
| **8px** (Subtext / Badge) | 6px *(keterbacaan min)* | 6px | `clamp(6px, 1.04vw, 8px)` | `clamp(6px, 0.95dvh, 8px)` |
| **10px** (Indicator / Unit) | 7.5px | 8px | `clamp(7.5px, 1.30vw, 10px)` | `clamp(8px, 1.18dvh, 10px)` |
| **12px** (Text Sm / Label) | 9px | 9.5px | `clamp(9px, 1.56vw, 12px)` | `clamp(9.5px, 1.42dvh, 12px)` |
| **14px** (Text Standard) | 10.5px | 11px | `clamp(10.5px, 1.83vw, 14px)`| `clamp(11px, 1.66dvh, 14px)` |
| **16px** (Body / Subhead) | 12px | 12.5px | `clamp(12px, 2.09vw, 16px)` | `clamp(12.5px, 1.90dvh, 16px)`|
| **20px** (Title Sm / Tag) | 14px | 15.5px | `clamp(14px, 2.61vw, 20px)` | `clamp(15.5px, 2.37dvh, 20px)`|
| **24px** (Padding / Spacing) | 15px | 18px | `clamp(15px, 3.13vw, 24px)` | `clamp(18px, 2.84dvh, 24px)` |
| **32px** (Section Gap / Margin) | 18px | 25px | `clamp(18px, 4.17vw, 32px)` | `clamp(25px, 3.79dvh, 32px)` |
| **40px** (Hero Title Sm) | 22px | 30px | `clamp(22px, 5.22vw, 40px)` | `clamp(30px, 4.74dvh, 40px)` |
| **48px** (Display Title) | 26px | 36px | `clamp(26px, 6.26vw, 48px)` | `clamp(36px, 5.69dvh, 48px)` |
| **280px** (Standard Card Width)| 140px | — | `clamp(140px, 36.51vw, 280px)`| — |
| **340px** (Full Mobile Container)| 240px | — | `clamp(240px, 44.33vw, 340px)`| — |

---

## 4. Prinsip Desain & Batasan Ketat (Strict Scope)

1. **Tata Letak & Posisi Terkunci (Locked Master Layout 767px):**
   - Komposisi tampilan di 360px/320px harus persis identik dengan 767px. Tidak boleh ada susunan flex atau grid yang tiba-tiba bergeser atau bertukar urutan saat layar menyusut.
   - Posisi absolute (`left`, `right`, `top`, `bottom`) dan transformasi (`translate-x`, `translate-y`) wajib menggunakan interpolasi `clamp()` atau persentase linier stabil agar relasi visual antar-elemen tetap konstan.

2. **Dilarang Menggunakan Stepped Breakpoint Arbitrer di Rentang Mobile:**
   - Dilarang membuat kelas pemisah arbitrer (seperti breakpoint acak 480px, 540px, dsb.) yang memicu perubahan mendadak saat layar di-resize.
   - Gunakan satu aturan `clamp()` fluida terpadu yang berlaku di seluruh batas `<= 767px`.

3. **Adaptasi Proporsi Dua Dimensi (2D Scaling - Lebar & Dynamic Viewport Height `dvh`):**
   - Desain tidak hanya menghitung lebar layar (`vw`), tetapi juga memperhatikan tinggi layar (`dvh`), khususnya pada section layar penuh seperti Hero, Projects, dan Contact.
   - Pada ponsel dengan rasio layar pendek (seperti iPhone SE tinggi 667px/568px), ukuran kartu, typography, dan padding vertikal ikut mengecil otomatis agar tidak terjadi tumpang tindih (*zero overlapping*) atau keluar dari batas layar (*zero horizontal overflow*).

4. **Performa Ringan (Hardware-Accelerated Mobile Compositing & Anti-Lag):**
   - Seluruh kalkulasi fluida ditangani native oleh CSS engine melalui `clamp()`, `calc()`, `vw`, dan `dvh`.
   - Hindari manipulasi JavaScript window resize listener untuk kalkulasi dimensi layout.
   - Gunakan `contain: paint` atau `contain: layout` pada kartu-kartu HUD untuk mengisolasi repaint saat viewport diubah.
   - Pertahankan touch-target minimal $44 \times 44\text{px}$ pada tombol interaktif tanpa mengubah ukuran visual elemen.

---

## 5. Checklist Verifikasi Stop Conditions
Tugas perbaikan mobile dianggap selesai dan valid jika:
1. Saat browser di-resize perlahan dari `767px` turun ke `360px` dan `320px`, seluruh tata letak tidak mengalami lompatan (*zero layout shift/jump*); posisi relatif elemen tetap sama persis, hanya ukurannya yang mengecil secara proporsional.
2. Ketika tinggi browser diperkecil dari `932px` ke `844px`, `667px`, atau `568px`, elemen vertikal tetap proporsional dan tidak saling bertumpuk atau terpotong.
3. Aturan styling terisolasi murni pada rentang `@media (max-width: 767px)` tanpa memengaruhi tampilan layar tablet (`768px - 1023px`) maupun laptop/desktop (`>= 1024px`).
4. Tidak ada horizontal overflow (*body* tidak dapat di-scroll ke samping).
5. Kode bersih, teruji, dan siap dipakai langsung pada proyek.

---

## 6. Output Rule
Jangan berikan deskripsi penjelasannya, tetapi lakukan perbaikan kode saja agar hemat token/credit.
