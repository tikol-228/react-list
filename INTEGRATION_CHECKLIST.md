# ✅ Интеграция Frontend + Backend + Database - Чек-лист

## 🎯 Что было реализовано

### ✅ Backend (Express.js)
- [x] Express сервер на порту 3000
- [x] API endpoints для управления заметками:
  - `GET /notes` - получить все
  - `GET /notes/:id` - получить одну
  - `POST /notes` - создать
  - `PUT /notes/:id` - обновить
  - `DELETE /notes/:id` - удалить
  - `PUT /notes` - обновить весь массив
- [x] Работа с JSON файлом (db.json)
- [x] CORS настройки для фронтенда
- [x] Автоматическое создание ID (timestamp)
- [x] Горячая перезагрузка с nodemon

### ✅ Database (db.json)
- [x] Правильная структура: `{ "notes": [...] }`
- [x] Все поля типизированы (title, description, status, id)
- [x] Начальные данные загружены
- [x] Автоматическое сохранение при изменениях

### ✅ Frontend (React + Vite)
- [x] API функции в `/src/api/notes.js`:
  - `fetchNotes()` - GET
  - `createNote()` - POST
  - `updateNote()` - PUT
  - `deleteNote()` - DELETE
  - `saveNotes()` - PUT весь массив
- [x] Интеграция в Redux (todoReducer)
- [x] Async операции с try-catch
- [x] Toast уведомления об ошибках
- [x] Загрузка данных при монтировании
- [x] Синхронизация всех операций с сервером

### ✅ Vite конфигурация
- [x] Proxy для `/notes` → `http://localhost:3000`
- [x] Dev сервер на :5173
- [x] Production build support
- [x] SPA routing

### ✅ Root конфигурация
- [x] `npm start` - запустить оба сервера
- [x] `npm run backend-dev` - только backend
- [x] `npm run frontend-dev` - только frontend
- [x] `npm run build` - собрать для production
- [x] `npm run start:prod` - запустить production
- [x] Зависимость concurrently установлена

---

## 🚀 Как запустить

### Вариант 1 - Одна команда (самый простой)
```bash
cd /home/tikol/Desktop/tikol/react-list
npm start
```

### Вариант 2 - В двух терминалах
```bash
# Терминал 1
cd /home/tikol/Desktop/tikol/react-list/backend
npm run dev

# Терминал 2
cd /home/tikol/Desktop/tikol/react-list/my-app
npm run dev
```

### Вариант 3 - Bash скрипт
```bash
cd /home/tikol/Desktop/tikol/react-list
./start-dev.sh
```

---

## 🧪 Тестирование

### 1. Проверить что API работает
```bash
curl http://localhost:3000/notes
# Должен вернуть JSON массив с заметками
```

### 2. Создать новую заметку
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test","status":"To Do"}'
```

### 3. Обновить заметку
```bash
curl -X PUT http://localhost:3000/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"Done"}'
```

### 4. Проверить что данные в db.json
```bash
cat backend/db.json | jq .
```

### 5. Открыть фронтенд
```
http://localhost:5173
```

---

## 📊 Архитектура

```
┌─────────────────────────────────────────────────────┐
│                    React App                        │
│              (Vite Dev Server :5173)                │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │  ToDoDashboard Component                     │  │
│  │  - Управление состоянием (Redux)             │  │
│  │  - Drag & Drop                               │  │
│  │  - Поиск                                     │  │
│  │  - Фильтрация по статусу                     │  │
│  └──────────────────────────────────────────────┘  │
│                        │                            │
│            fetch('/notes') ← API функции             │
│                        │                            │
└────────────────────────┼────────────────────────────┘
                         │
                    Vite Proxy
                    (/notes →)
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│                Express.js Server                    │
│                (Node.js :3000)                      │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │  /notes Endpoints                            │  │
│  │  - GET /notes - все заметки                  │  │
│  │  - POST /notes - создать                     │  │
│  │  - PUT /notes/:id - обновить                 │  │
│  │  - DELETE /notes/:id - удалить               │  │
│  │  - PUT /notes - обновить порядок             │  │
│  └──────────────────────────────────────────────┘  │
│                        │                            │
│            fs.readFileSync/writeFileSync            │
│                        │                            │
└────────────────────────┼────────────────────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │   db.json       │
                │  (JSON Database)│
                │                 │
                │  {              │
                │    "notes": [   │
                │      {...}      │
                │    ]            │
                │  }              │
                └─────────────────┘
```

---

## 📚 Файлы проекта

```
react-list/
├── backend/
│   ├── main.js                    ← Express сервер (136 строк)
│   ├── db.json                    ← JSON БД
│   ├── package.json
│   └── node_modules/
│
├── my-app/
│   ├── src/
│   │   ├── api/
│   │   │   └── notes.js           ← API функции (fetch)
│   │   ├── components/
│   │   │   ├── ToDoDashboard.jsx  ← Главная логика (313 строк)
│   │   │   ├── Card.jsx
│   │   │   ├── ManageToDoModal.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── BaseField.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── TestBtn.jsx
│   │   ├── helpers/
│   │   │   └── todoReducer.js     ← Redux логика
│   │   ├── providers/
│   │   │   ├── ThemProvider.jsx
│   │   │   └── ToastProvider.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── vite.config.js             ← Proxy config
│   ├── index.html
│   ├── eslint.config.js
│   ├── package.json
│   └── dist/                      ← Production build
│
├── package.json                   ← Root npm scripts
├── start-dev.sh                   ← Bash скрипт для старта
├── SETUP.md                       ← Подробная документация
└── QUICKSTART.md                  ← Быстрый старт
```

---

## 🔄 Поток данных - Пример: Создание заметки

1. **Пользователь** кликает кнопку "Add" в React приложении
2. **Frontend** (React)
   - Открывается Modal для ввода данных
   - Пользователь вводит title и description
   - Нажимает "Submit"
   - Вызывается `handleSubmit()` в `ToDoDashboard.jsx`
3. **API вызов** (src/api/notes.js)
   - `createNote({ title, description, status: "To Do" })`
   - `fetch('/notes', { method: 'POST', body: JSON.stringify(...) })`
4. **Vite Proxy** перенаправляет на backend
   - `/notes` → `http://localhost:3000/notes`
5. **Backend** (Express)
   - `app.post('/notes', ...)`
   - Читает `db.json`
   - Генерирует ID: `Date.now().toString()`
   - Добавляет новую заметку в массив
   - Пишет обновленный JSON в `db.json`
   - Возвращает созданную заметку в JSON
6. **Frontend** получает ответ
   - `dispatch({ type: ACTIONS.add, payload: created })`
   - Redux обновляет state
   - React перерисовывает компоненты
   - Новая карточка появляется в колонке "To Do"
7. **Toast уведомление**: "Task created" (success)
8. **Проверка**: 
   ```bash
   cat backend/db.json | jq .
   # Новая заметка присутствует в массиве notes
   ```

---

## 🛠️ Полезные команды

### Управление сервисами
```bash
# Запустить оба сервера
npm start

# Остановить (Ctrl+C)

# Проверить что работают
lsof -i :3000
lsof -i :5173

# Убить процесс если зависнет
kill -9 <PID>
```

### Работа с базой данных
```bash
# Просмотр всех заметок
cat backend/db.json | jq .

# Количество заметок
cat backend/db.json | jq '.notes | length'

# Красиво отформатировать JSON
cat backend/db.json | jq . > backend/db.json

# Очистить базу (осторожно!)
echo '{"notes":[]}' > backend/db.json
```

### Тестирование API
```bash
# Получить все
curl http://localhost:3000/notes | jq .

# Получить одну
curl http://localhost:3000/notes/1 | jq .

# Создать
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test","status":"To Do"}'

# Обновить
curl -X PUT http://localhost:3000/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"Done"}'

# Удалить
curl -X DELETE http://localhost:3000/notes/1

# Обновить все (переорганизация)
curl -X PUT http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '[{"id":"1","title":"First"},{"id":"2","title":"Second"}]'
```

### Build & Production
```bash
# Собрать фронтенд
npm run build --prefix my-app

# Запустить production сборку
npm run start:prod

# Результат будет на http://localhost:3000
```

---

## 🎓 Что изучилось

### Технологии
- ✅ Express.js - REST API
- ✅ React - Frontend UI
- ✅ Vite - Build tool & dev server
- ✅ JSON - Data storage
- ✅ Node.js - Server runtime
- ✅ Fetch API - HTTP клиент
- ✅ Redux - State management

### Концепции
- ✅ Client-Server архитектура
- ✅ REST API endpoints
- ✅ HTTP методы (GET, POST, PUT, DELETE)
- ✅ JSON serialization
- ✅ Async/await
- ✅ CORS
- ✅ Proxy routing
- ✅ File I/O (fs module)
- ✅ Development vs Production

---

## 📝 Примечания

- **IDs**: Используются строки (напр. "1770102913039")
- **Timestamps**: Генерируются автоматически как Date.now()
- **CORS**: Настроен для localhost:5173
- **Proxy**: Работает только в dev режиме (Vite)
- **Database**: Полностью в памяти → сохраняется в JSON
- **Stateless**: Сервер не хранит состояние между запросами

---

## 🚀 Готово к использованию!

Теперь у вас есть полноценный полнофункциональный стек:
- 🎨 React Frontend (Vite, Drag&Drop, Theme, Toast)
- 🔧 Express Backend (REST API, CORS)
- 💾 JSON Database (Persistent storage)
- 🔄 Полная интеграция (Proxy + API)

**Начните с:**
```bash
cd /home/tikol/Desktop/tikol/react-list
npm start
```

Откройте http://localhost:5173 в браузере и начните добавлять заметки! 🎉

