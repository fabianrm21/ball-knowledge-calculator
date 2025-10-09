import type { Player, PlayerGuessSelection } from "../../game";

export default function NameCheckForm(
    { guess, setGuess, feedback, playerSelections, player1, setPlayer1, setCorrrectGuesses}:
    { 
        guess: string;
        setGuess: React.Dispatch<React.SetStateAction<string>>;
        feedback: string;
        playerSelections: PlayerGuessSelection[];
        player1: Player | null;
        setPlayer1: React.Dispatch<React.SetStateAction<Player | null>>;
        setCorrrectGuesses: React.Dispatch<React.SetStateAction<Player[]>>;
    })
{
    const handleSelectPlayer = async (player2: Player) => {
        const body = {player1ID: player1?.id, player2ID: player2.id}
        try{
            const response = await fetch(`http://localhost:8000/validate-players/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer token`,
                },
                body: JSON.stringify(body)
            })

            const data = await response.json()
            if (!response.ok){
                throw new Error(data.error)
            }

            if (data.is_match){
                alert("players are a match")
                setCorrrectGuesses((prev) => [...prev, player2])
                setPlayer1(player2)
            } else{
                alert("players are not a match")
            }
        } catch(error){
            alert(error)
        }
    }
    return (
        <section className="trivia-section" style={{display: "flex", flexDirection: "column", justifyContent: "flex-start",}}>
            <h2>Footballer Name Check</h2>
            <p>Enter the name of a footballer:</p>
            <form>
                <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="e.g. Messi"
                required
                />
            </form>
            {playerSelections.map((p) => (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }} key={p.player.id}>
                    <img 
                        src={p.player.photo} 
                        alt={p.player.name} 
                        style={{height: 50, width: 50}}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <p>{p.player.name}</p>
                    <button onClick={() => {handleSelectPlayer(p.player)}}>Select</button>
                </div>
            ))}
            {feedback && <p className="feedback">{feedback}</p>}
        </section>
    )
}