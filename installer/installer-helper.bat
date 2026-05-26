@echo off
:: Questo script viene eseguito dall'installer dopo la copia dei file.
:: Argomento 1: cartella di installazione
set APPDIR=%1

:: Crea venv Python
python -m venv "%APPDIR%\backend\venv"

:: Installa dipendenze Python
"%APPDIR%\backend\venv\Scripts\pip.exe" install -r "%APPDIR%\backend\requirements.txt" --quiet

:: Installa dipendenze Node
cd /d "%APPDIR%\front-end"
npm install --silent
