@echo off
title Lead Finder - Setup
color 0A
cls

echo.
echo  ========================================
echo   LEAD FINDER - Setup iniziale
echo  ========================================
echo.

:: ── Controlla Python ─────────────────────────────────────────────────────────
python --version > nul 2>&1
if errorlevel 1 (
    echo  [ERRORE] Python non trovato.
    echo  Scaricalo da: https://www.python.org/downloads/
    echo  Assicurati di spuntare "Add Python to PATH" durante l'installazione.
    pause
    exit /b 1
)
echo  [OK] Python trovato.

:: ── Controlla Node.js ────────────────────────────────────────────────────────
node --version > nul 2>&1
if errorlevel 1 (
    echo  [ERRORE] Node.js non trovato.
    echo  Scaricalo da: https://nodejs.org/
    pause
    exit /b 1
)
echo  [OK] Node.js trovato.

:: ── Crea venv e installa dipendenze Python ────────────────────────────────────
echo.
echo  Creazione ambiente virtuale Python...
cd /d "%~dp0backend"
python -m venv venv
echo  Installazione dipendenze Python (potrebbe richiedere qualche minuto)...
call venv\Scripts\activate
pip install -r requirements.txt --quiet
echo  [OK] Dipendenze Python installate.

:: ── Installa dipendenze Node ──────────────────────────────────────────────────
echo.
echo  Installazione dipendenze Node.js...
cd /d "%~dp0front-end"
npm install --silent
echo  [OK] Dipendenze Node.js installate.

echo.
echo  ========================================
echo   Setup completato!
echo   Ora puoi usare START.bat per avviare.
echo  ========================================
echo.
pause
