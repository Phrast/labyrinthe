import { TRAP_ITEM_REQUIREMENTS } from '../constants/gameConstants'

export function isAdjacent(pos1, pos2) {
  const dx = Math.abs(pos1.x - pos2.x)
  const dy = Math.abs(pos1.y - pos2.y)
  return (dx === 1 && dy === 0) || (dx === 0 && dy === 1)
}

export function getItemRequis(trapType) {
  return TRAP_ITEM_REQUIREMENTS[trapType] || null
}

export function findStartPosition(grid) {
  let posDepart = { x: 0, y: 0 }

  grid.forEach((ligne, y) => {
    ligne.forEach((cellule, x) => {
      if (cellule === 'S' || cellule.startsWith('S:')) {
        posDepart = { x, y }
      }
    })
  })

  return posDepart
}

export function updateGridCell(grid, x, y, newValue) {
  return grid.map((ligne, rowY) =>
    ligne.map((cellule, colX) =>
      (colX === x && rowY === y) ? newValue : cellule
    )
  )
}
