export default function GameCategories() {
  return (
    <section className="game-categories">
      <h3 className="section-title">Choose Your Challenge</h3>
      <div className="categories-grid">
        <div className="category-card">
          <div className="category-icon">🧠</div>
          <h4>Trivia Master</h4>
          <p>Test your soccer knowledge with challenging questions</p>
          <div className="difficulty-badges">
            <span className="badge easy">Easy</span>
            <span className="badge medium">Medium</span>
            <span className="badge hard">Hard</span>
          </div>
        </div>
        
        <div className="category-card">
          <div className="category-icon">🥅</div>
          <h4>Penalty Shootout</h4>
          <p>Score goals in this exciting penalty challenge</p>
          <div className="difficulty-badges">
            <span className="badge easy">Easy</span>
            <span className="badge medium">Medium</span>
            <span className="badge hard">Hard</span>
          </div>
        </div>
        
        <div className="category-card">
          <div className="category-icon">🎯</div>
          <h4>Memory Match</h4>
          <p>Match soccer players, teams, and facts</p>
          <div className="difficulty-badges">
            <span className="badge easy">Easy</span>
            <span className="badge medium">Medium</span>
            <span className="badge hard">Hard</span>
          </div>
        </div>
        
        <div className="category-card">
          <div className="category-icon">📊</div>
          <h4>Quick Quiz</h4>
          <p>Fast-paced questions to test your reflexes</p>
          <div className="difficulty-badges">
            <span className="badge easy">Easy</span>
            <span className="badge medium">Medium</span>
            <span className="badge hard">Hard</span>
          </div>
        </div>
      </div>
    </section>
  )
}
