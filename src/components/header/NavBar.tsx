import React from 'react';
import '../../styles/nav.css';
import InputSearch from './searchBar/InputSearch';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import {useNavigate} from 'react-router';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AvatarMenu from "./AvatarMenu";

const Nav: React.FC = () => {
    const navigate = useNavigate();

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
                <div style={{width: "100px"}}
                     onClick={() => navigate('/Favorite')}><FavoriteIcon/></div>
                <AvatarMenu/>
            </div>
        </nav>
    );
};
export default Nav;