export default function ImageCard({ item }){
  return (
    <article className="card">
      <img src={item.src} alt={item.alt} loading="lazy" />
      <div className="card__meta">
        {item.user?.avatar && <img src={item.user.avatar} alt="" loading="lazy" />}
        <div className="meta__text">
          <div className="meta__title">{item.user?.name || 'Autor desconocido'}</div>
          <div className="meta__sub">❤ {item.likes} · @{item.user?.username}</div>
        </div>
      </div>
    </article>
  )
}
