export function calculerScore(tuiles, temps) {
  return Math.max(0, 1000 - tuiles * 10 - temps * 2)
}

export function calculerTempsEcoule(tempsDebut) {
  return Math.floor((Date.now() - tempsDebut) / 1000)
}

export function formatterTemps(secondes) {
  if (secondes < 60) {
    return `${secondes}s`
  }

  const minutes = Math.floor(secondes / 60)
  const sec = secondes % 60
  return `${minutes}:${sec.toString().padStart(2, '0')}`
}
