import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchHighscores, saveHighscore } from '../../utils/api'
import { calculerScore } from '../../utils/scoreUtils'

function PageScore({ pseudo, victoire, tuiles, temps }) {
  const navigate = useNavigate()
  const [highscores, setHighscores] = useState([])
  const [scoreSauvegarde, setScoreSauvegarde] = useState(false)

  const score = calculerScore(tuiles, temps)

  useEffect(() => {
    if (victoire) {
      sauvegarderScore()
    }
    chargerHighscores()
  }, [])

  const sauvegarderScore = async () => {
    try {
      await saveHighscore(pseudo, score, 1)
      setScoreSauvegarde(true)
    } catch {
      console.log('Erreur sauvegarde score')
    }
  }

  const chargerHighscores = async () => {
    try {
      const donnees = await fetchHighscores()
      setHighscores(donnees)
    } catch {
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
        {victoire && <p>Score: <strong>{score} points</strong></p>}
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
