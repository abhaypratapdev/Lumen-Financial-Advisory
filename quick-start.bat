@echo off
REM Quick Start Script for Local Development (Windows)
REM Usage: quick-start.bat

echo.
echo 🚀 Financial Advisor - Quick Start Script (Windows)
echo ===================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%
echo.

REM Start Backend
echo 📦 Starting Backend...
cd backend
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)
start "Financial Advisor Backend" cmd /k "npm run dev"
echo ✅ Backend started
echo    Running at http://localhost:5000
echo.

REM Wait a moment for backend to start
timeout /t 3 /nobreak

REM Start Frontend
echo 📦 Starting Frontend...
cd ..\frontend
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)
start "Financial Advisor Frontend" cmd /k "npm run dev"
echo ✅ Frontend started
echo    Running at http://localhost:5173
echo.

cd ..

echo ===================================================
echo 🎉 Application is running!
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend:  http://localhost:5000
echo.
echo Close the command windows to stop the servers
echo ===================================================
pause
