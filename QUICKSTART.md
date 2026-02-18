# 🚀 Quick Start Guide

## ⚡ Самый быстрый способ - одна команда

```bash
cd /home/tikol/Desktop/tikol/react-list
npm start
```

Это запустит оба сервера одновременно:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

---

## 📝 Или запустить вручную (в двух терминалах)

### Терминал 1 - Backend
```bash
cd /home/tikol/Desktop/tikol/react-list/backend
npm run dev
```
Output: `Server started on port 3000`

### Терминал 2 - Frontend
```bash
cd /home/tikol/Desktop/tikol/react-list/my-app
npm run dev
```
Output: `VITE v6.2.0  ready in 123 ms` + ссылка на localhost:5173

---

## 🔄 Как это работает

```
┌──────────────────┐
│  React Frontend  │
│  (Vite, :5173)   │
└────────┬─────────┘
         │ fetch('/notes')
         │
    Vite Proxy
    ↓
┌──────────────────┐
│  Express Server  │
│  (Node, :3000)   │
└────────┬─────────┘
         │ read/write
         │
┌──────────────────┐
│   db.json        │
│  (JSON Database) │
└──────────────────┘
```

1. Пользователь добавляет заметку в React приложении
2. Frontend вызывает `fetch('/notes', { method: 'POST', ... })`
3. Vite proxy автоматически перенаправляет на `http://localhost:3000/notes`
4. Express обработает запрос и сохранит в `db.json`
5. Возвращает результат фронтенду
6. Frontend обновляет UI

---

## ✅ Проверка что всё работает

### 1. Оба сервера запущены?
```bash
# В отдельном терминале
lsof -i :3000   # Backend
lsof -i :5173   # Frontend
```

### 2. API работает?
```bash
curl http://localhost:3000/notes
# Должен вернуть JSON массив с заметками
```

### 3. Frontend видит сервер?
- Откройте http://localhost:5173 в браузере
- Откройте DevTools (F12)
- В Network tab посмотрите запросы на `/notes`
- Должны быть успешны (статус 200)

---

## 🛠️ Дополнительные команды

### Development
```bash
# Из root папки - запустить оба сервера
npm start

# Или отдельно
npm run backend-dev
npm run frontend-dev
```

### Production
```bash
# Build и запустить production версию
cd /home/tikol/Desktop/tikol/react-list
npm run start:prod
# → App будет на http://localhost:3000
```

### Clean & Rebuild
```bash
# Удалить node_modules и переустановить
cd /home/tikol/Desktop/tikol/react-list
rm -rf backend/node_modules my-app/node_modules node_modules
npm install
npm install --prefix backend
npm install --prefix my-app
```

---

## 📊 API Documentation

### GET /notes
Получить все заметки
```bash
curl http://localhost:3000/notes
```

### GET /notes/:id
Получить одну заметку
```bash
curl http://localhost:3000/notes/1
```

### POST /notes
Создать новую заметку
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Моя задача",
    "description": "Описание",
    "status": "To Do"
  }'
```

### PUT /notes/:id
Обновить заметку
```bash
curl -X PUT http://localhost:3000/notes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Done"
  }'
```

### DELETE /notes/:id
Удалить заметку
```bash
curl -X DELETE http://localhost:3000/notes/1
```

### PUT /notes
Обновить весь массив (для переорганизации)
```bash
curl -X PUT http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '[
    {"id":"1","title":"First","status":"To Do"},
    {"id":"2","title":"Second","status":"In Progress"}
  ]'
```

---

## 🗂️ Структура файлов

```
react-list/
├── backend/
│   ├── main.js              ← Express сервер + API логика
│   ├── db.json              ← JSON база данных
│   ├── package.json
│   └── node_modules/
│
├── my-app/
│   ├── src/
│   │   ├── api/
│   │   │   └── notes.js     ← Fetch функции для API
│   │   ├── components/
│   │   │   ├── ToDoDashboard.jsx  ← Главный компонент
│   │   │   ├── Card.jsx
│   │   │   ├── ManageToDoModal.jsx
│   │   │   └── ...
│   │   ├── helpers/
│   │   │   └── todoReducer.js ← Redux логика
│   │   ├── providers/
│   │   │   ├── ThemProvider.jsx
│   │   │   └── ToastProvider.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js       ← Proxy конфигурация
│   ├── package.json
│   └── dist/                ← Production сборка
│
├── package.json             ← Root скрипты для обоих проектов
├── SETUP.md                 ← Подробная документация
└── start-dev.sh             ← Скрипт для быстрого старта
```

---

## 🐛 Решение проблем

### Ошибка: Port 3000 already in use
```bash
# Найти процесс
lsof -i :3000

# Убить процесс (замените PID)
kill -9 <PID>
```

### Ошибка: CORS error в браузере
- ✅ CORS уже настроен в `backend/main.js`
- Проверить что backend работает на :3000

### Данные не сохраняются
- Проверить что `db.json` имеет правильную структуру
- Проверить права на запись: `chmod 666 backend/db.json`

### Frontend не видит backend
- Убедиться что backend запущен на :3000
- Проверить Network tab в браузере (F12)
- Проверить vite.config.js proxy конфигурацию

---

## 📚 Дополнительные ресурсы

- [Express.js документация](https://expressjs.com/)
- [React документация](https://react.dev/)
- [Vite документация](https://vitejs.dev/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

