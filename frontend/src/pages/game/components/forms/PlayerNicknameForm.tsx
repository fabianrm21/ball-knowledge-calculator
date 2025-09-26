export default function PlayerNicknameForm(
    { handleSubmit, playerName, setPlayerName}: 
    {
        handleSubmit: (e: React.FormEvent) => void;
        playerName: string;
        setPlayerName: React.Dispatch<React.SetStateAction<string>>;
    })
{
    return (
        <form onSubmit={handleSubmit} className="player-form">
            <div className="input-group">
                <label htmlFor="playerName" className="input-label">
                Enter Player Name
                </label>
                <input
                type="text"
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your nickname..."
                className="player-input"
                required
                maxLength={20}
                />
                <div className="input-hint">
                Choose a name that will appear on the leaderboard
                </div>
            </div>
            
            <button 
                type="submit" 
                className="btn btn-primary btn-large"
                disabled={!playerName.trim()}
            >
                Cotinue to Game
            </button>
        </form>
    )
}