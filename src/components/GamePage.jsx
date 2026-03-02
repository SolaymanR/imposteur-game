import { useState, useCallback } from 'react'
import PlayerCard from './PlayerCard'

function GamePage({ gameState, onRestart, onHome }) {
  const { players, showRoles } = gameState
  const [currentIndex, setCurrentIndex] = useState(0)
  const [seenPlayers, setSeenPlayers] = useState(new Set())

  const isLast = currentIndex === players.length - 1
  const isFirst = currentIndex === 0

  const markSeen = useCallback((index) => {
    setSeenPlayers((prev) => new Set(prev).add(index))
  }, [])

  const goNext = () => {
    if (!isLast) setCurrentIndex((i) => i + 1)
  }

  const goPrev = () => {
    if (!isFirst) setCurrentIndex((i) => i - 1)
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSeenPlayers(new Set())
    onRestart()
  }

  return (
    <div className="game">
      <div className="top-actions">
        <button className="icon-btn" onClick={onHome} title="Retour au menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </button>
        <button className="icon-btn" onClick={handleRestart} title="Relancer une partie similaire">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
        </button>
      </div>

      <div className="game-header">
        <h2>{players[currentIndex].name}</h2>
        <p>
          {currentIndex + 1} / {players.length}
        </p>
      </div>

      <div className="card-container">
        <PlayerCard
          key={currentIndex}
          player={players[currentIndex]}
          showRoles={showRoles}
          onReveal={() => markSeen(currentIndex)}
        />
      </div>

      <div className="nav">
        <button className="nav-btn" onClick={goPrev} disabled={isFirst}>
          &#8249;
        </button>

        <div className="nav-dots">
          {players.map((_, i) => (
            <div
              key={i}
              className={`nav-dot${i === currentIndex ? ' active' : ''}${seenPlayers.has(i) ? ' seen' : ''}`}
            />
          ))}
        </div>

        <button className="nav-btn" onClick={goNext} disabled={isLast}>
          &#8250;
        </button>
      </div>
    </div>
  )
}

export default GamePage
