import React, {FC, useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import "../../styles/avatarMenu.css";
import {AuthContext} from "../../context/AuthContext";

const avatarMenu = [
    {name: "Paramètres", navigation: "../Setting"},
    {name: "Mes Recettes", navigation: "../UserRecipes"},
];

const NavBarAvatar: FC = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseMenu = (link?: string) => {
        setIsOpen(false);
        if (link) navigate(link);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="navbar-avatar" ref={menuRef}>
            <button className="avatar-button" onClick={toggleMenu}>
                <PersonIcon className="avatar-icon"/>
            </button>
            <div className={`avatar-menu ${isOpen ? "open" : "closed"}`}>
                {!authContext?.isLoggedIn ? (
                    <button className="menu-item" onClick={() => handleCloseMenu("/Login")}>
                        Connexion
                    </button>
                ) : (
                    <>
                        {avatarMenu.map((link) => (
                            <button key={link.name} className="menu-item"
                                    onClick={() => handleCloseMenu(link.navigation)}>
                                {link.name}
                            </button>
                        ))}
                        <div className="menu-divider"></div>
                        <button className="menu-item" onClick={() => {
                            handleCloseMenu();
                            authContext?.setIsLoggedIn(false);
                        }}>
                            Déconnexion
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBarAvatar;
