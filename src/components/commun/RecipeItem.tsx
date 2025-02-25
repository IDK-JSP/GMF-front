import {FC} from 'react';
import {RecipeType} from "../../1_types/RecipeType";

const RecipeItem: FC<{recipe : RecipeType}> = ({recipe}) => {
    return (
        <>
            {recipe.title}
        </>
    );
};

export default RecipeItem;
