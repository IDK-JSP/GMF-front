import {FC, useEffect, useState} from 'react';
import Grid from '@mui/material/Grid2';

import RecipeCard from "../../components/commun/RecipeCard";
import recipes from "../../dataFake/RecipeFake.json";
import {RecipeType} from "../../1_types/RecipeType";
import Pages from "../../components/layout/Pages";
import DisplayCardOrItem from "../../components/button/DisplayCardOrItem";
import RecipeItem from "../../components/commun/RecipeItem";
import {DisplayObservable$} from "../../observables/DisplayObservable$";

const Dashboard: FC<{}> = ({}) => {

    const [isList, setIsList] = useState(true); // État local pour refléter l'observable

    useEffect(() => {
        // S'abonner à l'observable pour écouter les changements
        const subscription = DisplayObservable$.subscribe(setIsList);

        return () => subscription.unsubscribe(); // Nettoyage de l'abonnement
    }, []);

    const recipeCollection: RecipeType[] = recipes

    console.log(recipeCollection)

    return (
        <>
            <Pages>
                <DisplayCardOrItem/>
                <Grid container spacing={2} justifyContent="center">
                    {recipeCollection.map((recipe) => (
                        isList ?
                            <Grid size={11}>
                                <RecipeItem key={recipe.id} recipe={recipe}/>
                            </Grid>
                            :
                            <Grid size={2.2}>
                                <RecipeCard key={recipe.id} recipe={recipe}/>
                            </Grid>
                    ))}
                </Grid>
            </Pages>
        </>
    );
};

export default Dashboard;
