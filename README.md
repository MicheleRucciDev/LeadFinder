<div align="center">

# 🎯 Lead Finder Dashboard

**Scrape local businesses from Google Maps. Spot who has no website. Close more clients.**

[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=flat-square&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

*Ethical Google Maps scraping · No API key required · 100% free*

</div>

---

## 🚀 What is Lead Finder?

**Lead Finder Dashboard** is a **local lead generation tool** built for freelancers, web agencies, and digital consultants.

Pick a city and a business category (e.g. *restaurants in London*, *gyms in Manchester*) and the app **automatically browses Google Maps**, collects each business's data, and instantly shows you who already has a website — and who doesn't.

> 🎯 **Your ideal target?** Businesses with no website — they're the ones who need you most.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **Automatic scraping** | Browses Google Maps via Selenium — no API key, completely free |
| 🏙️ **Multi-city** | Search across multiple cities at once |
| 🗂️ **Multi-category** | Combine multiple business categories in a single search |
| 📊 **Live dashboard** | Real-time counter of leads found during scraping |
| 🚨 **NO WEBSITE Badge** | Instantly spot businesses with no online presence |
| 📞 **Advanced filters** | Filter by phone, email or website availability |
| 📁 **CSV export** | Export all leads or selected ones, Excel-ready |
| 🖥️ **GUI Launcher** | Start everything with one click — no terminal needed |

---

## ⚙️ Prerequisites

Make sure you have these installed before getting started:

| Tool | Minimum version | Download |
|------|----------------|----------|
| 🐍 Python | 3.9+ | [python.org](https://www.python.org/downloads/) |
| 🟢 Node.js | 18+ | [nodejs.org](https://nodejs.org/) |
| 🌐 Google Chrome | any recent version | usually already installed |

> **Windows users**: during Python installation, check ✅ **"Add Python to PATH"**

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/MicheleRucciDev/LeadFinder.git
cd LeadFinder
```

### 2. Run the setup (first time only)

**🪟 Windows:**
```
Double-click SETUP.bat
```

**🍎 Mac / 🐧 Linux:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ../front-end
npm install
```

---

## ▶️ Running the app

### 🪟 Windows — GUI Launcher

Double-click **`START.bat`** → the Lead Finder launcher opens.

From the launcher you can:
- **▶ START** → starts backend + frontend + opens browser automatically
- **⏹ STOP** → stops everything cleanly
- **🌐 Open in browser** → reopens `http://localhost:3000`
- **🖥 Create Desktop Shortcut** → one-click shortcut on your Desktop

### 🍎 Mac / 🐧 Linux — Manual

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd backend
source venv/bin/activate
python app.py
```

**Terminal 2 — Frontend:**
```bash
cd front-end
npm run dev
```

Open your browser at **http://localhost:3000** ✅

---

## 🕹️ How to use

```
1️⃣  Add cities        →  London, Manchester, Rome...
2️⃣  Add categories    →  Restaurant, Gym, Dentist...
3️⃣  Set result limit  →  10 / 25 / 50 / 100 / 200
4️⃣  Set filters       →  Only no website, only with phone...  (optional)
5️⃣  Click START SCRAPING  →  Chrome opens in background and browses Google Maps
6️⃣  Wait 2-5 minutes  →  the live counter shows leads found in real time
7️⃣  Filter, view details, export CSV  →  done!
```

> **Note:** This tool is designed for freelancers and digital agencies who are comfortable installing Python and Node.js. It is not intended for non-technical end users.

---

## 🗂️ Project structure

```
LeadFinder/
│
├── 📁 backend/
│   ├── app.py              # Flask API  →  POST /api/scrape · GET /api/health
│   ├── scraper.py          # GoogleMapsScraper via Selenium
│   ├── extractor.py        # Extracts emails and social links from websites
│   └── requirements.txt
│
├── 📁 front-end/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js      # Proxy /api → localhost:5000
│
├── launcher.py             # GUI launcher (customtkinter)
├── SETUP.bat               # First-time setup (Windows)
├── START.bat               # Launch the GUI (Windows)
├── STOP.bat                # Stop all services (Windows)
└── build-exe.bat           # Compile launcher to .exe (Windows)
```

---

## 🔌 API Reference

### `GET /api/health`
```json
{ "status": "ok", "service": "Lead Finder API" }
```

### `POST /api/scrape`
```json
// Request
{ "cities": ["London", "Rome"], "categories": ["Restaurant", "Gym"], "limit": 25 }

// Response
{ "leads": [...], "count": 25, "duration": 47.3 }
```

---

## ⚠️ Important notes

- **Scraping respects public data** — only collects information visible on Google Maps
- **Google may throttle** automated requests: if you get 0 results, wait a few minutes and retry
- **First scrape** may take 2-5 minutes — Chrome works in the background on Google Maps
- **Demo mode**: if the backend is not running, the app generates sample data locally

---

## 🗺️ Roadmap

- [ ] 🌐 Cloud-hosted version (no installation needed)
- [ ] 🔐 User authentication and search history
- [ ] 🤖 AI Lead Scoring
- [ ] 📧 Integrated email automation
- [ ] 🗄️ Persistent database (PostgreSQL / Supabase)
- [ ] 💳 Plans and payments

---

## 📄 License

[MIT](LICENSE) — free to use, modify and distribute.

---

<div align="center">

Built with ❤️ by [Michele Rucci](https://github.com/MicheleRucciDev)

⭐ If this helps you, leave a star!

</div>
