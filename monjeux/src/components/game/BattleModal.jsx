import { getStatsEnnemi, calculerDegatsJoueur, simulerCombat } from '../../utils/combatSystem'

function BattleModal({ monstre, hpJoueur, items, onCombatTermine, onFuir }) {
  const statsEnnemi = getStatsEnnemi(monstre)
  const degatsJoueur = calculerDegatsJoueur(items)

  const resultat = simulerCombat(hpJoueur, items, monstre)

  const handleCombat = () => {
    onCombatTermine(resultat)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-contenu">
        <h2>Combat</h2>

        <div className="combat-stats">
          <div className="combat-ennemi">
            <div className="ennemi-icon">M</div>
            <p><strong>{statsEnnemi.nom}</strong></p>
            <p>HP: {statsEnnemi.hp}</p>
            <p>Attaque: {statsEnnemi.attack}</p>
          </div>

          <div className="combat-vs">VS</div>

          <div className="combat-joueur">
            <div className="ennemi-icon">@</div>
            <p><strong>Vous</strong></p>
            <p>HP: {hpJoueur}</p>
            <p>Degats: {degatsJoueur}</p>
          </div>
        </div>

        <div className="combat-preview">
          {resultat.victoire ? (
            <p className="victoire-texte">
              Victoire ! Vous perdrez {resultat.degatsSubis} HP
            </p>
          ) : (
            <p className="defaite-texte">
              Defaite ! Vous allez mourir...
            </p>
          )}
        </div>

        <div className="combat-boutons">
          <button onClick={handleCombat}>Combattre</button>
          <button onClick={onFuir} className="btn-secondaire">Fuir</button>
        </div>
      </div>
    </div>
  )
}

export default BattleModal
