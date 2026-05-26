@echo off
title Lead Finder - Build Installer
echo.
echo  ============================================
echo   Build installer LeadFinder-Setup.exe
echo  ============================================
echo.

:: ── Step 1: Compila il launcher in .exe ──────────────────────────────────────
echo  [1/2] Compilazione launcher.exe...
cd /d "%~dp0.."
call backend\venv\Scripts\activate
pip install pyinstaller --quiet
pyinstaller --onefile --windowed --name "LeadFinder" ^
  --collect-data customtkinter ^
  --hidden-import customtkinter ^
  launcher.py > nul 2>&1

:: Copia il .exe nella root
copy /Y dist\LeadFinder.exe LeadFinder.exe > nul

:: ── Step 2: Compila l'installer con Inno Setup ───────────────────────────────
echo  [2/2] Creazione installer...

:: Copia helper nella root temporaneamente
copy /Y installer\installer-helper.bat installer-helper.bat > nul

:: Cerca Inno Setup
set INNO=""
if exist "C:\Program Files (x86)\Inno Setup 6\ISCC.exe" set INNO="C:\Program Files (x86)\Inno Setup 6\ISCC.exe"
if exist "C:\Program Files\Inno Setup 6\ISCC.exe"       set INNO="C:\Program Files\Inno Setup 6\ISCC.exe"

if %INNO%=="" (
    echo.
    echo  [ERRORE] Inno Setup non trovato.
    echo  Scaricalo gratis da: https://jrsoftware.org/isdl.php
    echo  Poi riesegui questo file.
    pause
    exit /b 1
)

%INNO% installer\setup.iss
copy /Y installer\LeadFinder-Setup.exe .\ > nul 2>&1

:: Pulizia
del installer-helper.bat > nul 2>&1

echo.
echo  ============================================
echo   Fatto! File: LeadFinder-Setup.exe
echo   Distribuiscilo ai tuoi utenti.
echo  ============================================
echo.
pause
