@echo off
start cmd /k "cd backend && title Node Server && npm run dev"
start cmd /k "cd frontend && title Client Server && npm run dev"
start cmd /k "title Visual Studio Code && code ."
start "Opening the browser" "C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe" "http://localhost:5173/"
