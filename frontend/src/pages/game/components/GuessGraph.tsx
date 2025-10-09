import type { Player } from "../game";
import "../game.css";

export default function GuessGraph({ correctGuesses }: { correctGuesses: Player[] }) {
  return (
    <div className="guess-graph-vertical">
      {correctGuesses.map((player, index) => (
        <div key={player.id || index} className="guess-node-vertical">
          <div className="player-container">
            <img
              src={player.photo}
              alt={player.name}
              className="player-photo"
            />
          </div>

          {index < correctGuesses.length - 1 && (
            <svg className="vertical-connector" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="verticalLineGradient" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#93C5FD" />
                  <stop offset="1" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <line
                x1="50"
                y1="0"
                x2="50"
                y2="100"
                stroke="url(#verticalLineGradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
