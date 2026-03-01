import { useState } from 'react'

function HomePage({ onStart }) {
  const [playerCount, setPlayerCount] = useState(3)
  const [impostorCount, setImpostorCount] = useState(1)
  const [mrWhiteCount, setMrWhiteCount] = useState(0)
  const [showRoles, setShowRoles] = useState(false)
  const [error, setError] = useState('')

  const maxSpecialRoles = playerCount - 1 // at least 1 detective
  const maxImpostors = Math.min(5, maxSpecialRoles - mrWhiteCount)
  const maxMrWhite = Math.min(5, maxSpecialRoles - impostorCount)

  const handleStart = () => {
    if (impostorCount + mrWhiteCount >= playerCount) {
      setError('Il faut au moins 1 Detective !')
      return
    }
    setError('')
    onStart({ playerCount, impostorCount, mrWhiteCount, showRoles })
  }

  const adjust = (setter, current, delta, min, max) => {
    const next = current + delta
    if (next >= min && next <= max) {
      setter(next)
      setError('')
    }
  }

  // When player count changes, clamp impostor/mrWhite
  const adjustPlayerCount = (delta) => {
    const next = playerCount + delta
    if (next < 3 || next > 20) return
    setPlayerCount(next)
    const newMax = next - 1
    if (impostorCount + mrWhiteCount >= next) {
      const newImp = Math.min(impostorCount, Math.max(1, newMax - mrWhiteCount))
      const newMw = Math.min(mrWhiteCount, newMax - newImp)
      setImpostorCount(newImp)
      setMrWhiteCount(newMw)
    }
    setError('')
  }

  return (
    <div className="home">
      <h1>
        <span>L'</span>Imposteur
      </h1>

      <div className="settings">
        <div className="setting-row">
          <label>Joueurs</label>
          <div className="controls">
            <button onClick={() => adjustPlayerCount(-1)} disabled={playerCount <= 3}>
              &minus;
            </button>
            <span>{playerCount}</span>
            <button onClick={() => adjustPlayerCount(1)} disabled={playerCount >= 20}>
              +
            </button>
          </div>
        </div>

        <div className="setting-row">
          <label>Imposteurs</label>
          <div className="controls">
            <button
              onClick={() => adjust(setImpostorCount, impostorCount, -1, 1, maxImpostors)}
              disabled={impostorCount <= 1}
            >
              &minus;
            </button>
            <span>{impostorCount}</span>
            <button
              onClick={() => adjust(setImpostorCount, impostorCount, 1, 1, maxImpostors)}
              disabled={impostorCount >= maxImpostors}
            >
              +
            </button>
          </div>
        </div>

        <div className="setting-row">
          <label>Mister White</label>
          <div className="controls">
            <button
              onClick={() => adjust(setMrWhiteCount, mrWhiteCount, -1, 0, maxMrWhite)}
              disabled={mrWhiteCount <= 0}
            >
              &minus;
            </button>
            <span>{mrWhiteCount}</span>
            <button
              onClick={() => adjust(setMrWhiteCount, mrWhiteCount, 1, 0, maxMrWhite)}
              disabled={mrWhiteCount >= maxMrWhite}
            >
              +
            </button>
          </div>
        </div>

        <div className="toggle-row">
          <label>Afficher les roles</label>
          <div className="toggle">
            <input
              type="checkbox"
              checked={showRoles}
              onChange={(e) => setShowRoles(e.target.checked)}
            />
            <span className="slider" onClick={() => setShowRoles(!showRoles)} />
          </div>
        </div>
      </div>

      <p className="error-msg">{error}</p>

      <button className="btn-start" onClick={handleStart}>
        Lancer la partie
      </button>
    </div>
  )
}

export default HomePage
