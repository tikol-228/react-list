// Use relative path so API works both when frontend is served by backend (production)
// and during Vite development (Vite proxy will forward /notes to backend)
const BASE = '/notes'

export async function fetchNotes() {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error('Failed to fetch notes')
  return res.json()
}

export async function createNote(note) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  })
  if (!res.ok) throw new Error('Failed to create note')
  return res.json()
}

export async function updateNote(id) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error('Failed to update note')
  return res.json()
}

export async function deleteNote(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete note')
  return res.json()
}

export async function saveNotes(notes) {
  const res = await fetch(BASE, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(notes),
  })
  if (!res.ok) throw new Error('Failed to save notes')
  return res.json()
} 
