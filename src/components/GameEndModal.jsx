import "../styles/GameEndModal.css";
import Button from "./Button";
import Scoreboard from "./Scoreboard";

const GameEndModal = ({ score, best }) => {
    return (
        <div className="modal-wrapper">
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-header-background">
                        <p className="modal-result-message">{score === 12 ? "YOU WIN" : "GAME OVER"}</p>
                    </div>
                </div>
                <div className="modal-content">
                    <div className="modal-scores">
                        <Scoreboard score={score} />
                        <Scoreboard best={best} />
                    </div>
                    <Button onClick={null} />
                </div>
                <div className="modal-footer">
                    <div className="modal-footer-background"></div>
                </div>
            </div>
        </div>
    )
};

export default GameEndModal;