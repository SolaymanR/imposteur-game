import { useState, useCallback, useRef } from 'react'

function PlayerCard({ player, showRoles, onReveal }) {
  const [revealed, setRevealed] = useState(false)
  const cardRef = useRef(null)

  const handlePointerDown = useCallback((e) => {
    e.target.setPointerCapture(e.pointerId)
    setRevealed(true)
    onReveal()
  }, [onReveal])

  const handlePointerUp = useCallback((e) => {
    if (cardRef.current) cardRef.current.releasePointerCapture(e.pointerId)
    setRevealed(false)
  }, [])

  const roleLabel =
    player.role === 'detective'
      ? 'Detective'
      : player.role === 'impostor'
        ? 'Imposteur'
        : 'Mister White'

  const isMisterWhite = player.role === 'mister-white'

  return (
    <div
      ref={cardRef}
      className={`player-card${revealed ? ` revealed ${player.role}` : ''}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onLostPointerCapture={() => setRevealed(false)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {revealed ? (
        <>
          {isMisterWhite ? (
            <>
              <div className="card-word">VOUS ETES MISTER WHITE !</div>
              <div className="card-hint">(vous n'avez aucune info sur le mot)</div>
              <span className="card-role mister-white">Mister White</span>
            </>
          ) : (
            <>
              <div className="card-word">{player.word}</div>
              {showRoles && (
                <span className={`card-role ${player.role}`}>{roleLabel}</span>
              )}
            </>
          )}
        </>
      ) : (
        <div className="card-hidden-text">
          Appuyez et maintenez pour voir
        </div>
      )}
    </div>
  )
}

export default PlayerCard
