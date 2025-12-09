import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PageAccueil({ setPseudo }) {
  const [pseudoLocal, setPseudoLocal] = useState('')
  const navigate = useNavigate()

  const handleJouer = () => {
    if (pseudoLocal.trim() === '') {
      alert('Entre ton pseudo pour jouer !')
      return
    }
    setPseudo(pseudoLocal)
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
        <button onClick={handleJouer}>Jouer</button>
      </div>
    </div>
  )
}

export default PageAccueil
