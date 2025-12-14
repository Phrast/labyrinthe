const API_URL = 'http://localhost:4000/api'

export async function fetchLevel(levelId) {
  const reponse = await fetch(`${API_URL}/levels/${levelId}`)

  if (!reponse.ok) {
    throw new Error(`Erreur lors du chargement du niveau ${levelId}`)
  }

  return await reponse.json()
}

export async function fetchHighscores() {
  const reponse = await fetch(`${API_URL}/highscores`)

  if (!reponse.ok) {
    throw new Error('Erreur lors du chargement des highscores')
  }

  return await reponse.json()
}

export async function saveHighscore(playerName, score, levelId) {
  const reponse = await fetch(`${API_URL}/highscores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerName, score, levelId })
  })

  if (!reponse.ok) {
    throw new Error('Erreur lors de la sauvegarde du score')
  }

  return await reponse.json()
}
