import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Grille from '../game/Grille'
import Inventory from '../game/Inventory'
import BattleModal from '../game/BattleModal'
import { HP_INITIAL, DEGATS_PIEGE, TILE_TYPES } from '../../constants/gameConstants'
import { fetchLevel } from '../../utils/api'
import { parseTileType, isTileRevealed } from '../../utils/tileUtils'
import { isAdjacent, getItemRequis, findStartPosition, updateGridCell } from '../../utils/gameRules'
import { calculerTempsEcoule } from '../../utils/scoreUtils'

function PageJeu({ pseudo, niveauChoisi, setResultat }) {
  const navigate = useNavigate()

  const [niveau, setNiveau] = useState(null)
  const [tuilesRevelees, setTuilesRevelees] = useState([])
  const [positionJoueur, setPositionJoueur] = useState({ x: 0, y: 0 })
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)
  const [tempsDebut, setTempsDebut] = useState(null)

  const [hp, setHp] = useState(HP_INITIAL)
  const [cles, setCles] = useState([])
  const [items, setItems] = useState([])

  const [combat, setCombat] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    chargerNiveau()
  }, [])

  const afficherMessage = (texte) => {
    setMessage(texte)
    setTimeout(() => setMessage(null), 2000)
  }

  const verifierGameOver = (nouveauHp) => {
    if (nouveauHp <= 0) {
      const temps = calculerTempsEcoule(tempsDebut)
      setResultat({ victoire: false, tuiles: tuilesRevelees.length, temps })
      navigate('/score')
      return true
    }
    return false
  }

  const chargerNiveau = async () => {
    try {
      setChargement(true)
      setErreur(null)

      const donnees = await fetchLevel(niveauChoisi)
      const posDepart = findStartPosition(donnees.grid)

      setNiveau(donnees)
      setPositionJoueur(posDepart)
      setTuilesRevelees([posDepart])
      setTempsDebut(Date.now())
      setHp(HP_INITIAL)
      setCles([])
      setItems([])
      setChargement(false)
    } catch {
      setErreur('Erreur API. Lance: cd server && node server.js')
      setChargement(false)
    }
  }

  const appliquerEffetTuile = (x, y) => {
    const typeTuile = niveau.grid[y][x]
    const { base, subType } = parseTileType(typeTuile)

    if (base === TILE_TYPES.KEY && subType && !cles.includes(subType)) {
      setCles([...cles, subType])
      afficherMessage(`Cle ${subType} trouvee`)
    }

    if (base === TILE_TYPES.ITEM && subType && !items.includes(subType)) {
      setItems([...items, subType])
      afficherMessage(`Item ${subType} trouve`)
    }

    if (base === TILE_TYPES.TRAP) {
      const itemRequis = getItemRequis(subType)
      if (!items.includes(itemRequis)) {
        const nouveauHp = hp - DEGATS_PIEGE
        setHp(nouveauHp)
        afficherMessage(`Piege ! -${DEGATS_PIEGE} HP`)
        verifierGameOver(nouveauHp)
      }
    }

    if (base === TILE_TYPES.EXIT) {
      const temps = calculerTempsEcoule(tempsDebut)
      setResultat({ victoire: true, tuiles: tuilesRevelees.length, temps })
      navigate('/score')
    }
  }

  const handleTuileClick = (x, y) => {
    const dejaRevelee = isTileRevealed(tuilesRevelees, x, y)
    const typeTuile = niveau.grid[y][x]
    const { base, subType } = parseTileType(typeTuile)

    if (dejaRevelee) {
      if (base === TILE_TYPES.WALL) return

      if (base === TILE_TYPES.DOOR && !cles.includes(subType)) {
        afficherMessage(`Porte verrouillee, cle ${subType} requise`)
        return
      }

      if (base === TILE_TYPES.MONSTER) {
        if (items.length === 0) {
          afficherMessage('Il faut une arme pour combattre !')
          return
        }
        setCombat({ x, y, monstre: subType })
        return
      }

      setPositionJoueur({ x, y })
      appliquerEffetTuile(x, y)
      return
    }

    if (!isAdjacent(positionJoueur, { x, y })) return

    if (base === TILE_TYPES.MONSTER) {
      setTuilesRevelees([...tuilesRevelees, { x, y }])
      afficherMessage('Un monstre ! Il faut une arme pour combattre')
      return
    }

    if (base === TILE_TYPES.DOOR) {
      setTuilesRevelees([...tuilesRevelees, { x, y }])
      if (!cles.includes(subType)) {
        afficherMessage(`Porte verrouillee, cle ${subType} requise`)
        return
      }
    }

    if (base === TILE_TYPES.TRAP) {
      setTuilesRevelees([...tuilesRevelees, { x, y }])
      const itemRequis = getItemRequis(subType)
      if (!items.includes(itemRequis)) {
        afficherMessage(`Danger ! Item ${itemRequis} recommande`)
      }
    }

    setTuilesRevelees([...tuilesRevelees, { x, y }])
  }

  const handleCombatTermine = (resultat) => {
    if (resultat.victoire) {
      setHp(resultat.hpRestant)
      setTuilesRevelees([...tuilesRevelees, combat])

      const nouvelleGrille = updateGridCell(niveau.grid, combat.x, combat.y, TILE_TYPES.CLEAR)
      setNiveau({ ...niveau, grid: nouvelleGrille })
      afficherMessage(`Victoire ! -${resultat.degatsSubis} HP`)

      verifierGameOver(resultat.hpRestant)
    } else {
      setHp(0)
      verifierGameOver(0)
    }
    setCombat(null)
  }

  const handleFuir = () => {
    afficherMessage('Fuite !')
    setCombat(null)
  }

  if (chargement) {
    return <div className="page jeu"><p>Chargement...</p></div>
  }

  if (erreur) {
    return (
      <div className="page jeu">
        <p className="erreur">{erreur}</p>
        <button onClick={chargerNiveau}>Reessayer</button>
      </div>
    )
  }

  return (
    <div className="page jeu">
      <div className="info-jeu">
        <span>Joueur: {pseudo}</span>
        <span>Niveau: {niveau.name}</span>
        <span>Tuiles: {tuilesRevelees.length}</span>
      </div>

      <Inventory hp={hp} cles={cles} items={items} />

      {message && <div className="message-jeu">{message}</div>}

      <div className="zone-jeu">
        <Grille
          niveau={niveau}
          tuilesRevelees={tuilesRevelees}
          positionJoueur={positionJoueur}
          onTuileClick={handleTuileClick}
        />

        <div className="legende">
          <h3>Legende</h3>
          <div className="legende-item"><span className="icone">@</span> Joueur</div>
          <div className="legende-item"><span className="icone">S</span> Depart</div>
          <div className="legende-item"><span className="icone">E</span> Sortie</div>
          <div className="legende-item"><span className="icone">#</span> Mur</div>
          <div className="legende-item"><span className="icone">K</span> Cle</div>
          <div className="legende-item"><span className="icone">D</span> Porte</div>
          <div className="legende-item"><span className="icone">M</span> Monstre</div>
          <div className="legende-item"><span className="icone">X</span> Obstacle</div>
          <div className="legende-item"><span className="icone">i</span> Item</div>
          <div className="legende-item"><span className="icone">?</span> Cache</div>
        </div>
      </div>

      {combat && (
        <BattleModal
          monstre={combat.monstre}
          hpJoueur={hp}
          items={items}
          onCombatTermine={handleCombatTermine}
          onFuir={handleFuir}
        />
      )}

      <p className="aide">Clique sur ? pour reveler. Trouve la sortie E</p>
    </div>
  )
}

export default PageJeu
