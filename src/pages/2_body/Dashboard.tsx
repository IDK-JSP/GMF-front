import {FC} from 'react';
import {Pages} from "@mui/icons-material";
import {Box} from '@mui/material';
import RecipeCard from "../../components/commun/RecipeCard";
import recipes from "../../dataFake/RecipeFake.json";
import {RecipeType} from "../../1_types/RecipeType";

const Dashboard: FC<{}> = ({}) => {

    const recipeCollection :RecipeType[] = recipes

    console.log(recipeCollection)

    return (
        <>
            <Pages>
                blabla
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    padding: "10px 15px",
                }}>
                    {recipeCollection.map((recipe) => (
                        <RecipeCard recipe={recipe}/>
                    ))}
                </Box>
            </Pages>

        </>
    );

};

export default Dashboard;
