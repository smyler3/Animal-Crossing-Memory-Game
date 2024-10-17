import "../styles/Scoreboard.css";

const Scoreboard = ({ score=null, best=null }) => {
    return (
        <div className="scoreboard">
            {score !== null &&
                <div className="score-section primary-score">
                    <p>SCORE:</p>
                    <p className="scoreboard-value">{ score }</p>
                </div>
            }
            {best !== null && 
                <div className={`best-score-section ${score === null ? 'primary-score' : 'secondary-score'}`}>
                    <p>BEST:</p>
                    <p className="scoreboard-value">{ best }</p>
                </div>
            }
        </div>
    )
};

export default Scoreboard;