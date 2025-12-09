function Tuile({ type, revelee, onClick, estJoueur }) {
  const getCouleur = () => {
    if (!revelee) return '#333'

    switch (type) {
      case 'S': return '#4CAF50'
      case 'E': return '#FF9800'
      case 'C': return '#E0E0E0' 
      case 'W': return '#424242' 
      default: return '#9C27B0'
    }
  }

  const getContenu = () => {
    if (!revelee) return '?'
    if (estJoueur) return '●'

    switch (type) {
      case 'S': return '▶'
      case 'E': return '★'
      case 'C': return ''
      case 'W': return '■'
      default: return type.charAt(0)
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
