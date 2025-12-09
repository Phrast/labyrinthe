function Inventory({ hp, cles, items }) {
  return (
    <div className="inventaire">
      <div className="inventaire-item">
        <span className="label">HP:</span>
        <span className={`valeur ${hp > 50 ? 'hp' : 'hp-faible'}`}>
          {hp}/100
        </span>
      </div>

      <div className="inventaire-item">
        <span className="label">Cles:</span>
        <span className="valeur">
          {cles.length === 0 ? '-' : cles.join(', ')}
        </span>
      </div>

      <div className="inventaire-item">
        <span className="label">Items:</span>
        <span className="valeur">
          {items.length === 0 ? '-' : items.length}
        </span>
      </div>
    </div>
  )
}

export default Inventory
