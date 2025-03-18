import React, {FC, useContext, useState} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import post from '../../api/post';
import {AuthContext} from '../../context/AuthContext';
import del from "../../api/del";

interface FavoriteButtonProps {
    id: number;
    type: string;
    favorite: string;
    sizeInPixels: number
}

const FavoriteButton: FC<FavoriteButtonProps> = ({id, type, favorite, sizeInPixels}) => {

    const [isFavorite, setIsFavorite] = useState(favorite);
    const authContext = useContext(AuthContext);

    const handleFavorite = (id: number, type: string, favorite: string) => {
        if (favorite === "true") {
            setIsFavorite('false');
            del("/favorite/delete/recipe/" + id, "Favoris supprimé avec succés");
        } else {
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
                    onClick={(e) => {
                        e.stopPropagation(); // Empêche la propagation de l'événement
                        handleFavorite(id, type, isFavorite);
                    }}
                    className={isFavorite === 'true' ? "favorite-btn favorite" : "favorite-btn"}
                    style={{
                        width: sizeInPixels,
                        height: sizeInPixels,
                    }}
                >
                    <FavoriteIcon fontSize="large"/>
                </div>
            ) : null}
        </>
    );
};

export default FavoriteButton;
