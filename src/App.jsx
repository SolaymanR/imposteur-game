import { useState, useCallback } from 'react'
import HomePage from './components/HomePage'
import GamePage from './components/GamePage'
import './App.css'

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function App() {
  const [gameState, setGameState] = useState(null)

  const startGame = useCallback(async (settings) => {
    const { playerCount, impostorCount, mrWhiteCount, showRoles } = settings

    const res = await fetch('/imposteur_5000.json')
    const data = await res.json()
    const pair = data[Math.floor(Math.random() * data.length)]
    const detectiveWord = pair[0]
    const impostorWord = pair[1]

    // Build role list
    const roles = []
    for (let i = 0; i < impostorCount; i++) roles.push('impostor')
    for (let i = 0; i < mrWhiteCount; i++) roles.push('mister-white')
    while (roles.length < playerCount) roles.push('detective')

    const shuffled = shuffleArray(roles)

    const players = shuffled.map((role, i) => ({
      name: `Joueur ${i + 1}`,
      role,
      word:
        role === 'detective'
          ? detectiveWord
          : role === 'impostor'
            ? impostorWord
            : null,
    }))

    setGameState({
      players,
      showRoles,
      detectiveWord,
      impostorWord,
    })
  }, [])

  const restartSimilar = useCallback(async () => {
    const prev = gameState
    if (!prev) return

    const res = await fetch('/imposteur_5000.json')
    const data = await res.json()
    const pair = data[Math.floor(Math.random() * data.length)]
    const detectiveWord = pair[0]
    const impostorWord = pair[1]

    const roles = prev.players.map((p) => p.role)
    const shuffled = shuffleArray(roles)

    const players = shuffled.map((role, i) => ({
      name: `Joueur ${i + 1}`,
      role,
      word:
        role === 'detective'
          ? detectiveWord
          : role === 'impostor'
            ? impostorWord
            : null,
    }))

    setGameState({ ...prev, players, detectiveWord, impostorWord })
  }, [gameState])

  const goHome = useCallback(() => {
    setGameState(null)
  }, [])

  if (!gameState) {
    return <HomePage onStart={startGame} />
  }

  return (
    <GamePage
      gameState={gameState}
      onRestart={restartSimilar}
      onHome={goHome}
    />
  )
}

export default App
