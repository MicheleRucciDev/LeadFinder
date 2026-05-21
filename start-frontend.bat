@echo off
echo ========================================
echo  Lead Finder - Avvio Frontend React
echo ========================================
cd /d "%~dp0front-end"

:: Installa dipendenze se necessario
if not exist node_modules (
    echo Installazione dipendenze npm...
    npm install
)

echo.
echo Frontend in avvio su http://localhost:3000
echo Premi CTRL+C per fermare.
echo.
npm run dev
pause
