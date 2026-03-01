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

      {isLast && (
        <div className="end-actions">
          <button className="btn-restart" onClick={handleRestart}>
            Relancer une partie similaire
          </button>
          <button className="btn-menu" onClick={onHome}>
            Retour au menu
          </button>
        </div>
      )}
    </div>
  )
}

export default GamePage
