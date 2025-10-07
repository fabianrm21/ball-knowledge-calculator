import { useEffect, useState } from 'react'
import '../../App.css'
import Header from '../../common/components/Header'
import SoccerFieldIcon from '../../common/components/SoccerField'
import Footer from '../../common/components/Footer'
import StatsSideBar from './components/StatsSideBar'
import GameInstructions from './components/GameInstructions'
import NameCheckForm from './components/forms/NameCheckForm'
import GameStartForm from './components/forms/GameStartForm'
import PlayerNicknameForm from './components/forms/PlayerNicknameForm'
import { useDebounce } from "use-debounce";
import GuessGraph from './components/GuessGraph'


interface GameProps {
  onBack: () => void
}

export type Player = {
  id: number; 
  name: string;
  photo: string;
}

export type PlayerGuessSelection = {
  player: Player;
}

const DEBOUNCE_RATE = 500

function Game({ onBack }: GameProps) {
  const [playerName, setPlayerName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [guess, setGuess] = useState("")
  const [feedback, setFeedback] = useState("")
  const [correctGuesses, setCorrectGuesses] = useState<Player[]>([])
  const [playerSelections, setPlayerSelections] = useState<PlayerGuessSelection[]>([])

  const [player1, setPlayer1] = useState<Player | null>(null)

  const selectRandomPlayer = async () => {
    try{
      const response = await fetch(`http://localhost:8000/random-player/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer token`,
        }
      })

      const data = await response.json()
      if (!response.ok){
        throw new Error(data.error)
      }

      setPlayer1(data.player)
    } catch(error){
      alert(error)
    }
  }

  useEffect(() => {
    if (gameStarted && correctGuesses.length === 0){
      console.log("selecting random player")
      selectRandomPlayer()
    }
  }, [gameStarted])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (playerName.trim()) {
      setIsSubmitted(true)
      // Here you can add logic to start the game with the player name
      console.log('Player name:', playerName)
    }
  }

  const handleStartGame = () => {
    // This will be where the actual game logic starts
    console.log('Starting game for player:', playerName)
    setGameStarted(true)
    setFeedback("")
    setGuess("")
  }

  const fetchSearchResults = async (player: string) => {
    try{
      const response = await fetch(`http://localhost:8000/search-player/${player}/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer token`,
        }
      })

      const data = await response.json()
      if (!response.ok){
        throw new Error(data.error)
      }
      setPlayerSelections(data)
    } catch(error){
      alert(error)
    }
  }

  const [debouncedQuery] = useDebounce(guess, DEBOUNCE_RATE);
  useEffect(() => {
    if (debouncedQuery){
      fetchSearchResults(debouncedQuery)
    }
  }, [debouncedQuery]);



  // const handleGuessSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   // if (validFootballers.some(f => f.toLowerCase() === guess.trim().toLowerCase())) {
  //   //   setFeedback(`✅ Correct! ${guess} is a footballer.`)
  //   //   setCorrectGuesses((prev) => [...prev, guess])
  //   // } else {
  //   //   setFeedback(`❌ Nope, "${guess}" isn't in the list.`)
  //   // }
  //   // setGuess("")

  //   try{
  //     const body = {player1: guess, player2: guess}
  //     const response = await fetch(`http://localhost:8000/validate-players/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(body),
  //     })

  //     const data = await response.json()
  //     if (!response.ok){
  //       throw new Error(data.error)
  //     }

  //     alert(data.message)
  //   } catch(error){
  //     alert(error)
  //   }
  // }


  return (
    <div className="app">
      <Header isHomePage={false} onBack={onBack}/>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          <div className="left-content">
            {/* Game Setup Section */}
            <section className="game-setup">
              <div className="game-setup-content">
                <h2 className="game-title">Welcome to Ball Knowledge Calculator!</h2>
                <p className="game-subtitle">
                  Enter your name to start your soccer knowledge journey
                </p>
                
                {!gameStarted ? (
                  <section className='game-setup'>
                    {!isSubmitted ? (
                      <PlayerNicknameForm
                      handleSubmit={handleSubmit}
                      playerName={playerName}
                      setPlayerName={setPlayerName}
                      />
                    ) : (
                      <GameStartForm
                      playerName={playerName}
                      handleStartGame={handleStartGame}
                      setIsSubmitted={setIsSubmitted}
                      />
                    )}
                  </section>
                ) : (
                  <NameCheckForm
                  guess={guess}
                  setGuess={setGuess}
                  feedback={feedback}
                  playerSelections={playerSelections}
                  player1={player1}
                  setPlayer1={setPlayer1}
                  setCorrrectGuesses={setCorrectGuesses}
                  />
                )}
                
              </div>
              
              <div>
                <SoccerFieldIcon/>
                <p>Correct guesses:</p>
                {/* {correctGuesses.map((p) => (
                  <p>{p.name}</p>
                ))} */}
                <GuessGraph correctGuesses={correctGuesses}/>
              </div>
              
            </section>
            <GameInstructions/>
          </div>
          <StatsSideBar playerName={playerName}/>
        </div>
      </main>

      <Footer/>
    </div>
  )
}

export default Game
