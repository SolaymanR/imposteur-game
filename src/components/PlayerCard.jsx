import { useState, useCallback, useEffect, useRef } from 'react'

function PlayerCard({ player, showRoles, onReveal }) {
  const [revealed, setRevealed] = useState(false)
  const pressing = useRef(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const show = (e) => {
      e.preventDefault()
      pressing.current = true
      setRevealed(true)
      onReveal()
    }

    const hide = () => {
      if (!pressing.current) return
      pressing.current = false
      setRevealed(false)
    }

    el.addEventListener('touchstart', show, { passive: false })
    el.addEventListener('touchend', hide)
    el.addEventListener('touchcancel', hide)
    el.addEventListener('mousedown', show)
    el.addEventListener('mouseup', hide)

    // hide if mouse/touch ends anywhere on the page
    document.addEventListener('mouseup', hide)
    document.addEventListener('touchend', hide)
    document.addEventListener('touchcancel', hide)

    return () => {
      el.removeEventListener('touchstart', show)
      el.removeEventListener('touchend', hide)
      el.removeEventListener('touchcancel', hide)
      el.removeEventListener('mousedown', show)
      el.removeEventListener('mouseup', hide)
      document.removeEventListener('mouseup', hide)
      document.removeEventListener('touchend', hide)
      document.removeEventListener('touchcancel', hide)
    }
  }, [onReveal])

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
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="card-content" style={{ display: revealed ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
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
      </div>
      <div className="card-hidden-text" style={{ display: revealed ? 'none' : 'block' }}>
        Appuyez et maintenez pour voir
      </div>
    </div>
  )
}

export default PlayerCard
