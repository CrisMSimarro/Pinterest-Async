const API_BASE = 'https://api.unsplash.com'
const KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

const headers = {
  Authorization: `Client-ID ${KEY}`,
}

export async function searchPhotos(query, page = 1, perPage = 30) {
  const url = new URL(API_BASE + '/search/photos')
  url.searchParams.set('query', query)
  url.searchParams.set('page', String(page))
  url.searchParams.set('per_page', String(perPage))
  url.searchParams.set('orientation', 'portrait')

  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error('Error buscando imágenes')
  const data = await res.json()
  return {
    total: data.total,
    results: data.results.map(mapPhoto),
  }
}

export async function listPopular(page = 1, perPage = 30) {
  const url = new URL(API_BASE + '/photos')
  url.searchParams.set('page', String(page))
  url.searchParams.set('per_page', String(perPage))
  url.searchParams.set('order_by', 'popular')

  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error('Error cargando populares')
  const data = await res.json()
  return data.map(mapPhoto)
}

function mapPhoto(p){
  return {
    id: p.id,
    alt: p.alt_description || 'Photo',
    src: p.urls?.regular,
    srcSmall: p.urls?.small,
    width: p.width,
    height: p.height,
    likes: p.likes,
    user: {
      name: p.user?.name,
      username: p.user?.username,
      avatar: p.user?.profile_image?.small,
    }
  }
}
