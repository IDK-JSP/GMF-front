import {FC} from 'react';
import {IconButton} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Pages from "../layout/Pages";

const FavoriteButton: FC<{}> = () => {
    return (
        <>
            <Pages>

          <IconButton aria-label="add to Favorite" title="Ajouter aux favoris"
                        sx={{
                            padding: "0px", color: "red",
                            transition: "transform 0.3s ease-in-out", "&:hover": {transform: "scale(1.2)"}
                        }}>
              blabla
                <FavoriteIcon/>
            </IconButton>

            </Pages>
        </>
    );
};

export default FavoriteButton;
