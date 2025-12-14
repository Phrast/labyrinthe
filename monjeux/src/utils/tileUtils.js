import { TILE_TYPES, TILE_COLORS, TILE_CONTENT } from '../constants/gameConstants'

export function parseTileType(cell) {
  if (!cell || typeof cell !== 'string') {
    return { base: '', subType: null }
  }

  const parts = cell.split(':')
  return {
    base: parts[0],
    subType: parts.length > 1 ? parts[1] : null
  }
}

export function getTileColor(type, revelee) {
  if (!revelee) return TILE_COLORS.HIDDEN

  const { base, subType } = parseTileType(type)

  if (subType && (base === TILE_TYPES.KEY || base === TILE_TYPES.DOOR)) {
    return subType
  }

  return TILE_COLORS[base] || TILE_COLORS.DEFAULT
}

export function getTileContent(type, revelee, estJoueur = false) {
  if (!revelee) return TILE_CONTENT.HIDDEN
  if (estJoueur) return TILE_CONTENT.PLAYER

  const { base } = parseTileType(type)
  return TILE_CONTENT[base] || base
}

export function isTileRevealed(tuilesRevelees, x, y) {
  return tuilesRevelees.some(tuile => tuile.x === x && tuile.y === y)
}
