import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Grille from './Grille'

const API_URL = 'http://localhost:4000/api'

function PageJeu({ pseudo, setResultat }) {
  const navigate = useNavigate()

  const [niveau, setNiveau] = useState(null)
  const [tuilesRevelees, setTuilesRevelees] = useState([])
  const [positionJoueur, setPositionJoueur] = useState({ x: 0, y: 0 })
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)
  const [tempsDebut, setTempsDebut] = useState(null)

  useEffect(() => {
    chargerNiveau()
  }, [])

  const chargerNiveau = async () => {
    try {
      setChargement(true)
      setErreur(null)

      const reponse = await fetch(`${API_URL}/levels/1`)

      if (!reponse.ok) {
        throw new Error('Erreur de chargement')
      }

      const donnees = await reponse.json()
      setNiveau(donnees)

      let posDepart = { x: 0, y: 0 }
      donnees.grid.forEach((ligne, y) => {
        ligne.forEach((cellule, x) => {
          if (cellule === 'S') {
            posDepart = { x, y }
          }
        })
      })

      setPositionJoueur(posDepart)
      setTuilesRevelees([posDepart])
      setTempsDebut(Date.now())

      setChargement(false)
    } catch (err) {
      setErreur('Impossible de charger le niveau. Lance l\'API avec: npm start')
      setChargement(false)
    }
  }

  const estAdjacente = (x, y) => {
    return tuilesRevelees.some(t => {
      const typeTuileRevelee = niveau.grid[t.y][t.x]
      if (typeTuileRevelee === 'W') {
        return false
      }

      const dx = Math.abs(t.x - x)
      const dy = Math.abs(t.y - y)
      return (dx === 1 && dy === 0) || (dx === 0 && dy === 1)
    })
  }

  const handleTuileClick = (x, y) => {
    const dejaRevelee = tuilesRevelees.some(t => t.x === x && t.y === y)

    if (dejaRevelee) {
      const typeTuile = niveau.grid[y][x]
      if (typeTuile !== 'W') {
        setPositionJoueur({ x, y })

        if (typeTuile === 'E') {
          const tempsFin = Date.now()
          const tempsTotal = Math.floor((tempsFin - tempsDebut) / 1000)
          setResultat({ victoire: true, tuiles: tuilesRevelees.length, temps: tempsTotal })
          navigate('/score')
        }
      }
      return
    }

    if (!estAdjacente(x, y)) {
      return
    }

    setTuilesRevelees([...tuilesRevelees, { x, y }])
  }

  if (chargement) {
    return <div className="page jeu"><p>Chargement du niveau...</p></div>
  }

  if (erreur) {
    return (
      <div className="page jeu">
        <p className="erreur">{erreur}</p>
        <button onClick={chargerNiveau}>Réessayer</button>
      </div>
    )
  }

  return (
    <div className="page jeu">
      <div className="info-jeu">
        <span>Joueur: {pseudo}</span>
        <span>Tuiles révélées: {tuilesRevelees.length}</span>
      </div>

      <Grille
        niveau={niveau}
        tuilesRevelees={tuilesRevelees}
        positionJoueur={positionJoueur}
        onTuileClick={handleTuileClick}
      />

      <p className="aide">
        Clique sur une tuile adjacente (?) pour la révéler.
        Clique sur une tuile révélée pour t'y déplacer.
        Trouve la sortie !
      </p>
    </div>
  )
}

export default PageJeu
