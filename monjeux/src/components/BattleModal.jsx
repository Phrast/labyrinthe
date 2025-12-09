function BattleModal({ monstre, aArme, onVictoire, onFermer }) {
  return (
    <div className="modal-overlay">
      <div className="modal-contenu">
        <h2>Combat</h2>
        <div className="ennemi-icon">M</div>
        <p>Un {monstre} bloque le passage !</p>

        {aArme ? (
          <>
            <p className="victoire-texte">Tu as un item, tu gagnes !</p>
            <button onClick={onVictoire}>Continuer</button>
          </>
        ) : (
          <>
            <p className="defaite-texte">Pas d'item, tu ne peux pas passer.</p>
            <button onClick={onFermer}>Reculer</button>
          </>
        )}
      </div>
    </div>
  )
}

export default BattleModal
