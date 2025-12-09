import Tuile from './Tuile'

function Grille({ niveau, tuilesRevelees, positionJoueur, onTuileClick }) {
  return (
    <div
      className="grille"
      style={{
        gridTemplateColumns: `repeat(${niveau.cols}, 50px)`,
        gridTemplateRows: `repeat(${niveau.rows}, 50px)`
      }}
    >
      {niveau.grid.map((ligne, y) =>
        ligne.map((cellule, x) => {
          const estRevelee = tuilesRevelees.some(t => t.x === x && t.y === y)
          const estJoueur = positionJoueur.x === x && positionJoueur.y === y

          return (
            <Tuile
              key={`${x}-${y}`}
              type={cellule}
              revelee={estRevelee}
              estJoueur={estJoueur}
              onClick={() => onTuileClick(x, y)}
            />
          )
        })
      )}
    </div>
  )
}

export default Grille
