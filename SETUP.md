# React To-Do App - Интеграция Frontend, Backend и Database

## 🚀 Архитектура проекта

```
Frontend (React + Vite) → Backend (Express) → Database (db.json)
   :5173                    :3000              JSON файл
```

## 📋 Что было изменено

### 1. **Database структура** (db.json)
```json
{
  "notes": [
    {
      "id": "1",
      "title": "название",
      "description": "описание",
      "status": "To Do | In Progress | Done | Deleted"
    }
  ]
}
```

### 2. **Backend API endpoints** (/backend/main.js)
- `GET /notes` - получить все заметки
- `GET /notes/:id` - получить заметку по ID
- `POST /notes` - создать новую заметку
- `PUT /notes/:id` - обновить заметку
- `DELETE /notes/:id` - удалить заметку
- `PUT /notes` - обновить весь массив (для переорганизации)

### 3. **Frontend интеграция**
- API функции в `/my-app/src/api/notes.js`
- Vite proxy для разработки (localhost:5173 → localhost:3000)
- Все операции синхронизированы с сервером

---

## 🛠️ Режимы запуска

### **Режим разработки** (Dev Mode)
Оба сервера работают одновременно:

```bash
# Терминал 1 - Backend (с горячей перезагрузкой)
cd backend
npm run dev
# → Сервер на http://localhost:3000

# Терминал 2 - Frontend (Vite dev server)
cd my-app
npm run dev
# → Приложение на http://localhost:5173
```

**Как работает:**
- Frontend отправляет запросы на `/notes`
- Vite proxy автоматически перенаправляет на `http://localhost:3000/notes`
- Backend обрабатывает и сохраняет в `db.json`

---

### **Production Mode** (Готовый production сервер)
Один сервер служит и фронтенд, и API:

```bash
cd backend
npm run start:prod
# → App на http://localhost:3000
```

**Как работает:**
1. Сборка фронтенда: `npm run build` в `/my-app`
2. Копирование в `/backend/my-app/dist`
3. Express сервер служит статику и API с одного порта

---

## ✅ Проверка работы

### 1. Убедитесь что оба сервера работают:
```bash
# Проверить открытые порты
lsof -i :3000
lsof -i :5173
```

### 2. Тестировать API:
```bash
# Получить все заметки
curl http://localhost:3000/notes

# Создать новую
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test desc","status":"To Do"}'

# Обновить
curl -X PUT http://localhost:3000/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"Done"}'

# Удалить
curl -X DELETE http://localhost:3000/notes/1
```

### 3. Проверить db.json:
```bash
cat backend/db.json
# Должен содержать обновленные данные
```

---

## 🔄 Поток данных

### Создание заметки:
1. User кликает "Add" в интерфейсе
2. Frontend вызывает `createNote()`
3. `fetch('/notes', { method: 'POST', ... })`
4. Vite proxy отправляет на `localhost:3000/notes`
5. Backend генерирует ID и сохраняет в `db.json`
6. Возвращает созданную заметку
7. Frontend обновляет состояние через Redux
8. UI обновляется

### Получение заметок при загрузке:
1. Component монтируется
2. `useEffect(() => { fetchNotes() })`
3. Frontend получает все заметки с сервера
4. Заполняет Redux state
5. Renderится UI с данными

---

## 📂 Файлы проекта

```
react-list/
├── backend/
│   ├── main.js          ← Express сервер с API
│   ├── db.json          ← JSON база данных
│   ├── package.json
│   └── node_modules/
│
├── my-app/
│   ├── src/
│   │   ├── api/
│   │   │   └── notes.js ← API функции (fetch)
│   │   ├── components/
│   │   │   └── ToDoDashboard.jsx ← Главный компонент
│   │   └── ...
│   ├── vite.config.js   ← Proxy конфиг
│   ├── package.json
│   └── dist/            ← Production сборка
```

---

## 🐛 Troubleshooting

### Ошибка: "Cannot POST /notes"
- Проверить что backend работает на :3000
- Проверить что `db.json` существует в `/backend`

### Ошибка CORS
- CORS уже настроен в `main.js`
- Разрешены все методы и хедеры

### Данные не сохраняются
- Проверить что `db.json` имеет права на запись
- Проверить структуру: `{ "notes": [...] }`

### Proxy не работает в dev mode
- Убедиться что backend работает на :3000
- Проверить `vite.config.js`:
```javascript
server: {
  proxy: {
    '/notes': 'http://localhost:3000'
  }
}
```

---

## 🎯 Следующие шаги

- [ ] Добавить аутентификацию (JWT)
- [ ] Миграция на реальную БД (MongoDB)
- [ ] Docker контейнеризация
- [ ] Unit/E2E тесты
- [ ] Развертывание на сервер

