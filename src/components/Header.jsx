import { memo } from "react";
import "../styles/Header.css";

const Header = memo(() => {
    return (
        <header>
            <div className="header-background-wrapper">
                <div className="header-content-wrapper">
                    <h1 className="primary-title">ANIMAL CROSSING</h1>
                    <h1 className="secondary-title">MEMORY GAME</h1>
                </div>
            </div>
        </header>
    )
});

export default Header;