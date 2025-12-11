export const ENNEMIS = {
  goblin: { hp: 14, attack: 3, nom: 'Gobelin' },
  slime: { hp: 10, attack: 2, nom: 'Slime' },
  orc: { hp: 20, attack: 5, nom: 'Orc' }
}

export const ARMES = {
  pickaxe: { degats: 8, nom: 'Pioche' },
  water_bucket: { degats: 5, nom: 'Seau' },
  swim_boots: { degats: 3, nom: 'Bottes' }
}

export const DEGATS_PIEGE = 15

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
