@echo off
cd /d "%~dp0"

if not exist node_modules (
  echo Installing dependencies...
  call npm.cmd install
  if errorlevel 1 exit /b 1
)

echo Building preview...
call npm.cmd run build
if errorlevel 1 exit /b 1

start "Built Preview Server" cmd /k "cd /d \"%~dp0dist\" && py -m http.server 4173 --bind 127.0.0.1"
timeout /t 2 /nobreak >nul
start "" http://127.0.0.1:4173/
