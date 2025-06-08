@echo off
setlocal

echo 🚀 Oyren React Renderer - Demo Runner
echo ================================================

:: Check if we're in the project root
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    echo Expected: \path\to\oyren-react-renderer\
    pause
    exit /b 1
)

if not exist "src" (
    echo ❌ Error: Please run this script from the project root directory
    echo Expected: \path\to\oyren-react-renderer\
    pause
    exit /b 1
)

:: Step 1: Install main dependencies
echo.
echo 📦 Installing main package dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install main dependencies
    pause
    exit /b 1
)
echo ✅ Main dependencies installed

:: Step 2: Build the package
echo.
echo 🔨 Building the package...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Failed to build package
    pause
    exit /b 1
)
echo ✅ Package built successfully

:: Step 3: Install demo dependencies
echo.
echo 📦 Installing demo dependencies...
cd examples\simple-demo
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install demo dependencies
    pause
    exit /b 1
)
echo ✅ Demo dependencies installed

:: Step 4: Start the demo
echo.
echo 🎉 Starting the demo...
echo 🌐 Demo will open at: http://localhost:3000
echo 💡 Press Ctrl+C to stop the demo
echo ================================================

call npm run dev 