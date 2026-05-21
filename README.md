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

### How it actually helps you

Instead of manually copying data from Google Maps one by one, Lead Finder:

- Automatically collects **name, address, phone, website and social profiles** for each business
- Flags every business without an online presence with a red `NO WEBSITE` badge
- Lets you **export everything to CSV** — already formatted and ready for Excel or your CRM
- Shows the full details of each lead in one click, including a direct Google Maps link

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **Automatic scraping** | Browses Google Maps via Selenium — no API key, completely free |
| 🏙️ **Multi-city** | Search across multiple cities at once |
| 🗂️ **Multi-category** | Combine multiple business categories in a single search |
| 📊 **Live dashboard** | Real-time counter of leads found during scraping |
| 🚨 **NO WEBSITE filter** | Instantly isolate businesses with no online presence |
| 📞 **Advanced filters** | Filter by phone, email or website availability |
| 📁 **CSV export** | Export all leads or only selected ones, Excel-ready |
| 🔎 **Quick search** | Filter results in real time by name, city or category |
| 📋 **Lead detail panel** | View all data for a lead in a side drawer |
| 🌐 **Direct links** | Open the business website or Google Maps in one click |
| 🖥️ **Premium SaaS design** | Elegant dark mode inspired by Stripe, Vercel and Linear |
| 🔄 **Demo mode** | Works without backend for testing and presentations |

---

## 📸 Preview

```
┌─────────────────────────────────────────────────────────────────┐
│  🎯 Lead Finder  [MVP]  [Backend live]            47 leads found│
├──────────────────────┬──────────────────────────────────────────┤
│                      │  🔍 Filter...   [Export selected]  [CSV] │
│  How to use          ├──────────────────────────────────────────┤
│  1. Add cities       │  Name            Category   Status       │
│  2. Add categories   │  ──────────────────────────────────────  │
│  3. Set limit        │  Pizza Roma       Restaurant  ✅ HAS WEB │
│  4. Start scraping   │  Gym Milano       Gym         🔴 NO WEB  │
│                      │  Studio Napoli    Dentist     🔴 NO WEB  │
│  ─────────────────── │  ...                                     │
│                      │                                          │
│  Search businesses   │                                          │
│  [London] [Paris] ×  │                                          │
│  [Restaurant] ×      │                                          │
│                      │                                          │
│  Results: [25]       │                                          │
│                      │                                          │
│  ☑ Only no website   │                                          │
│                      │                                          │
│  [▶ START SCRAPING]  │                                          │
└──────────────────────┴──────────────────────────────────────────┘
```

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
cd lead-finder
```

### 2. Set up the backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# 🪟 Windows:
venv\Scripts\activate
# 🍎 Mac / 🐧 Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

> ChromeDriver is downloaded automatically on first run — no manual setup needed.

### 3. Set up the frontend

```bash
cd ../front-end
npm install
```

---

## ▶️ Running the app

You need **two terminals open** at the same time.

### Terminal 1 — Flask backend

```bash
cd backend
venv\Scripts\activate          # Windows
source venv/bin/activate       # Mac/Linux

python app.py
```

When you see `* Running on http://0.0.0.0:5000` the backend is ready ✅

### Terminal 2 — React frontend

```bash
cd front-end
npm run dev
```

When you see `Local: http://localhost:3000/` open your browser at **http://localhost:3000** ✅

---

### 🪟 Windows — quick start

Instead of the manual commands, use the included `.bat` files:

- Double-click **`start-backend.bat`** → installs everything and starts Flask
- Double-click **`start-frontend.bat`** → installs everything and starts Vite

---

## 🕹️ How to use

```
1️⃣  Add cities        →  London, Manchester, Birmingham...
2️⃣  Add categories    →  Restaurant, Gym, Dentist...
3️⃣  Set result limit  →  10 / 25 / 50 / 100 / 200
4️⃣  Set filters       →  Only no website, only with phone...  (optional)
5️⃣  Click START SCRAPING  →  Chrome opens in background and browses Google Maps
6️⃣  Wait 2-5 minutes  →  the live counter shows leads found in real time
7️⃣  Filter, view details, export CSV  →  done!
```

---

## 🗂️ Project structure

```
lead-finder/
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
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles + animations
│   ├── package.json
│   ├── vite.config.js      # Proxy /api → localhost:5000
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── start-backend.bat       # Windows quick start (backend)
├── start-frontend.bat      # Windows quick start (frontend)
└── README.md
```

---

## 🔌 API Reference

### `GET /api/health`

```json
{ "status": "ok", "service": "Lead Finder API" }
```

### `POST /api/scrape`

**Request body:**
```json
{
  "cities": ["London", "Manchester"],
  "categories": ["Restaurant", "Gym"],
  "limit": 25
}
```

**Response:**
```json
{
  "leads": [
    {
      "id": "lead-a3f8c2",
      "name": "The Great Pizza Co.",
      "category": "Restaurant",
      "city": "London",
      "address": "42 High Street",
      "phone": "+44 20 7946 0123",
      "email": "hello@greatpizza.co.uk",
      "website": "https://greatpizza.co.uk",
      "instagram": "greatpizzaco",
      "facebook": "greatpizzaco"
    }
  ],
  "count": 25,
  "duration": 47.3
}
```

---

## 📋 CSV Export

The exported CSV uses `;` as separator and UTF-8 BOM encoding for **immediate Excel compatibility** — just open it, no configuration needed.

**Columns:** Name · Category · City · Address · Phone · Email · Website · Instagram · Facebook · Status

---

## ⚠️ Important notes

- **Scraping respects public data** — only collects information visible on Google Maps
- **Google may throttle** automated requests: if you get 0 results, wait a few minutes and try again
- **First scrape** may take 2-5 minutes — Chrome is working in the background on Google Maps
- **Demo mode**: if the backend is not running, the app generates sample data locally for testing

---


<div align="center">

Built with ❤️ for freelancers and digital agencies

⭐ If this helps you, leave a star!

</div>
