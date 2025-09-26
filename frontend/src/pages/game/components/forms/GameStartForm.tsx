export default function GameStartForm(
    { playerName, handleStartGame, setIsSubmitted}:
    {
        playerName: string;
        handleStartGame: () => void;
        setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    })
{
    return (
        <div className="welcome-section">
            <div className="welcome-message">
                <h3>Welcome, {playerName}! 🎉</h3>
                <p>Ready to test your soccer knowledge?</p>
            </div>
            
            <div className="game-options">
                <button 
                onClick={handleStartGame}
                className="btn btn-primary btn-large"
                >
                Start Trivia Game
                </button>
                
                <button 
                onClick={() => setIsSubmitted(false)}
                className="btn btn-secondary"
                >
                Change Name
                </button>
            </div>
        </div>
)
}