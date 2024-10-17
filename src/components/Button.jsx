import "../styles/Button.css";

const Button = ({ handleClick }) => {
    return (
        <button className="play-again-button" onClick={handleClick}>
            <p>PLAY AGAIN</p>
        </button>
    )
};

export default Button;