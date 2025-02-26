import {FC, useEffect, useState} from 'react';
import {Box} from '@mui/material';
import RecipeCard from "../../components/commun/RecipeCard";
import recipes from "../../dataFake/RecipeFake.json";
import {RecipeType} from "../../1_types/RecipeType";
import Pages from "../../components/layout/Pages";
import DisplayCardOrItem from "../../components/button/DisplayCardOrItem";
import RecipeItem from "../../components/commun/RecipeItem";
import {DisplayObservable$} from "../../observables/DisplayObservable$";

const Dashboard: FC<{}> = ({}) => {

    // observable pour l'affichage en liste ou en display
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
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    padding: "10px 25px",
                }}>
                    <DisplayCardOrItem/>
                    {recipeCollection.map((recipe) => (
                        isList ?
                            <RecipeItem key={recipe.id} recipe={recipe}/>
                            :
                            <RecipeCard key={recipe.id} recipe={recipe}/>
                    ))}
                </Box>
            </Pages>

        </>
    );

};

export default Dashboard;
