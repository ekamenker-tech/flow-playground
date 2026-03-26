@echo off
cd /d "%~dp0"

if not exist node_modules (
  echo Installing dependencies...
  call npm.cmd install
  if errorlevel 1 exit /b 1
)

start "" cmd /c "cd /d \"%~dp0\" && npm.cmd run dev -- --host 127.0.0.1 --port 4173"
timeout /t 3 /nobreak >nul
start "" http://127.0.0.1:4173/
