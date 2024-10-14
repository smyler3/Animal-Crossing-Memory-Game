import "../styles/Button.css";

const Button = ({ onClick }) => {
    return (
        <button className="play-again-button" onClick={onClick}>
            <p>PLAY AGAIN</p>
        </button>
    )
};

export default Button;