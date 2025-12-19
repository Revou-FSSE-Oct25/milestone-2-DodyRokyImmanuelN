[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/PAiQDgnZ)

# 🎮 RevoFun – Simple Browser Games Platform

## 📌 Overview Project

**RevoFun** adalah sebuah platform landing page interaktif yang menyediakan koleksi game sederhana berbasis web. Project ini dikembangkan sebagai bagian dari **Module 3 Assignment** dengan fokus pada penerapan fundamental **TypeScript**, **DOM Manipulation**, **Event Handling**, dan **Asynchronous Programming**.

Website ini dirancang dengan estetika _Glassmorphism_ yang modern, memberikan pengalaman bermain yang ringan dan responsif langsung dari browser tanpa perlu instalasi tambahan.

## 🎯 Project Objectives

Tujuan utama pengembangan RevoFun adalah:

- Menampilkan landing page perusahaan game dengan desain modern menggunakan **Tailwind CSS**.
- Menerapkan konsep **Type-Safety** menggunakan TypeScript untuk logika permainan yang lebih solid dan minim error.
- Mengimplementasikan fitur penyimpanan skor (High Score) melalui **Browser LocalStorage**.
- Melatih manajemen struktur proyek yang modular dan terorganisir menggunakan build tool **Vite**.

## 🕹️ Available Games

### 1️⃣ Number Guessing (Tebak Angka)

- **Deskripsi**: Komputer memilih angka acak antara 1–100. Pemain memiliki maksimal 5 kesempatan untuk menebak angka tersebut dengan bantuan feedback "Terlalu Besar" atau "Terlalu Kecil".
- **Konsep JS/TS**: `Math.random()`, Conditional statements (if-else), DOM manipulation, Event handling.

### 2️⃣ RPS Arena (Rock, Paper, Scissors)

- **Deskripsi**: Duel klasik melawan komputer dengan sistem _Best of Three_. Pemenang ditentukan berdasarkan aturan klasik, dan skor akumulasi ditampilkan secara real-time.
- **Konsep JS/TS**: Arrays, Switch-case, Logic Operators, localStorage, Dynamic CSS Classes.

### 3️⃣ Clicker Speed (Klik Game)

- **Deskripsi**: Uji kecepatan reaksi pemain dalam batas waktu 10 detik. Setiap klik menambah skor, dan sistem akan memberikan peringkat (Rank) berdasarkan kecepatan klik pemain.
- **Konsep JS/TS**: `setInterval()` & `setTimeout()`, DOM manipulation, Event handling, localStorage.

## 🧰 Technologies Used

- **Vite** – Frontend Tooling & Bundler untuk pengembangan yang cepat.
- **TypeScript (Vanilla TS)** – Bahasa pemrograman utama untuk logika game yang terstruktur.
- **Tailwind CSS** – Framework CSS untuk styling UI yang modern dan responsif.
- **Browser LocalStorage** – Digunakan untuk menyimpan skor tertinggi dan data pemain.

## 📁 Project Structure

Sesuai dengan arsitektur folder pada workspace:

```text
RevoFun/
├── games/
│   ├── clicker/         # Game Clicker (index.html & main.ts)
│   ├── numberguessing/  # Game Tebak Angka (index.html & main.ts)
│   └── rps/             # Game Rock Paper Scissors (index.html & main.ts)
├── public/img/          # Asset gambar (game previews & hero image)
├── src/
│   ├── styles/          # Global styles (main.css)
│   └── ts/              # Logika dashboard (carousel.ts & main.ts)
├── index.html           # Landing Page Utama
├── package.json         # Konfigurasi dependensi Node.js
├── tailwind.config.js   # Konfigurasi framework Tailwind
└── README.md            # Dokumentasi Project


```

## 🚀 Cara Penggunaan

```bash
npm install
npm run dev
```
