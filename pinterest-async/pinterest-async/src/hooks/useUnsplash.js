import { useEffect, useRef, useState } from 'react'
import { listPopular, searchPhotos } from '../api/unsplash'

const LS_FIRST_QUERY = 'first_query'

export default function useUnsplash(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('Populares')
  const firstQueryRef = useRef('')

  useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        setError('')
        const photos = await listPopular()
        setItems(photos)
        setTitle('Populares')
        firstQueryRef.current = '::popular::'
        localStorage.setItem(LS_FIRST_QUERY, firstQueryRef.current)
      }catch(e){
        setError('No se pudieron cargar las imágenes')
      }finally{ setLoading(false) }
    })()
  }, [])

  async function doSearch(q){
    if(!q) return
    try{
      setLoading(true)
      setError('')
      const { results } = await searchPhotos(q)
      setItems(results)
      setTitle(`Resultados para “${q}”`)
      const exists = localStorage.getItem(LS_FIRST_QUERY)
      if(!exists || exists === '::popular::'){
        localStorage.setItem(LS_FIRST_QUERY, q)
      }
    }catch(e){
      setError('No se pudo completar la búsqueda')
    }finally{ setLoading(false) }
  }

  async function reset(){
    const first = localStorage.getItem(LS_FIRST_QUERY)
    if(first && first !== '::popular::'){
      await doSearch(first)
    }else{
      try{
        setLoading(true)
        setError('')
        setTitle('Populares')
        const photos = await listPopular()
        setItems(photos)
      }catch(e){ setError('No se pudieron cargar las imágenes') }
      finally{ setLoading(false) }
    }
  }

  return { items, loading, error, title, doSearch, reset }
}
