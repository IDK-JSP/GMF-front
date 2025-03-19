import {FC, useContext, useState} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import post from '../../api/post';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
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
            del("/favorite/delete/recipe/"+id,"Favori supprimé avec succès")
            .then((response) => {
                if (response === "Favori supprimé avec succès") {
                    setIsFavorite("false");
                    toast.success("DEBUG : OK");
                } else {}
            }
        )  
        }else{
            const data = {
                favoriteable_type: type,
                favoriteable_id: id,
            };
            post("/favorite/new", data, "Favori ajouté")
            .then((response) => {
                if (response === "Favori ajouté") {
                setIsFavorite("true");
                toast.success("DEBUG : OK");
                } else {}
            })};
    };

    return (
        <>
        {authContext?.isLoggedIn ? (
          <div
          onClick={(event) => {
            event.stopPropagation();
            handleFavorite(id, type, isFavorite);
          }}
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
