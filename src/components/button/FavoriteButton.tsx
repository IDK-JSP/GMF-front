import {FC, useContext} from 'react';
import {IconButton} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import postFavorite from '../../api/postFavorite';
import { AuthContext } from '../../context/AuthContext';


interface FavoriteButtonProps {
    id: number;
    type : string;
}

const handleFavorite = (id: number, type: string) => {
    postFavorite("recipe", id);
    console.log(`Favorite button clicked for id: ${id}`);
};





const FavoriteButton: FC<FavoriteButtonProps> = ({ id }) => {
    const authContext = useContext(AuthContext);
    return (
        <>
        {authContext?.isLoggedIn ? (
          <IconButton aria-label="add to Favorite" title="Ajouter aux favoris"
          onClick={() => handleFavorite(id, "recipe")}
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
