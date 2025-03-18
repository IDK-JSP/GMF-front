import React, { useContext } from 'react';
import '../../styles/nav.css';
import InputSearch from './InputSearch';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import {useNavigate} from 'react-router';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AvatarMenu from "./AvatarMenu";
import { AuthContext } from "../../context/AuthContext"; // Chemin à adapter
import { toast } from 'react-toastify';

const Nav: React.FC = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    return (
        <nav>
            <div id='title-container'
                 onClick={() => navigate('/')}
            >
                <HomeOutlinedIcon style={{fontSize: "50px"}}/>
                <h1>Recettes</h1>
            </div>
            <InputSearch/>
            <div id='nav-container'>
            {authContext?.isLoggedIn ? (
                <div style={{width: "100px"}}
                     onClick={() => navigate('/Favorite')}><FavoriteIcon/></div>
            ) : (
                <div style={{width: "100px"}}
                     onClick={() => toast.error("Veuillez-vous connecter")}><FavoriteIcon/></div>
            )}
                <AvatarMenu/>
            </div>
        </nav>
    );
};
export default Nav;
