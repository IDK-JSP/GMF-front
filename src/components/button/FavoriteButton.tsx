import {FC, useContext} from 'react';
import {IconButton} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import post from '../../api/post';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import del from "../../api/del";
import React from 'react';
interface FavoriteButtonProps {
    id: number;
    type : string;
    favorite : string;
    sizeInPixels : number
}



const FavoriteButton: FC<FavoriteButtonProps> = ({ id, type, favorite, sizeInPixels}) => {

    const [isFavorite, setIsFavorite] = React.useState(favorite);
    const authContext = useContext(AuthContext);


    const handleFavorite = (id: number, type: string, favorite: string) => {
        if (favorite === "true") {
            setIsFavorite('false');
            del("/favorite/delete/recipe/"+id,"Favoris supprimé avec succés");
        }else{
            const data = {
                favoriteable_type: type,
                favoriteable_id: id,
            };
            post("/favorite/new", data, "Favoris ajouté");
            setIsFavorite('true');
        }
    
    };

    
    return (
        <>
        {authContext?.isLoggedIn ? (
          <div
          onClick={() => handleFavorite(id, type, isFavorite)}
          className={isFavorite === 'true' ? "favorite-btn favorite" : "favorite-btn"}
          style={{
            width: sizeInPixels,
            height: sizeInPixels,
          }}
          >
            <FavoriteIcon fontSize="large" />
          </div>
        ) : null}
        </>
    );
};

export default FavoriteButton;
