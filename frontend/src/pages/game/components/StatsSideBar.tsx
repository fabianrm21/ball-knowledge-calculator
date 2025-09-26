export default function StatsSideBar({ playerName }: { playerName: string }){
    return (
    <aside className="sidebar">
        <div className="sidebar-content">
            <h4>Game Stats</h4>
            <div className="game-stats">
            <div className="stat-item">
                <span className="stat-label">Player:</span>
                <span className="stat-value">{playerName || 'Not set'}</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Games Played:</span>
                <span className="stat-value">0</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Best Score:</span>
                <span className="stat-value">0</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Rank:</span>
                <span className="stat-value">#-</span>
            </div>
            </div>
        </div>
    </aside>)
}