import React, {FC} from "react";
import "../../styles/footer.css";

const Footer: FC = () => {
    return (
        <footer className="footer">
            <p>© 2025 Projet GMF – Site réalisé dans le cadre d'une formation.</p>
            <p>
                <a href="/mentions-legales"> Mentions légales </a>
                |
                <a href="/contact"> Contact </a>
                |
                <a href="https://github.com/IDK-JSP/GMF-front" target="_blank"> Code source </a>
            </p>
            <p>
                Hébergé par <a href="https://www.monhébergeur.com" target="_blank">MonHébergeur.com</a>
            </p>

            <div className="social-icons">
                <a href="https://facebook.com" target="_blank">
                    <div className="fab fa-facebook"></div>
                </a>
                <a href="https://instagram.com" target="_blank">
                    <div className="fab fa-instagram"></div>
                </a>
                <a href="https://twitter.com" target="_blank">
                    <div className="fab fa-twitter"></div>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
