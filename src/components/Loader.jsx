import "../styles/Loader.css";

const Loader = () => {
    return (
        <div className="loading-wrapper">
            <p>Loading Data</p>
            <div className="loader">
                <div className="ball ball-1"></div>
                <div className="ball ball-2"></div>
                <div className="ball ball-3"></div>
            </div>
        </div>
    )
};

export default Loader;