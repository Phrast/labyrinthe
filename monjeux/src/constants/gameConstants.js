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
export const HP_INITIAL = 100

export const TILE_TYPES = {
  START: 'S',
  EXIT: 'E',
  CLEAR: 'C',
  WALL: 'W',
  KEY: 'K',
  DOOR: 'D',
  MONSTER: 'M',
  TRAP: 'O',
  ITEM: 'I'
}

export const TILE_COLORS = {
  [TILE_TYPES.START]: '#4CAF50',
  [TILE_TYPES.EXIT]: '#FF9800',
  [TILE_TYPES.CLEAR]: '#E0E0E0',
  [TILE_TYPES.WALL]: '#424242',
  [TILE_TYPES.KEY]: '#FFD700',
  [TILE_TYPES.DOOR]: '#8B4513',
  [TILE_TYPES.MONSTER]: '#f44336',
  [TILE_TYPES.TRAP]: '#FF5722',
  [TILE_TYPES.ITEM]: '#2196F3',
  HIDDEN: '#333',
  DEFAULT: '#9C27B0'
}

export const TILE_CONTENT = {
  [TILE_TYPES.START]: 'S',
  [TILE_TYPES.EXIT]: 'E',
  [TILE_TYPES.CLEAR]: '',
  [TILE_TYPES.WALL]: '#',
  [TILE_TYPES.KEY]: 'K',
  [TILE_TYPES.DOOR]: 'D',
  [TILE_TYPES.MONSTER]: 'M',
  [TILE_TYPES.TRAP]: 'X',
  [TILE_TYPES.ITEM]: 'i',
  HIDDEN: '?',
  PLAYER: '@'
}

export const TRAP_ITEM_REQUIREMENTS = {
  lava: 'swim_boots',
  water: 'water_bucket',
  rock: 'pickaxe'
}
