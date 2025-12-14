import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import PageAccueil from './components/pages/PageAccueil'
import PageJeu from './components/pages/PageJeu'
import PageScore from './components/pages/PageScore'

function App() {
  const [pseudo, setPseudo] = useState('')
  const [niveauChoisi, setNiveauChoisi] = useState(1)
  const [resultat, setResultat] = useState({
    victoire: false,
    tuiles: 0,
    temps: 0
  })

  return (
    <Routes>
      <Route
        path="/"
        element={<PageAccueil setPseudo={setPseudo} setNiveauChoisi={setNiveauChoisi} />}
      />

      <Route
        path="/jeu"
        element={<PageJeu pseudo={pseudo} niveauChoisi={niveauChoisi} setResultat={setResultat} />}
      />

      <Route
        path="/score"
        element={
          <PageScore
            pseudo={pseudo}
            victoire={resultat.victoire}
            tuiles={resultat.tuiles}
            temps={resultat.temps}
          />
        }
      />
    </Routes>
  )
}

export default App
