import "../styles/Scoreboard.css";

const Scoreboard = ({ score, best }) => {
    return (
        <div className="scoreboard">
            <div className="score-section">
                <p className="scoreboard-title">SCORE:</p>
                <p className="scoreboard-value">{ score }</p>
            </div>
            <div className="best-score-section">
                <p>BEST:</p>
                <p>{ best }</p>
            </div>
        </div>
    )
};

export default Scoreboard;