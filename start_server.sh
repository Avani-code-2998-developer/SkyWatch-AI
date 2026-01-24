#!/bin/bash

# Quick Start Script for SkyWatch AI Missile Simulation Demo

echo "========================================"
echo " SkyWatch AI - Missile Simulation Mode"
echo "========================================"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "[OK] Python 3 detected"
    echo "Starting HTTP server on port 8080..."
    echo ""
    echo "Open your browser to: http://localhost:8080"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "========================================"
    cd "$(dirname "$0")/web"
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    echo "[OK] Python detected"
    echo "Starting HTTP server on port 8080..."
    echo ""
    echo "Open your browser to: http://localhost:8080"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "========================================"
    cd "$(dirname "$0")/web"
    python -m http.server 8080
else
    echo "[ERROR] Python not found in PATH"
    echo ""
    echo "Please install Python or use Node.js:"
    echo "  npx http-server -p 8080"
    exit 1
fi
