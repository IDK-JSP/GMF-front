import {FC, useContext} from 'react';
import {IconButton} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import postFavorite from '../../api/postFavorite';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

interface FavoriteButtonProps {
    id: number;
    type : string;
}

const handleFavorite = (id: number, type: string) => {
    const data = {
        favoriteable_type : type,
        favoriteable_id : id,
    };
    postFavorite("/favorite/new", data,"Favoris ajouté");
    console.log(`Favorite button clicked for id: ${id}`);
};

const FavoriteButton: FC<FavoriteButtonProps> = ({ id,type }) => {
    const authContext = useContext(AuthContext);
    return (
        <>
        {authContext?.isLoggedIn ? (
          <IconButton aria-label="add to Favorite" title="Ajouter aux favoris"
          onClick={() => handleFavorite(id, type)}
                        sx={{
                            padding: "0px",
                            transition: "transform 0.3s ease-in-out", "&:hover": {transform: "scale(1.2)"}
                        }}>
                <FavoriteIcon/>
            </IconButton>
        ) : null}
        </>
    );
};

export default FavoriteButton;
