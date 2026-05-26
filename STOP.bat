@echo off
title Lead Finder - Stop
echo.
echo  Fermo Lead Finder...
taskkill /FI "WINDOWTITLE eq LF-Backend" /F > nul 2>&1
taskkill /FI "WINDOWTITLE eq LF-Frontend" /F > nul 2>&1
echo  Fatto. Tutti i servizi fermati.
timeout /t 2 /nobreak > nul
