import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())

// Simple CORS middleware for development (allow Vite dev server)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.method === 'OPTIONS') return res.sendStatus(204)
    next()
})

const dbPath = './db.json'

// Serve frontend static files when built
const frontendDist = path.join(__dirname, '../my-app/dist')
if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist))
    // SPA fallback
    app.get('*', (req, res, next) => {
        // If request is for API, pass through
        if (req.path.startsWith('/notes')) return next()
        res.sendFile(path.join(frontendDist, 'index.html'))
    })
} else {
    console.warn('Warning: frontend build not found. Run `npm run build` in my-app before starting in production mode.')
}

// helpers
function readDb() {
    const data = fs.readFileSync(dbPath, 'utf-8')
    return JSON.parse(data)
}

function writeDb(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

// GET all notes
app.get('/notes', (req, res) => {
    const db = readDb()
    res.json(db.notes || [])
})

// GET note by id
app.get('/notes/:id', (req, res) => {
    const db = readDb()
    const note = db.notes?.find(n => n.id === String(req.params.id))

    if (!note) {
        return res.status(404).json({ error: 'Note not found' })
    }

    res.json(note)
})

// CREATE note
app.post('/notes', (req, res) => {
    const db = readDb()
    const newNote = req.body

    if (!newNote) {
        return res.status(400).json({ error: 'No data sent' })
    }

    if (!Array.isArray(db.notes)) {
        db.notes = []
    }

    const noteWithId = {
        id: Date.now().toString(),
        ...newNote
    }

    db.notes.push(noteWithId)
    writeDb(db)

    res.status(201).json(noteWithId)
})

// UPDATE note
app.put('/notes/:id', (req, res) => {
    const db = readDb()
    const index = db.notes?.findIndex(n => n.id === String(req.params.id))

    if (index === -1 || index === undefined) {
        return res.status(404).json({ error: 'Note not found' })
    }

    db.notes[index] = {
        ...db.notes[index],
        ...req.body
    }

    writeDb(db)
    res.json(db.notes[index])
})

// DELETE note
app.delete('/notes/:id', (req, res) => {
    const db = readDb()
    const index = db.notes?.findIndex(n => n.id === String(req.params.id))

    if (index === -1 || index === undefined) {
        return res.status(404).json({ error: 'Note not found' })
    }

    const deleted = db.notes.splice(index, 1)
    writeDb(db)

    res.json(deleted[0])
})

// Replace entire notes array - useful to persist ordering
app.put('/notes', (req, res) => {
    const db = readDb()
    const newNotes = req.body
    if (!Array.isArray(newNotes)) {
        return res.status(400).json({ error: 'Expected an array of notes' })
    }
    db.notes = newNotes
    writeDb(db)
    res.json(db.notes)
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})