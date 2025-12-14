import { getTileColor, getTileContent } from '../../utils/tileUtils'

function Tuile({ type, revelee, onClick, estJoueur }) {
  return (
    <div
      className={`tuile ${revelee ? 'revelee' : 'cachee'}`}
      style={{ backgroundColor: getTileColor(type, revelee) }}
      onClick={onClick}
    >
      {getTileContent(type, revelee, estJoueur)}
    </div>
  )
}

export default Tuile
