import React, { useState, useMemo } from 'react';

const Icons = {
  Search: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Database: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  Download: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  MapPin: () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Close: () => (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Info: () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Wifi: () => (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    </svg>
  ),
};

const CITY_SUGGESTIONS = ["Milano", "Roma", "Firenze", "Torino", "Napoli", "Bologna", "Venezia", "Bari", "Palermo"];
const CATEGORY_SUGGESTIONS = ["Ristorante", "Palestra", "Dentista", "Hotel", "Parrucchiere", "Studio Legale", "Centro Estetico", "Pasticceria"];

function generateDemoLeads(cities, categories, limit) {
  const brandModifiers = ["Centrale", "Duomo", "Express", "Premium", "Elite", "Verde", "Vanchiglia", "Sempione", "Trastevere", "Novoli", "Garibaldi"];
  const streets = ["Via Roma", "Corso Italia", "Viale Europa", "Via Dante", "Via Garibaldi", "Piazza Duomo", "Via Mazzini", "Corso Vittorio"];
  const domains = [".it", ".com", ".net"];
  const results = [];
  for (let i = 0; i < limit; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = brandModifiers[Math.floor(Math.random() * brandModifiers.length)];
    const suffix = Math.floor(Math.random() * 90) + 10;
    const name = `${category} ${brand} ${suffix}`;
    const slug = name.toLowerCase().replace(/\s+/g, '');
    const hasWebsite = Math.random() > 0.45;
    const hasPhone = Math.random() > 0.15;
    const hasEmail = hasWebsite && Math.random() > 0.4;
    results.push({
      id: `demo-${Date.now()}-${i}`,
      name, category, city,
      address: `${streets[Math.floor(Math.random() * streets.length)]} ${Math.floor(Math.random() * 210) + 1}`,
      phone: hasPhone ? `+39 0${Math.floor(Math.random() * 8) + 2} ${Math.floor(Math.random() * 9000000) + 1000000}` : "",
      email: hasEmail ? `info@${slug}${domains[Math.floor(Math.random() * domains.length)]}` : "",
      website: hasWebsite ? `https://www.${slug}${domains[Math.floor(Math.random() * domains.length)]}` : "",
      instagram: Math.random() > 0.4 ? `${slug}_official` : "",
      facebook: Math.random() > 0.6 ? `${slug}` : "",
    });
  }
  return results;
}

export default function App() {
  const [leads, setLeads] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeadIds, setSelectedLeadIds] = useState(new Set());

  const [cities, setCities] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");

  const [scrapingLimit, setScrapingLimit] = useState(25);
  const [onlyNoWebsite, setOnlyNoWebsite] = useState(false);
  const [filterWithPhone, setFilterWithPhone] = useState(false);
  const [filterWithEmail, setFilterWithEmail] = useState(false);

  const [isScraping, setIsScraping] = useState(false);
  const [scrapingProgress, setScrapingProgress] = useState(0);
  const [liveCount, setLiveCount] = useState(0);
  const [liveStatus, setLiveStatus] = useState('');
  const [backendOnline, setBackendOnline] = useState(null);

  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAddCity = (v) => {
    const c = v.trim();
    if (c && !cities.some(x => x.toLowerCase() === c.toLowerCase())) setCities([...cities, c]);
    setCityInput("");
  };
  const handleRemoveCity = (city) => setCities(cities.filter(c => c !== city));
  const handleAddCategory = (v) => {
    const c = v.trim();
    if (c && !categories.some(x => x.toLowerCase() === c.toLowerCase())) setCategories([...categories, c]);
    setCategoryInput("");
  };
  const handleRemoveCategory = (cat) => setCategories(categories.filter(c => c !== cat));

  const runScrapingSimulation = async () => {
    if (isScraping) return;
    if (cities.length === 0) { showToast("Inserisci almeno una città."); return; }
    if (categories.length === 0) { showToast("Inserisci almeno una categoria."); return; }

    // Reset tutto per la nuova ricerca
    setLeads([]);
    setHasSearched(true);
    setSelectedLeadIds(new Set());
    setIsScraping(true);
    setScrapingProgress(5);
    setLiveCount(0);

    // Messaggi di stato ciclici
    const buildStatuses = () => {
      const msgs = ['Connessione a Google Maps...'];
      cities.forEach(city => categories.forEach(cat => {
        msgs.push(`Ricerca "${cat}" a ${city}...`);
        msgs.push(`Analisi risultati per ${city}...`);
      }));
      msgs.push('Estrazione dati di contatto...', 'Verifica presenza online...', 'Raccolta lead in corso...');
      return msgs;
    };
    const statuses = buildStatuses();
    let sIdx = 0;
    setLiveStatus(statuses[0]);

    const statusInterval = setInterval(() => {
      sIdx = (sIdx + 1) % statuses.length;
      setLiveStatus(statuses[sIdx]);
    }, 2200);

    // Contatore live simulato (incrementa verso il limite)
    let fakeCount = 0;
    const counterInterval = setInterval(() => {
      fakeCount = Math.min(fakeCount + Math.floor(Math.random() * 2 + 0.3), scrapingLimit - 1);
      setLiveCount(fakeCount);
    }, 900);

    // Progress bar
    let progress = 5;
    const progressInterval = setInterval(() => {
      progress = Math.min(88, progress + Math.random() * 3 + 1);
      setScrapingProgress(Math.floor(progress));
    }, 600);

    try {
      const resp = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cities, categories, limit: scrapingLimit }),
        signal: AbortSignal.timeout(300000),
      });

      clearInterval(statusInterval);
      clearInterval(counterInterval);
      clearInterval(progressInterval);

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${resp.status}`);
      }

      const data = await resp.json();
      setScrapingProgress(100);
      setLiveCount(data.count);
      setLiveStatus(`Completato — ${data.count} lead trovati in ${data.duration}s`);
      setBackendOnline(true);
      setLeads(data.leads); // Sostituisce, non accumula

      showToast(`Scraping completato! Trovati ${data.count} lead in ${data.duration}s.`);

    } catch (err) {
      clearInterval(statusInterval);
      clearInterval(counterInterval);
      clearInterval(progressInterval);

      const demoLeads = generateDemoLeads(cities, categories, scrapingLimit);
      setScrapingProgress(100);
      setLiveCount(demoLeads.length);
      setLiveStatus(`Modalità demo — ${demoLeads.length} lead generati`);
      setBackendOnline(false);
      setLeads(demoLeads);

      showToast("Backend offline — modalità DEMO attiva. Avvia backend/app.py per dati reali.");
    } finally {
      setIsScraping(false);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = lead.name.toLowerCase().includes(q) ||
        lead.category.toLowerCase().includes(q) ||
        lead.city.toLowerCase().includes(q);
      const matchesNoWeb = !onlyNoWebsite || !lead.website;
      const matchesPhone = !filterWithPhone || !!lead.phone;
      const matchesEmail = !filterWithEmail || !!lead.email;
      return matchesSearch && matchesNoWeb && matchesPhone && matchesEmail;
    });
  }, [leads, searchQuery, onlyNoWebsite, filterWithPhone, filterWithEmail]);

  // CSV con separatore ";" e BOM UTF-8 → Excel lo apre già in colonne
  const exportToCSV = (targetList, label = "database") => {
    if (targetList.length === 0) { showToast("Nessun lead da esportare."); return; }

    const SEP = ";";
    const headers = ["Nome Attivita", "Categoria", "Citta", "Indirizzo", "Telefono", "Email", "Sito Web", "Instagram", "Facebook", "Stato"];
    const rows = targetList.map(l => [
      l.name, l.category, l.city, l.address,
      l.phone || "", l.email || "", l.website || "",
      l.instagram || "", l.facebook || "",
      l.website ? "HAS WEBSITE" : "NO WEBSITE",
    ]);

    const escape = (v) => `"${String(v).replace(/"/g, '""')}"`;
    const csvBody = [
      headers.map(escape).join(SEP),
      ...rows.map(r => r.map(escape).join(SEP)),
    ].join("\r\n");

    // BOM UTF-8 per compatibilità Excel italiano
    const blob = new Blob(["﻿" + csvBody], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leadfinder_${label}_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Esportati ${targetList.length} lead con successo!`);
  };

  const handleSelectLead = (id) => {
    const copy = new Set(selectedLeadIds);
    copy.has(id) ? copy.delete(id) : copy.add(id);
    setSelectedLeadIds(copy);
  };
  const toggleAllLeads = (e) => {
    setSelectedLeadIds(e.target.checked ? new Set(filteredLeads.map(l => l.id)) : new Set());
  };
  const deleteSelected = () => {
    setLeads(prev => prev.filter(l => !selectedLeadIds.has(l.id)));
    setSelectedLeadIds(new Set());
    showToast("Elementi selezionati rimossi.");
  };

  const activeLead = useMemo(() => leads.find(l => l.id === selectedLeadId), [leads, selectedLeadId]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 antialiased">

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-800 bg-slate-950/90 shadow-xl backdrop-blur text-xs font-semibold text-indigo-300 max-w-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping flex-shrink-0"></span>
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 h-14 border-b border-slate-900 bg-[#030712]/95 backdrop-blur-md px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/10">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-tight text-white">Lead Finder</span>
            <span className="text-[10px] px-1.5 py-0.5 bg-slate-900 text-slate-400 rounded border border-slate-800 font-semibold uppercase">MVP</span>
            {backendOnline !== null && (
              <span className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border font-semibold ${backendOnline ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                <Icons.Wifi />
                {backendOnline ? 'Backend live' : 'Demo mode'}
              </span>
            )}
          </div>
        </div>
        <div className="text-[10px] text-slate-600 font-mono">
          {hasSearched ? `${filteredLeads.length} lead trovati` : 'Nessuna ricerca effettuata'}
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left column */}
        <section className="lg:col-span-4 space-y-4">

          {/* Come si usa */}
          <div className="rounded-xl border border-slate-900 bg-[#090D1A]/40 p-4 space-y-3">
            <div className="flex items-center gap-1.5 text-indigo-400">
              <Icons.Info />
              <span className="text-[10px] font-bold uppercase tracking-widest">Come si usa</span>
            </div>
            <ol className="space-y-2">
              {[
                { n: '1', text: 'Aggiungi le città dove vuoi cercare attività' },
                { n: '2', text: 'Aggiungi le categorie commerciali (es. Ristorante, Palestra)' },
                { n: '3', text: 'Scegli quanti risultati vuoi estrarre' },
                { n: '4', text: 'Attiva i filtri se vuoi solo lead senza sito web' },
                { n: '5', text: 'Clicca Avvia Scraping — lo scraper apre Chrome in background e sfoglia Google Maps' },
                { n: '6', text: 'Filtra, visualizza i dettagli ed esporta in CSV' },
              ].map(({ n, text }) => (
                <li key={n} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-600/20 border border-indigo-600/30 text-indigo-400 text-[9px] font-bold flex items-center justify-center mt-0.5">{n}</span>
                  <span className="text-[11px] text-slate-400 leading-relaxed">{text}</span>
                </li>
              ))}
            </ol>
            <p className="text-[10px] text-slate-600 border-t border-slate-900 pt-2 mt-1">
              💡 La prima ricerca può richiedere 2-5 minuti — Chrome lavora in background su Google Maps.
            </p>
          </div>

          {/* Form */}
          <div className="rounded-xl border border-slate-900 bg-[#090D1A]/60 p-5 space-y-4 shadow-sm backdrop-blur">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Ricerca Attività Locali</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">Definisci parametri per l'estrazione.</p>
            </div>

            {/* Cities */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Città target</label>
              <div className="flex flex-wrap gap-1.5 p-2 bg-slate-950 border border-slate-800 rounded-lg min-h-[42px] items-center focus-within:border-indigo-600 transition-colors">
                {cities.map((city, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-900 text-slate-300 rounded text-xs border border-slate-800">
                    {city}
                    <button type="button" onClick={() => handleRemoveCity(city)} className="text-slate-500 hover:text-rose-400 transition-colors"><Icons.Close /></button>
                  </span>
                ))}
                <input type="text" value={cityInput}
                  onChange={e => setCityInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddCity(cityInput); } }}
                  placeholder={cities.length === 0 ? "Scrivi e premi Invio..." : "Altra città..."}
                  className="bg-transparent flex-1 outline-none border-none text-xs text-slate-200 placeholder:text-slate-600 min-w-[80px]" />
              </div>
              <div className="flex flex-wrap gap-1">
                {CITY_SUGGESTIONS.map(item => {
                  const sel = cities.some(c => c.toLowerCase() === item.toLowerCase());
                  return (
                    <button key={item} type="button" disabled={sel} onClick={() => handleAddCity(item)}
                      className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${sel ? 'text-slate-700 bg-slate-950 cursor-not-allowed' : 'text-slate-500 hover:text-indigo-400 hover:bg-slate-900 bg-slate-950/40 border border-slate-900/60'}`}>
                      + {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Categorie commerciali</label>
              <div className="flex flex-wrap gap-1.5 p-2 bg-slate-950 border border-slate-800 rounded-lg min-h-[42px] items-center focus-within:border-indigo-600 transition-colors">
                {categories.map((cat, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-900 text-slate-300 rounded text-xs border border-slate-800">
                    {cat}
                    <button type="button" onClick={() => handleRemoveCategory(cat)} className="text-slate-500 hover:text-rose-400 transition-colors"><Icons.Close /></button>
                  </span>
                ))}
                <input type="text" value={categoryInput}
                  onChange={e => setCategoryInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddCategory(categoryInput); } }}
                  placeholder={categories.length === 0 ? "Scrivi e premi Invio..." : "Altra categoria..."}
                  className="bg-transparent flex-1 outline-none border-none text-xs text-slate-200 placeholder:text-slate-600 min-w-[80px]" />
              </div>
              <div className="flex flex-wrap gap-1">
                {CATEGORY_SUGGESTIONS.map(item => {
                  const sel = categories.some(c => c.toLowerCase() === item.toLowerCase());
                  return (
                    <button key={item} type="button" disabled={sel} onClick={() => handleAddCategory(item)}
                      className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${sel ? 'text-slate-700 bg-slate-950 cursor-not-allowed' : 'text-slate-500 hover:text-indigo-400 hover:bg-slate-900 bg-slate-950/40 border border-slate-900/60'}`}>
                      + {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Limit */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Numero Risultati Richiesti</label>
              <div className="grid grid-cols-5 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                {[10, 25, 50, 100, 200].map(num => (
                  <button key={num} type="button" onClick={() => setScrapingLimit(num)}
                    className={`py-1 rounded text-xs font-semibold font-mono transition-all ${scrapingLimit === num ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-200'}`}>
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="pt-2 space-y-3 border-t border-slate-900">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Filtri di qualificazione</label>
              <div className="space-y-2">
                {[
                  { state: onlyNoWebsite, setter: setOnlyNoWebsite, label: "Solo senza sito web" },
                  { state: filterWithPhone, setter: setFilterWithPhone, label: "Solo con numero telefono" },
                  { state: filterWithEmail, setter: setFilterWithEmail, label: "Solo con indirizzo e-mail" },
                ].map(({ state, setter, label }) => (
                  <label key={label} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" checked={state} onChange={e => setter(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-0 bg-slate-900 border-slate-800" />
                    <span className="text-xs font-medium text-slate-200 group-hover:text-white">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Live scraping panel */}
            {isScraping && (
              <div className="rounded-lg border border-indigo-900/40 bg-indigo-950/20 p-4 space-y-3">
                {/* Status message */}
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping flex-shrink-0"></span>
                  <span className="text-[11px] text-indigo-300 font-medium">{liveStatus}</span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-500"
                      style={{ width: `${scrapingProgress}%` }} />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-600 font-mono">
                    <span>{scrapingProgress}%</span>
                    <span>target: {scrapingLimit}</span>
                  </div>
                </div>

                {/* Live counter */}
                <div className="flex items-end gap-1.5">
                  <span className="text-2xl font-black text-white tabular-nums leading-none">{liveCount}</span>
                  <span className="text-[10px] text-slate-500 mb-0.5">lead trovati finora</span>
                </div>

                {/* Cities/categories being searched */}
                <div className="flex flex-wrap gap-1">
                  {cities.map(c => (
                    <span key={c} className="text-[9px] px-1.5 py-0.5 bg-slate-900 text-slate-400 rounded border border-slate-800">{c}</span>
                  ))}
                  {categories.map(c => (
                    <span key={c} className="text-[9px] px-1.5 py-0.5 bg-indigo-900/30 text-indigo-400 rounded border border-indigo-900/40">{c}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Last search summary (after scraping done) */}
            {!isScraping && hasSearched && liveStatus && (
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                <span className="text-[10px] text-slate-400">{liveStatus}</span>
              </div>
            )}

            {/* Button */}
            <div className="pt-1">
              <button type="button" onClick={runScrapingSimulation} disabled={isScraping}
                className={`w-full py-2.5 rounded-lg font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 ${isScraping
                  ? 'bg-indigo-600/10 text-indigo-400 cursor-not-allowed border border-indigo-900/30'
                  : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg shadow-indigo-600/10'}`}>
                {isScraping ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Scraping in corso...</span>
                  </>
                ) : (
                  <>
                    <Icons.Sparkles />
                    <span>{hasSearched ? 'NUOVA RICERCA' : 'AVVIA SCRAPING'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Right column */}
        <section className="lg:col-span-8 space-y-4">

          {/* Action bar */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-[#090D1A]/40 p-4 rounded-xl border border-slate-900 backdrop-blur">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-600">
                <Icons.Search />
              </div>
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filtra per nome, città, tipo..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-600" />
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
              {selectedLeadIds.size > 0 && (
                <button onClick={deleteSelected}
                  className="p-1.5 bg-rose-950/20 text-rose-400 border border-rose-900/60 hover:bg-rose-950/40 rounded-lg transition-colors" title="Elimina Selezionati">
                  <Icons.Trash />
                </button>
              )}
              <button onClick={() => exportToCSV(leads.filter(l => selectedLeadIds.has(l.id)), "selezionati")}
                disabled={selectedLeadIds.size === 0}
                className={`px-3 py-1.5 border text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${selectedLeadIds.size > 0 ? 'bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border-indigo-600/30' : 'bg-slate-950 text-slate-600 border-slate-900 cursor-not-allowed'}`}>
                <Icons.Download />
                <span>Export selected ({selectedLeadIds.size})</span>
              </button>
              <button onClick={() => exportToCSV(filteredLeads, "all")}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5">
                <Icons.Download />
                <span>Export all ({filteredLeads.length})</span>
              </button>
            </div>
          </div>

          {/* Results table */}
          <div className="rounded-xl border border-slate-900 bg-[#090D1A]/30 overflow-hidden shadow-sm">
            {!hasSearched ? (
              /* Empty state — prima ricerca */
              <div className="p-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-slate-200">Pronto per il primo scraping</h3>
                <p className="text-[12px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Aggiungi città e categorie nel pannello a sinistra, poi clicca <span className="text-indigo-400 font-semibold">Avvia Scraping</span>.<br />
                  I risultati appariranno qui.
                </p>
              </div>
            ) : isScraping ? (
              /* Loading state durante scraping */
              <div className="p-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center mx-auto">
                  <svg className="animate-spin w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-slate-200">Scraping in corso...</h3>
                <p className="text-[12px] text-slate-500">{liveStatus}</p>
                <p className="text-2xl font-black text-white tabular-nums">{liveCount} <span className="text-sm font-normal text-slate-500">lead trovati</span></p>
              </div>
            ) : filteredLeads.length === 0 ? (
              /* Nessun risultato con i filtri attivi */
              <div className="p-12 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-slate-700 mx-auto border border-slate-900">
                  <Icons.Database />
                </div>
                <h3 className="text-xs font-bold text-slate-300">Nessun lead corrisponde ai filtri</h3>
                <p className="text-[11px] text-slate-500">Prova a rimuovere qualche filtro o fai una nuova ricerca.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-900 bg-[#090D1A]/50 text-[9px] font-extrabold text-slate-500 uppercase tracking-widest">
                      <th className="py-2.5 px-4 w-10">
                        <input type="checkbox"
                          checked={selectedLeadIds.size === filteredLeads.length && filteredLeads.length > 0}
                          onChange={toggleAllLeads}
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-0 bg-slate-900 border-slate-800 cursor-pointer" />
                      </th>
                      <th className="py-2.5 px-4">Nome Attività</th>
                      <th className="py-2.5 px-4">Categoria</th>
                      <th className="py-2.5 px-4">Città</th>
                      <th className="py-2.5 px-4">Sito Web</th>
                      <th className="py-2.5 px-4">Stato</th>
                      <th className="py-2.5 px-4 text-center">Azioni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/40 text-xs text-slate-300">
                    {filteredLeads.map(lead => {
                      const isSelected = selectedLeadIds.has(lead.id);
                      const hasWeb = !!lead.website;
                      return (
                        <tr key={lead.id} className={`hover:bg-slate-900/20 transition-colors ${isSelected ? 'bg-indigo-600/5' : ''}`}>
                          <td className="py-3.5 px-4">
                            <input type="checkbox" checked={isSelected} onChange={() => handleSelectLead(lead.id)}
                              className="w-4 h-4 rounded text-indigo-600 focus:ring-0 bg-slate-900 border-slate-800 cursor-pointer" />
                          </td>
                          <td className="py-3.5 px-4 max-w-[200px]">
                            <span className="block font-semibold text-slate-200 truncate">{lead.name}</span>
                            <span className="block text-[10px] text-slate-500 truncate">{lead.address}</span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">{lead.category}</td>
                          <td className="py-3.5 px-4 text-slate-400">{lead.city}</td>
                          <td className="py-3.5 px-4 font-mono text-[11px]">
                            {hasWeb
                              ? <a href={lead.website} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline truncate max-w-[150px] block">{lead.website.replace(/^https?:\/\/(www\.)?/, '')}</a>
                              : <span className="text-slate-600 italic">Nessuno</span>}
                          </td>
                          <td className="py-3.5 px-4">
                            {hasWeb
                              ? <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">HAS WEBSITE</span>
                              : <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-rose-500/10 text-rose-400 border border-rose-500/20">NO WEBSITE</span>}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button type="button" onClick={() => setSelectedLeadId(lead.id)}
                                className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-[10px] font-bold rounded transition-colors">
                                View Details
                              </button>
                              {hasWeb && (
                                <a href={lead.website} target="_blank" rel="noreferrer"
                                  className="p-1 bg-slate-950 border border-slate-900 rounded hover:text-indigo-400 transition-colors" title="Apri Sito">
                                  <Icons.Globe />
                                </a>
                              )}
                              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.name + ' ' + lead.address + ' ' + lead.city)}`}
                                target="_blank" rel="noreferrer"
                                className="p-1 bg-slate-950 border border-slate-900 rounded hover:text-indigo-400 transition-colors" title="Apri Google Maps">
                                <Icons.MapPin />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Detail Drawer */}
      {activeLead && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="absolute inset-0" onClick={() => setSelectedLeadId(null)} />
          <div className="relative w-full max-w-md bg-[#090D1A] border-l border-slate-900 h-full overflow-y-auto p-6 space-y-6 flex flex-col justify-between shadow-2xl animate-slide-in">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/15 uppercase tracking-wide">Scheda Lead</span>
                <button onClick={() => setSelectedLeadId(null)}
                  className="text-slate-500 hover:text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors text-xs font-semibold px-2 py-1">
                  ✕ Chiudi
                </button>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-black text-white leading-tight">{activeLead.name}</h2>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 bg-slate-950 rounded text-indigo-300 font-semibold">{activeLead.category}</span>
                  <span className="px-2 py-0.5 bg-slate-950 rounded text-slate-400">📍 {activeLead.city}</span>
                </div>
              </div>
              <div className="space-y-3 pt-3">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Dati di Contatto</h3>
                <div className="space-y-2.5">
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-900 flex items-start gap-2.5">
                    <div className="text-indigo-400 py-0.5"><Icons.MapPin /></div>
                    <div className="text-xs">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Indirizzo</span>
                      <span className="block text-slate-200 font-medium mt-0.5">{activeLead.address || '—'}, {activeLead.city}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-900 flex items-start gap-2.5">
                    <div className="text-indigo-400 py-0.5"><Icons.Phone /></div>
                    <div className="text-xs">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Telefono</span>
                      {activeLead.phone
                        ? <a href={`tel:${activeLead.phone}`} className="block text-indigo-400 font-semibold font-mono mt-0.5 underline hover:text-indigo-300">{activeLead.phone}</a>
                        : <span className="block text-slate-600 italic mt-0.5">Non presente</span>}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-900 flex items-start gap-2.5">
                    <div className="text-indigo-400 py-0.5"><Icons.Mail /></div>
                    <div className="text-xs">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Email</span>
                      {activeLead.email
                        ? <span className="block text-slate-200 font-mono mt-0.5">{activeLead.email}</span>
                        : <span className="block text-slate-600 italic mt-0.5">Non rilevata</span>}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-900 flex items-start gap-2.5">
                    <div className="text-indigo-400 py-0.5"><Icons.Globe /></div>
                    <div className="text-xs">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Sito Internet</span>
                      {activeLead.website
                        ? <a href={activeLead.website} target="_blank" rel="noreferrer" className="block text-indigo-400 underline font-semibold mt-0.5 truncate max-w-[240px] hover:text-indigo-300">{activeLead.website}</a>
                        : <span className="block text-rose-400 font-semibold mt-0.5">Nessun sito web! 🚨</span>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Social Rilevati</h3>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-900 flex justify-between">
                    <span className="text-slate-500">Instagram</span>
                    <span className="font-bold text-slate-300">{activeLead.instagram ? `@${activeLead.instagram}` : 'Assente'}</span>
                  </div>
                  <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-900 flex justify-between">
                    <span className="text-slate-500">Facebook</span>
                    <span className="font-bold text-slate-300">{activeLead.facebook ? 'Sì' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-900 flex gap-2">
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeLead.name + ' ' + activeLead.address + ' ' + activeLead.city)}`}
                target="_blank" rel="noreferrer"
                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg text-center transition-colors">
                Apri su Google Maps
              </a>
              {activeLead.phone && (
                <a href={`tel:${activeLead.phone}`}
                  className="py-2 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs rounded-lg text-center transition-colors">
                  Chiama
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
