import SoccerFieldIcon from "./SoccerField";

export default function HeroSection({ onStartPlaying }: { onStartPlaying: () => void }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2 className="hero-title">Test Your Ball Knowledge!</h2>
        <p className="hero-subtitle">
          Challenge yourself with our collection of soccer trivia games and arcade challenges
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={onStartPlaying}>Start Playing</button>
          <button className="btn btn-secondary">View Leaderboard</button>
        </div>
      </div>
      <SoccerFieldIcon/>
    </section>
  )
}

