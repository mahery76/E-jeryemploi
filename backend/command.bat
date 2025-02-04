@echo off
start cmd /k "title Node Server && npm run dev"
start cmd /k "cd client && title Client Server && npm run dev"
start cmd /k "title Visual Studio Code && code ."
start "Opening the browser" "D:\Logiciels\lojika am dev\brave\brave.exe" "http://localhost:5173/"
