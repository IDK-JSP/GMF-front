import { FC, useContext } from "react";
import withLoadingAndError from "../hoc/WithLoadingAndError";
import OpinionsSkeleton from "../skeleton/OpinionsSkeleton";
import { RecipeOpinionsType } from "../../1_types/RecipeOpinionsType";
import StarRating from "../common/StarRating";
import "../../styles/opinions.css";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

type Props = {
  recipeRate: number;
  recipeNbRate: number;
  opinionsList: Array<RecipeOpinionsType>;
  isLoading: boolean;
  error: string | null;
};

const OpinionsResume: FC<Props> = ({ opinionsList, isLoading, error }) => {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  return withLoadingAndError({
    isLoading,
    error,
    data: opinionsList,
    SkeletonComponent: OpinionsSkeleton,
    children: (data) => (
      <>
        {opinionsList && opinionsList.length > 0 ? (
          opinionsList.map((opinion, index) => (
            <div key={index} className="opinion-item">
              <div className="flex-row">
                <StarRating rate={opinion.rate} size="medium" />
              </div>
              <span>"{opinion.comment}"</span>
              <span>{opinion.email.split("@")[0]}</span>
            </div>
          ))
        ) : (
          <>
          {authContext?.isLoggedIn==false &&
          <div
          className="flex-column"
          style={
            { fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "1rem auto",
             }
          }><p style={{textAlign:"center"}}>Aucune note trouvée.<br/>Soyez le premier à noter cette recette :</p>
          <button
                  className="home-btn"
                  onClick={() => {
                    navigate("/Login");
                  }}
                >
                  <Typography variant="h5">
                    Se connecter
                  </Typography>
                </button></div>}
</>
        )}
      </>
    ),
  });
};

export default OpinionsResume;
