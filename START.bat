@echo off

:: ── Se esiste il .exe compilato, lo lancia direttamente ───────────────────────
if exist "%~dp0LeadFinder.exe" (
    start "" "%~dp0LeadFinder.exe"
    exit /b
)

:: ── Controlla che il setup sia stato fatto ────────────────────────────────────
if not exist "%~dp0backend\venv\" (
    echo.
    echo  Setup non completato. Esegui prima SETUP.bat
    echo.
    pause
    exit /b 1
)

:: ── Lancia il launcher GUI con il Python del venv ─────────────────────────────
"%~dp0backend\venv\Scripts\python.exe" "%~dp0launcher.py"
