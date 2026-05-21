@echo off
echo ========================================
echo  Lead Finder - Avvio Backend Flask
echo ========================================
cd /d "%~dp0backend"

:: Crea virtualenv se non esiste
if not exist venv (
    echo Creazione ambiente virtuale...
    python -m venv venv
    echo Installazione dipendenze...
    venv\Scripts\pip install -r requirements.txt
)

:: Attiva virtualenv
call venv\Scripts\activate

echo.
echo Backend in avvio su http://localhost:5000
echo Premi CTRL+C per fermare.
echo.
python app.py
pause
