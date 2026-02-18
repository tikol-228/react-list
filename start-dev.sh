#!/bin/bash

# Скрипт для запуска обоих сервер в dev режиме

echo "🚀 Starting React To-Do App (Development Mode)"
echo ""

# Проверить что Node установлен
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен!"
    exit 1
fi

# Функция для очистки процессов при выходе
cleanup() {
    echo ""
    echo "⏹️  Завершение сервисов..."
    kill %1 2>/dev/null
    kill %2 2>/dev/null
    exit 0
}

trap cleanup SIGINT

echo "📦 Установка зависимостей backend..."
cd backend
npm install > /dev/null 2>&1

echo "📦 Установка зависимостей frontend..."
cd ../my-app
npm install > /dev/null 2>&1
cd ..

echo ""
echo "✅ Все зависимости установлены!"
echo ""
echo "🔄 Запуск серверов..."
echo ""

# Запустить backend
echo "🔵 Backend (http://localhost:3000):"
cd backend
npm run dev &
BACKEND_PID=$!

# Запустить frontend
echo "🟢 Frontend (http://localhost:5173):"
cd ../my-app
npm run dev &
FRONTEND_PID=$!

cd ..

echo ""
echo "✅ Оба сервера запущены!"
echo ""
echo "Frontend:  http://localhost:5173"
echo "Backend:   http://localhost:3000"
echo "Database:  ./backend/db.json"
echo ""
echo "Нажмите Ctrl+C для завершения..."
echo ""

# Ждать пока пользователь не нажмет Ctrl+C
wait
