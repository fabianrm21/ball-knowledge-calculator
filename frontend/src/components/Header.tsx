export default function Header({ isHomePage, onBack }: { isHomePage: boolean; onBack?: () => void}) {

    if (!isHomePage){
        return (
            <header className="header">
                <div className="header-content">
                <div className="logo-section">
                    <div className="soccer-ball">⚽</div>
                    <h1 className="main-title">Ball Knowledge Calculator</h1>
                </div>
                <nav className="main-nav">
                    <button onClick={onBack} className="nav-link back-btn">
                    ← Back to Home
                    </button>
                </nav>
                </div>
            </header>
        )
    }
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="soccer-ball">⚽</div>
          <h1 className="main-title">Ball Knowledge Calculator</h1>
        </div>
        <nav className="main-nav">
          <a href="#home" className="nav-link active">Home</a>
          <a href="#trivia" className="nav-link">Trivia</a>
          <a href="#games" className="nav-link">Games</a>
          <a href="#leaderboard" className="nav-link">Leaderboard</a>
        </nav>
      </div>
    </header>
  )
}
