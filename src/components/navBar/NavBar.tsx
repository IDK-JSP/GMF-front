import React, {FC, useContext} from 'react';
import '../../styles/nav.css';
import InputSearch from './InputSearch';
import {useNavigate} from 'react-router';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AvatarMenu from "./AvatarMenu";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';

const Nav: FC = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    return (
        <nav>
            <div id='title-container'
                 onClick={() => navigate('/')}
            >
                <img src={"/GMF-logo.png"} alt={"GMF-logo"}/>
                <h1>GMF</h1>
            </div>
            <InputSearch/>
            <div id='nav-container'>
            {authContext?.isLoggedIn ? (
                <div onClick={() => navigate('/Favorite')}>
                    <FavoriteIcon fontSize="large"/>
                </div>
            ) : (
                <div onClick={() => toast.error("Veuillez-vous connecter")}>
                    <FavoriteIcon fontSize="large"/>
                </div>
            )}
                <AvatarMenu/>
            </div>
        </nav>
    );
};
export default Nav;
