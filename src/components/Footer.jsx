import GithubIcon from "./GithubIcon";
import "../styles/Footer.css"

const Footer = () => {
    return (
        <footer>
            <div className="footer-content-wrapper">
                <span className="footer-text">Copyright © 2024 smyler3</span>
                <span className="footer-image-container">
                    <a href="https://github.com/smyler3" target="_blank" rel="noopener noreferrer">
                        <GithubIcon />
                    </a>
                </span>
            </div>
        </footer>
    );
};

export default Footer;