import {FC} from 'react';
import recipes from "../../dataFake/RecipeFake.json";
import {RecipeType} from "../../1_types/RecipeType";
import Pages from "../../components/layout/Pages";
import RecipeList from "../../components/commun/RecipeList";

const Dashboard: FC<{}> = ({}) => {

    const recipeCollection: RecipeType[] = recipes

    console.log(recipeCollection)

    return (
        <>
            <Pages>
                <RecipeList recipeCollection={recipeCollection}/>
            </Pages>
        </>
    );
};

export default Dashboard;
