import { ENNEMIS, ARMES } from '../constants/gameConstants'

export function calculerDegatsJoueur(items) {
  if (items.length === 0) return 2

  let maxDegats = 2
  items.forEach(item => {
    if (ARMES[item] && ARMES[item].degats > maxDegats) {
      maxDegats = ARMES[item].degats
    }
  })
  return maxDegats
}

export function getStatsEnnemi(type) {
  return ENNEMIS[type] || { hp: 10, attack: 2, nom: 'Monstre' }
}

export function simulerCombat(hpJoueur, items, typeEnnemi) {
  const ennemi = getStatsEnnemi(typeEnnemi)
  const degatsJoueur = calculerDegatsJoueur(items)

  let hpEnnemi = ennemi.hp
  let hpJoueurActuel = hpJoueur
  let log = []

  while (hpEnnemi > 0 && hpJoueurActuel > 0) {
    hpEnnemi -= degatsJoueur
    log.push(`Vous infligez ${degatsJoueur} degats`)

    if (hpEnnemi <= 0) break

    hpJoueurActuel -= ennemi.attack
    log.push(`${ennemi.nom} inflige ${ennemi.attack} degats`)
  }

  return {
    victoire: hpEnnemi <= 0,
    hpRestant: Math.max(0, hpJoueurActuel),
    degatsSubis: hpJoueur - Math.max(0, hpJoueurActuel),
    log
  }
}
