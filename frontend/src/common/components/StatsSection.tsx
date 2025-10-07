export default function StatsSection() {
  return (
    <section className="stats-section">
      <h3 className="section-title">Your Progress</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">0</div>
          <div className="stat-label">Games Played</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">0</div>
          <div className="stat-label">Correct Answers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">0%</div>
          <div className="stat-label">Accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">#-</div>
          <div className="stat-label">Rank</div>
        </div>
      </div>
    </section>
  )
}
