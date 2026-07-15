#!/usr/bin/env bash
# Quick Start Script for Local Development
# Usage: ./quick-start.sh

echo "🚀 Financial Advisor - Quick Start Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Start Backend
echo "📦 Starting Backend..."
cd backend || exit
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi
npm run dev &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
echo "   Running at http://localhost:5000"
echo ""

# Wait a moment for backend to start
sleep 2

# Start Frontend
echo "📦 Starting Frontend..."
cd ../frontend || exit
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"
echo "   Running at http://localhost:5173"
echo ""

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Shutting down..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "✅ Done!"
}

# Trap Ctrl+C to run cleanup
trap cleanup EXIT INT TERM

echo "=========================================="
echo "🎉 Application is running!"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "=========================================="

# Wait for both processes
wait
