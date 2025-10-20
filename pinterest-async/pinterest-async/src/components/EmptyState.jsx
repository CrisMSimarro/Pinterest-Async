export default function EmptyState({ text='No hay resultados' }){
  return (
    <div className="empty">
      <div>
        <div style={{fontSize:48}}>🖼️</div>
        <p>{text}</p>
      </div>
    </div>
  )
}
