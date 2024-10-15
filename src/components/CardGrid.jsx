import "../styles/CardGrid.css";

const CardGrid = ({ children }) => {
    return (
        <div className="card-grid">
            {children}
        </div>
    )
};

export default CardGrid