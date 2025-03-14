import {FC, useEffect, useState, useTransition} from 'react';
import {RecipeType} from "../../1_types/RecipeType";
import RecipeCard from "./RecipeCard";
import {Typography} from "@mui/material";
import {useNavigate} from "react-router";
import get from "../../api/get";

const MyComponent: FC<{ path: string, title: string }> = ({path, title}) => {
    let navigate = useNavigate();
    const [recipeCollection, setRecipeCollection] = useState<RecipeType[] | undefined>(undefined)
    const [isPending, startTransition] = useTransition()
    const hydrate = () => {
        // @ts-ignore
        startTransition(async () => {
            const results = await get("/collection" + path);
            startTransition(() => {
                setRecipeCollection(results);
            });
        });

    };
    useEffect(() => {
        hydrate()
    }, []);
    const recipeCollectionCut = recipeCollection?.slice(0, 4)
    console.log(recipeCollectionCut)
    return (
        <article>
            <div className="article-header">
                <Typography variant="h5">{title}</Typography>
                <Typography sx={{cursor: "pointer"}} onClick={() => navigate("/CategoryList/" + path)}>Voir
                    plus</Typography>
            </div>
            <div className="recipe-card-grid">
                {recipeCollectionCut?.map((recipe) => (
                    <RecipeCard key={recipe.id_recipe} recipe={recipe}/>
                ))}
            </div>
        </article>
    );
};

export default MyComponent;
