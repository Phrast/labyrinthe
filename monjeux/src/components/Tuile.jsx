function Tuile({ type, revelee, onClick, estJoueur }) {
  const typeBase = type.split(':')[0]
  const sousType = type.includes(':') ? type.split(':')[1] : null

  const getCouleur = () => {
    if (!revelee) return '#333'
    switch (typeBase) {
      case 'S': return '#4CAF50'
      case 'E': return '#FF9800'
      case 'C': return '#E0E0E0'
      case 'W': return '#424242'
      case 'K': return sousType || '#FFD700'
      case 'D': return sousType || '#8B4513'
      case 'M': return '#f44336'
      case 'O': return '#FF5722'
      case 'I': return '#2196F3'
      default: return '#9C27B0'
    }
  }

  const getContenu = () => {
    if (!revelee) return '?'
    if (estJoueur) return '@'
    switch (typeBase) {
      case 'S': return 'S'
      case 'E': return 'E'
      case 'C': return ''
      case 'W': return '#'
      case 'K': return 'K'
      case 'D': return 'D'
      case 'M': return 'M'
      case 'O': return 'X'
      case 'I': return 'i'
      default: return typeBase
    }
  }

  return (
    <div
      className={`tuile ${revelee ? 'revelee' : 'cachee'}`}
      style={{ backgroundColor: getCouleur() }}
      onClick={onClick}
    >
      {getContenu()}
    </div>
  )
}

export default Tuile
