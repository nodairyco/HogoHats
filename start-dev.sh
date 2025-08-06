#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to check if a directory exists
check_directory() {
    if [ ! -d "$1" ]; then
        print_error "Directory $1 does not exist!"
        exit 1
    fi
}

# Function to check if package.json exists
check_package_json() {
    if [ ! -f "$1/package.json" ]; then
        print_error "package.json not found in $1!"
        exit 1
    fi
}

# Function to cleanup background processes on script exit
cleanup() {
    print_warning "\nShutting down servers..."
    jobs -p | xargs -r kill
    exit 0
}

# Set up cleanup trap
trap cleanup SIGINT SIGTERM

print_status "Starting HogoHats Development Servers..."
print_status "========================================"

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

# Check if directories exist
check_directory "$BACKEND_DIR"
check_directory "$FRONTEND_DIR"

# Check if package.json files exist
check_package_json "$BACKEND_DIR"
check_package_json "$FRONTEND_DIR"

print_status "Starting backend server..."
cd "$BACKEND_DIR"

# Check if node_modules exists, if not, install dependencies
if [ ! -d "node_modules" ]; then
    print_warning "Backend node_modules not found. Installing dependencies..."
    npm install
fi

# Start backend server in background
npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

print_status "Starting frontend server..."
cd "$FRONTEND_DIR"

# Check if node_modules exists, if not, install dependencies
if [ ! -d "node_modules" ]; then
    print_warning "Frontend node_modules not found. Installing dependencies..."
    npm install
fi

# Start frontend server in background
npm run dev &
FRONTEND_PID=$!

print_success "Both servers are starting up!"
print_status "Backend PID: $BACKEND_PID"
print_status "Frontend PID: $FRONTEND_PID"
print_status ""
print_status "Backend should be running on: http://localhost:5050"
print_status "Frontend should be running on: http://localhost:5173"
print_status ""
print_warning "Press Ctrl+C to stop both servers"
print_status "========================================"

# Wait for both background processes
wait
