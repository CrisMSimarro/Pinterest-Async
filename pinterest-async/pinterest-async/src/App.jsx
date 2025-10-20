import Header from './components/Header'
import MasonryGrid from './components/MasonryGrid'
import EmptyState from './components/EmptyState'
import useUnsplash from './hooks/useUnsplash'

export default function App(){
  const { items, loading, error, title, doSearch, reset } = useUnsplash()

  return (
    <>
      <Header onSearch={doSearch} onReset={reset} />
      <main className="container">
        <h1 style={{fontSize:'1.2rem',margin:'0 0 .75rem 0'}}>{title}</h1>

        {error && <p className="muted" role="status">{error}</p>}

        {loading && <p className="muted" role="status">Cargando…</p>}

        {!loading && !items.length && <EmptyState text="Prueba con otra búsqueda"/>}

        <MasonryGrid items={items} />
      </main>

      <footer className="footer">
        <small>Imágenes vía Unsplash API · Proyecto formativo</small>
      </footer>
    </>
  )
}
