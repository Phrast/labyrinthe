import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PageAccueil({ setPseudo, setNiveauChoisi }) {
  const [pseudoLocal, setPseudoLocal] = useState('')
  const [niveau, setNiveau] = useState(1)
  const navigate = useNavigate()

  const handleJouer = () => {
    if (pseudoLocal.trim() === '') {
      alert('Entre ton pseudo pour jouer !')
      return
    }
    setPseudo(pseudoLocal)
    setNiveauChoisi(niveau)
    navigate('/jeu')
  }

  return (
    <div className="page accueil">
      <h1>Labyrinthe</h1>
      <p className="description">
        Explore le labyrinthe en révélant les tuiles une par une.
        Trouve la sortie en évitant les murs !
        Tu ne peux révéler que les tuiles à côté de celles déjà découvertes.
      </p>

      <div className="formulaire">
        <input
          type="text"
          placeholder="Ton pseudo..."
          value={pseudoLocal}
          onChange={(e) => setPseudoLocal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleJouer()}
        />

        <select value={niveau} onChange={(e) => setNiveau(Number(e.target.value))}>
          <option value={1}>Niveau 1</option>
          <option value={2}>Niveau 2</option>
          <option value={3}>Niveau 3</option>
        </select>

        <button onClick={handleJouer}>Jouer</button>
      </div>
    </div>
  )
}

export default PageAccueil
