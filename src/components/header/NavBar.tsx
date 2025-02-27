import React from 'react';
import '../../styles/nav.css';
import InputSearch from './searchBar/InputSearch';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useNavigate } from 'react-router';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Nav: React.FC = () => {
    const navigate=useNavigate();


    return (
        <nav>
            <div id='title-container'
            onClick= {()=>navigate('/')}
            >
                <HomeOutlinedIcon style={{fontSize:"50px"}}/>
                <h1>Recettes</h1>
            </div>
            <InputSearch/>
            <div id='nav-container'>
                <div style={{width:"100px"}}
            onClick= {()=>navigate('/Favorite')}><FavoriteIcon/></div>
                <div style={{width:"100px"}}
            onClick= {()=>navigate('/Settings')}><PersonIcon/></div>
            </div>
        </nav>
    );
};
export default Nav;