import {FC, useContext} from 'react';
import {IconButton} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import post from '../../api/post';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import del from "../../api/del";
interface FavoriteButtonProps {
    id: number;
    type : string;
    favorite : string;
}

const handleFavorite = (id: number, type: string, favorite: string) => {
    if (favorite === "true") {
        del("/favorite/delete/recipe/"+id,"Favoris supprimé avec succés");
    }else{
        const data = {
            favoriteable_type: type,
            favoriteable_id: id,
        };
        post("/favorite/new", data, "Favoris ajouté");
    }

};

const FavoriteButton: FC<FavoriteButtonProps> = ({ id, type, favorite }) => {
    const authContext = useContext(AuthContext);
    return (
        <>
        {authContext?.isLoggedIn ? (
          <IconButton aria-label="add to Favorite" title="Ajouter aux favoris"
          onClick={() => handleFavorite(id, type, favorite)}
                        sx={{
                            color: favorite==="true" ? "red" : "white",
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
