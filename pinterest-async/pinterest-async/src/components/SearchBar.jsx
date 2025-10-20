import { useState } from 'react'

export default function SearchBar({ onSearch }){
  const [value, setValue] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()
    const q = value.trim()
    if(!q) return
    setSubmitting(true)
    await onSearch(q)
    setValue('')
    setSubmitting(false)
  }

  return (
    <form className="search" onSubmit={handleSubmit} role="search">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M21 21l-4.3-4.3" stroke="#111" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="11" cy="11" r="7" stroke="#111" strokeWidth="1.5"/>
      </svg>
      <input
        placeholder="Busca ideas: cats, interior, travel…"
        value={value}
        onChange={e=>setValue(e.target.value)}
        aria-label="Buscar"
      />
      <button disabled={submitting || !value.trim()}>{submitting? 'Buscando…':'Buscar'}</button>
    </form>
  )
}
