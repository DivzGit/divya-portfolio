@echo off
echo ==========================================
echo    Divya's Portfolio Setup Script
echo ==========================================
echo.

echo [1/4] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error: Backend installation failed!
    pause
    exit /b 1
)

echo.
echo [2/4] Installing Frontend Dependencies...
cd ../frontend
call npm install
if %errorlevel% neq 0 (
    echo Error: Frontend installation failed!
    pause
    exit /b 1
)

echo.
echo [3/4] Setting up environment files...
cd ../backend
if not exist .env (
    copy .env.example .env
    echo Environment file created! Please edit backend/.env with your settings.
)

echo.
echo [4/4] Setup Complete!
echo.
echo ==========================================
echo     How to run the application:
echo ==========================================
echo.
echo 1. Backend: cd backend && npm run dev
echo 2. Frontend: cd frontend && npm start
echo.
echo The application will be available at:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:5000
echo.
echo ==========================================
echo        Portfolio Features:
echo ==========================================
echo ✓ 3D Interactive Backgrounds
echo ✓ Particle Effects System  
echo ✓ Modern Neon Cyber Theme
echo ✓ Smooth Animations
echo ✓ Glass Morphism UI
echo ✓ Responsive Design
echo ✓ Contact Form Integration
echo ✓ Project Showcase
echo ✓ Skills with Animations
echo ✓ Professional Timeline
echo.
pause