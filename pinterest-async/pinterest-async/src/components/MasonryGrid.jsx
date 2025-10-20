import ImageCard from './ImageCard'

export default function MasonryGrid({ items }){
  if(!items?.length) return null
  return (
    <div className="masonry">
      {items.map(item => (
        <div key={item.id} className="masonry__item">
          <ImageCard item={item} />
        </div>
      ))}
    </div>
  )
}
