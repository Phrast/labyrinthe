import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:4000/api'

function PageScore({ pseudo, victoire, tuiles, temps }) {
  const navigate = useNavigate() 
  const [highscores, setHighscores] = useState([])
  const [scoreSauvegarde, setScoreSauvegarde] = useState(false)
  
  const calculerScore = () => {
    return Math.max(0, 1000 - (tuiles * 10) - (temps * 2))
  }

  useEffect(() => {
    if (victoire) {
      sauvegarderScore()
    }
    chargerHighscores()
  }, [])

  const sauvegarderScore = async () => {
    try {
      await fetch(`${API_URL}/highscores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: pseudo,
          score: calculerScore(),
          levelId: 1
        })
      })
      setScoreSauvegarde(true)
    } catch (err) {
      console.log('Erreur sauvegarde score')
    }
  }

  const chargerHighscores = async () => {
    try {
      const reponse = await fetch(`${API_URL}/highscores`)
      if (reponse.ok) {
        const donnees = await reponse.json()
        setHighscores(donnees)
      }
    } catch (err) {
      console.log('Erreur chargement highscores')
    }
  }

  const handleRejouer = () => {
    navigate('/')
  }

  return (
    <div className="page score">
      <h1>{victoire ? 'Victoire !' : 'Perdu...'}</h1>

      <div className="resultat">
        <p>Joueur: <strong>{pseudo}</strong></p>
        <p>Tuiles révélées: <strong>{tuiles}</strong></p>
        <p>Temps: <strong>{temps} secondes</strong></p>
        {victoire && <p>Score: <strong>{calculerScore()} points</strong></p>}
        {scoreSauvegarde && <p className="sauvegarde">✓ Score enregistré !</p>}
      </div>

      <h2>Meilleurs Scores</h2>
      <div className="highscores">
        {highscores.length === 0 ? (
          <p>Aucun score enregistré</p>
        ) : (
          <ol>
            {highscores.slice(0, 10).map((hs, index) => (
              <li key={index}>
                {hs.playerName} - {hs.score} pts
              </li>
            ))}
          </ol>
        )}
      </div>

      <button onClick={handleRejouer}>Rejouer</button>
    </div>
  )
}

export default PageScore
