import SearchBar from './SearchBar'

export default function Header({ onSearch, onReset }){
  return (
    <header className="header">
      <div className="header__inner">
        <div className="logo" onClick={onReset} title="Volver al inicio">
          <span className="logo__dot"/>
          <span className="logo__text">Pinsen</span>
        </div>
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  )
}
