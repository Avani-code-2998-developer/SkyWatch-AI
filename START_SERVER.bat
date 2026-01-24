@echo off
REM Quick Start Script for SkyWatch AI Missile Simulation Demo

echo ========================================
echo  SkyWatch AI - Missile Simulation Mode
echo ========================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Python detected
    echo Starting HTTP server on port 8080...
    echo.
    echo Open your browser to: http://localhost:8080
    echo.
    echo Press Ctrl+C to stop the server
    echo ========================================
    cd /d "%~dp0web"
    python -m http.server 8080
) else (
    echo [ERROR] Python not found in PATH
    echo.
    echo Please install Python or use Node.js:
    echo   npx http-server -p 8080
    pause
)
