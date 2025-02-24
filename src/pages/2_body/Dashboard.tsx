import {FC, useState} from 'react';
import {Box} from '@mui/material';
import RecipeCard from "../../components/commun/RecipeCard";
import recipes from "../../dataFake/RecipeFake.json";
import {RecipeType} from "../../1_types/RecipeType";
import Pages from "../../components/layout/Pages";
import DisplayCardOrItem from "../../components/button/DisplayCardOrItem";
import RecipeItem from "../../components/commun/RecipeItem";

const Dashboard: FC<{}> = ({}) => {

    const [isCard, setIsCard] = useState(true)

    const recipeCollection: RecipeType[] = recipes

    console.log(recipeCollection)

    return (
        <>
            <Pages>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    padding: "10px 25px",
                }}>
                    <DisplayCardOrItem isCard={isCard} setIsCard={setIsCard}/>
                    {recipeCollection.map((recipe) => (
                        isCard ?
                            <RecipeCard key={recipe.id} recipe={recipe}/>
                            :
                            <RecipeItem key={recipe.id} recipe={recipe}/>
                    ))}
                </Box>
            </Pages>

        </>
    );

};

export default Dashboard;
