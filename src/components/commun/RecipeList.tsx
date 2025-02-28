import {FC, useEffect, useState} from 'react';
import Grid from "@mui/material/Grid2";
import RecipeItem from "./RecipeItem";
import RecipeCard from "./RecipeCard";
import DisplayCardOrItem from "../button/DisplayCardOrItem";
import {RecipeType} from "../../1_types/RecipeType";
import {DisplayObservable$} from "../../observables/DisplayObservable$";

const RecipeList: FC<{ recipeCollection: RecipeType[] }> = ({recipeCollection}) => {

    const [isList, setIsList] = useState(true); // État local pour refléter l'observable

    useEffect(() => {
        // S'abonner à l'observable pour écouter les changements
        const subscription = DisplayObservable$.subscribe(setIsList);

        return () => subscription.unsubscribe(); // Nettoyage de l'abonnement
    }, []);

    return (
        <>
            <DisplayCardOrItem/>
            <Grid container spacing={2} justifyContent="center">
                {recipeCollection.map((recipe) => (
                    isList ?
                        <Grid size={10}>
                            <RecipeItem key={recipe.id_recipe} recipe={recipe}/>
                        </Grid>
                        :
                        <Grid size={2.2}>
                            <RecipeCard key={recipe.id_recipe} recipe={recipe}/>
                        </Grid>
                ))}
            </Grid>
        </>
    );
};

export default RecipeList;
