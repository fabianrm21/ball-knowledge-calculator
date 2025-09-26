export default function GameInstructions(){
    return (
        <section className="game-instructions">
            <h3 className="section-title">How to Play</h3>
            <div className="instructions-grid">
            <div className="instruction-card">
                <div className="instruction-icon">🎯</div>
                <h4>Answer Questions</h4>
                <p>Test your soccer knowledge with multiple choice questions</p>
            </div>
            
            <div className="instruction-card">
                <div className="instruction-icon">⏱️</div>
                <h4>Beat the Clock</h4>
                <p>Answer quickly to earn bonus points and climb the leaderboard</p>
            </div>
            
            <div className="instruction-card">
                <div className="instruction-icon">🏆</div>
                <h4>Win Prizes</h4>
                <p>Compete with other players and earn achievements</p>
            </div>
            </div>
        </section>
    )
}