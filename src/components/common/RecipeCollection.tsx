import {FC, useEffect, useState, useTransition} from 'react';
import {RecipeType} from "../../1_types/RecipeType";
import {RecipeCard} from "./RecipeCard";
import {Typography} from "@mui/material";
import {useNavigate} from "react-router";
import get from "../../api/get";
import "../../styles/recipeDisplay.css";
import "../../styles/recipeCollection.css"


const RecipeCollection: FC<{ path: string, title: string }> = ({path, title}) => {
    let navigate = useNavigate();
    const [recipeCollection, setRecipeCollection] = useState<RecipeType[] | undefined>(undefined)
    const [isPending, startTransition] = useTransition()
    const [cut, setCut] = useState(Math.floor(window.innerWidth / 265));

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

    useEffect(() => {
        const handleResize = () => {
            setCut(Math.floor(window.innerWidth / 265));
        };
        console.log(cut)

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const recipeCollectionCut = recipeCollection?.slice(0, cut);

    return (
        <article>
            <div className="article-header">
                <Typography variant="h5">{title}</Typography>
                <Typography sx={{cursor: "pointer"}} onClick={() => navigate("/CategoryList" + path)}>
                    Voir plus
                </Typography>
            </div>
            <div className="recipe-collection-container">
                {recipeCollectionCut?.map((recipe) => (
                    <RecipeCard key={recipe.id_recipe} recipe={recipe}/>
                ))}
            </div>
        </article>
    );
};

export default RecipeCollection;
