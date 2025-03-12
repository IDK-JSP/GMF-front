import {FC, useContext, useEffect, useState, useTransition} from 'react';
import {RecipeType} from "../../1_types/RecipeType";
import {getRecipe} from "../../api/getRecipe";
import ContentWithoutAside from '../../components/layout/ContentWithoutAside';
import Presentation from '../../components/layout/Presentation';
import {AuthContext} from "../../context/AuthContext";
import RecipeCard from "../../components/commun/RecipeCard";
import "../../styles/recipeDisplay.css";
import "../../styles/dashboard.css";
import {Typography} from "@mui/material";
import {useNavigate} from "react-router";

const Dashboard: FC<{}> = ({}) => {
    const navigate = useNavigate()
    const [recipeCollection, setRecipeCollection] = useState<RecipeType[] | undefined>(undefined)
    const [isPending, startTransition] = useTransition()
    const authContext = useContext(AuthContext);

    const hydrate = () => {
        // @ts-ignore
        startTransition(async () => {
            const results = await getRecipe();
            startTransition(() => {
                setRecipeCollection(results);
            });
        });
    };

    const recipeCollectionCut = recipeCollection?.slice(0, 4)
    console.log(recipeCollectionCut)

    useEffect(() => {
        hydrate();
        console.log("log :", authContext?.isLoggedIn, "token :", authContext?.token)
    }, []);

    return (
        <>
            <Presentation imgUrl={"/test.jpg"}>Dashboard</Presentation>
            <ContentWithoutAside>
                <section>
                    {!isPending && recipeCollectionCut && (
                        <>
                            <article>
                                <div className="article-header">
                                    <Typography variant="h5">Meilleures Notes</Typography>
                                    <Typography sx={{cursor: "pointer"}} onClick={() => navigate("/settings")}>Voir plus</Typography>
                                </div>
                                <div className="recipe-card-grid">
                                    {recipeCollectionCut.map((recipe) => (
                                        <RecipeCard key={recipe.id_recipe} recipe={recipe}/>
                                    ))}
                                </div>
                            </article>
                            <article>
                                <div className="recipe-card-grid">
                                    {recipeCollectionCut.map((recipe) => (
                                        <RecipeCard key={recipe.id_recipe} recipe={recipe}/>
                                    ))}
                                </div>
                            </article>
                            <article>
                                <div className="recipe-card-grid">
                                    {recipeCollectionCut.map((recipe) => (
                                        <RecipeCard key={recipe.id_recipe} recipe={recipe}/>
                                    ))}
                                </div>
                            </article>
                        </>
                    )}
                </section>
            </ContentWithoutAside>
        </>
    );
};

export default Dashboard;

