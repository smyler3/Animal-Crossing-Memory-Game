import "../styles/GameArea.css";
import Scoreboard from "./Scoreboard";

const GameArea = () => {
    return (
        <main>
            <p className="game-description">
                Click each Animal Crossing villager card in the grid without selecting the same card more than once.
                <br />
                <br />
                Be careful though, as the cards will shuffle after every click to challenge your memory.
            </p>
            <Scoreboard score={0} best={10} />
            {/* TODO: Add card grid Component */}
        </main>
    )
};

export default GameArea;