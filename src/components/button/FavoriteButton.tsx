import { FC, useContext, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import post from "../../api/post";
import { AuthContext } from "../../context/AuthContext";
import del from "../../api/del";

interface FavoriteButtonProps {
  id: number;
  type: string;
  sizeInPixels: number;
  recipe?: any;
  setRecipeData?: any;
  setRecipes?: any;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
  id,
  type,
  sizeInPixels,
  recipe,
  setRecipeData,
  setRecipes,
}) => {
  const [isFavorite, setIsFavorite] = useState(recipe?.favorite);
  const authContext = useContext(AuthContext);

  const handleFavorite = (id: number, type: string, favorite: string) => {
    if (favorite === "true") {
      del("/favorite/delete/recipe/" + id, "Favori supprimé avec succès").then(
        (response) => {
          if (response === "Favori supprimé avec succès.") {
            setIsFavorite("false");
            if (setRecipeData) {
              setRecipeData({ ...recipe, favorite: "false" });
            }
            if (setRecipes) {
              setRecipes((prev: any) => {
                return prev.filter((recipe: any) => recipe.id_recipe !== id);
              });
            }
          } else {
          }
        }
      );
    } else {
      const data = {
        favoriteable_type: type,
        favoriteable_id: id,
      };
      post("/favorite/new", data, "Favori ajouté").then((response) => {
        if (typeof response === "object") {
          setIsFavorite("true");
          if (setRecipeData) {
            setRecipeData({ ...recipe, favorite: "true" });
          }
          if(setRecipes) {
            setRecipes((prev: any) => {
              return prev.map((recipe: any) => {
                if (recipe.id_recipe === id) {
                  return { ...recipe, favorite: "true" };
                } else {
                  return recipe;
                }
              });
            });
          }
        } else {
        }
      });
    }
  };

  return (
    <>
      {authContext?.isLoggedIn ? (
        <div
          title="Ajouter à mes recettes favorites"
          onClick={(event) => {
            event.stopPropagation();
            handleFavorite(id, type, isFavorite);
          }}
          className={
            isFavorite === "true" ? "favorite-btn favorite" : "favorite-btn"
          }
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
