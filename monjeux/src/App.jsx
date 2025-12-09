import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import PageAccueil from './components/PageAccueil'
import PageJeu from './components/PageJeu'
import PageScore from './components/PageScore'

function App() {
  const [pseudo, setPseudo] = useState('')
  const [resultat, setResultat] = useState({
    victoire: false,
    tuiles: 0,
    temps: 0
  })

  return (
    <Routes>
      <Route
        path="/"
        element={<PageAccueil setPseudo={setPseudo} />}
      />

      <Route
        path="/jeu"
        element={<PageJeu pseudo={pseudo} setResultat={setResultat} />}
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
