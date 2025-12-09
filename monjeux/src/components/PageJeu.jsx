import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Grille from './Grille'
import Inventory from './Inventory'
import BattleModal from './BattleModal'

const API_URL = 'http://localhost:4000/api'

function PageJeu({ pseudo, setResultat }) {
  const navigate = useNavigate()

  const [niveau, setNiveau] = useState(null)
  const [tuilesRevelees, setTuilesRevelees] = useState([])
  const [positionJoueur, setPositionJoueur] = useState({ x: 0, y: 0 })
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)
  const [tempsDebut, setTempsDebut] = useState(null)

  const [hp, setHp] = useState(100)
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

  const chargerNiveau = async () => {
    try {
      setChargement(true)
      const reponse = await fetch(`${API_URL}/levels/2`)
      if (!reponse.ok) throw new Error('Erreur')

      const donnees = await reponse.json()
      setNiveau(donnees)

      let posDepart = { x: 0, y: 0 }
      donnees.grid.forEach((ligne, y) => {
        ligne.forEach((cellule, x) => {
          if (cellule === 'S') posDepart = { x, y }
        })
      })

      setPositionJoueur(posDepart)
      setTuilesRevelees([posDepart])
      setTempsDebut(Date.now())
      setHp(100)
      setCles([])
      setItems([])
      setChargement(false)
    } catch {
      setErreur('Erreur API. Lance: cd server && node server.js')
      setChargement(false)
    }
  }

  const estAdjacente = (x, y) => {
    return tuilesRevelees.some(t => {
      const typeBase = niveau.grid[t.y][t.x].split(':')[0]
      if (typeBase === 'W') return false
      const dx = Math.abs(t.x - x)
      const dy = Math.abs(t.y - y)
      return (dx === 1 && dy === 0) || (dx === 0 && dy === 1)
    })
  }

  const getSousType = (type) => type.includes(':') ? type.split(':')[1] : null

  const getItemRequis = (obstacle) => {
    const map = { fire: 'water_bucket', rock: 'pickaxe', water: 'swim_boots' }
    return map[obstacle] || null
  }

  const appliquerEffetTuile = (x, y) => {
    const typeTuile = niveau.grid[y][x]
    const typeBase = typeTuile.split(':')[0]
    const sousType = getSousType(typeTuile)

    if (typeBase === 'K' && sousType && !cles.includes(sousType)) {
      setCles([...cles, sousType])
      afficherMessage(`Cle ${sousType} trouvee`)
    }

    if (typeBase === 'I' && sousType && !items.includes(sousType)) {
      setItems([...items, sousType])
      afficherMessage(`Item ${sousType} trouve`)
    }

    if (typeBase === 'E') {
      const temps = Math.floor((Date.now() - tempsDebut) / 1000)
      setResultat({ victoire: true, tuiles: tuilesRevelees.length, temps })
      navigate('/score')
    }
  }

  const handleTuileClick = (x, y) => {
    const dejaRevelee = tuilesRevelees.some(t => t.x === x && t.y === y)
    const typeTuile = niveau.grid[y][x]
    const typeBase = typeTuile.split(':')[0]
    const sousType = getSousType(typeTuile)

    if (dejaRevelee) {
      if (typeBase === 'W') return

      if (typeBase === 'D' && !cles.includes(sousType)) {
        afficherMessage(`Porte verrouillee, cle ${sousType} requise`)
        return
      }

      if (typeBase === 'O') {
        const itemRequis = getItemRequis(sousType)
        if (!items.includes(itemRequis)) {
          afficherMessage(`Obstacle, item ${itemRequis} requis`)
          return
        }
      }

      setPositionJoueur({ x, y })
      appliquerEffetTuile(x, y)
      return
    }

    if (!estAdjacente(x, y)) return

    if (typeBase === 'M') {
      setCombat({ x, y, monstre: sousType })
      return
    }

    if (typeBase === 'D') {
      setTuilesRevelees([...tuilesRevelees, { x, y }])
      if (!cles.includes(sousType)) {
        afficherMessage(`Porte verrouillee, cle ${sousType} requise`)
        return
      }
    }

    if (typeBase === 'O') {
      setTuilesRevelees([...tuilesRevelees, { x, y }])
      const itemRequis = getItemRequis(sousType)
      if (!items.includes(itemRequis)) {
        afficherMessage(`Obstacle, item ${itemRequis} requis`)
        return
      }
    }

    setTuilesRevelees([...tuilesRevelees, { x, y }])
  }

  const handleVictoireCombat = () => {
    if (combat) {
      setTuilesRevelees([...tuilesRevelees, combat])
      const nouvelleGrille = niveau.grid.map((ligne, y) =>
        ligne.map((cellule, x) =>
          (x === combat.x && y === combat.y) ? 'C' : cellule
        )
      )
      setNiveau({ ...niveau, grid: nouvelleGrille })
      afficherMessage('Monstre vaincu')
    }
    setCombat(null)
  }

  if (chargement) return <div className="page jeu"><p>Chargement...</p></div>

  if (erreur) return (
    <div className="page jeu">
      <p className="erreur">{erreur}</p>
      <button onClick={chargerNiveau}>Reessayer</button>
    </div>
  )

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
          aArme={items.length > 0}
          onVictoire={handleVictoireCombat}
          onFermer={() => setCombat(null)}
        />
      )}

      <p className="aide">Clique sur ? pour reveler. Trouve la sortie E</p>
    </div>
  )
}

export default PageJeu
