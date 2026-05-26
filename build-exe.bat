@echo off
title Lead Finder - Build EXE

if not exist "%~dp0backend\venv\" (
    echo  Esegui prima SETUP.bat
    pause
    exit /b 1
)

echo  Installazione PyInstaller...
call "%~dp0backend\venv\Scripts\activate"
pip install pyinstaller --quiet

echo  Compilazione in corso (1-2 minuti)...
cd /d "%~dp0"
pyinstaller ^
  --onefile ^
  --windowed ^
  --name "LeadFinder" ^
  --collect-data customtkinter ^
  --hidden-import customtkinter ^
  launcher.py

echo.
echo  Fatto! File: dist\LeadFinder.exe
echo  Copialo nella cartella principale del progetto.
pause
