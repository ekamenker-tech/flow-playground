@echo off
cd /d "%~dp0"

if not exist node_modules (
  echo Installing dependencies...
  call npm.cmd install
  if errorlevel 1 exit /b 1
)

echo Starting preview server at http://127.0.0.1:4173/
call npm.cmd run dev -- --host 127.0.0.1 --port 4173
