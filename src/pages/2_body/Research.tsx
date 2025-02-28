    import {FC, useEffect, useState} from 'react';
import AsideLeft from '../../components/layout/AsideLeft';
import ContentWithLeftAside from '../../components/layout/ContentWithLeftAside';
import DisplayCardOrItem from '../../components/button/DisplayCardOrItem';
import Grid from '@mui/material/Grid2';
import RecipeItem from '../../components/commun/RecipeItem';
import RecipeCard from '../../components/commun/RecipeCard';
import {ResultsList$} from '../../observables/ResultsList$'
import {DisplayObservable$} from "../../observables/DisplayObservable$";
import { RecipeType } from '../../1_types/RecipeType';

const Research: FC<{}> = ({}) => {
    const [recipeCollection, setRecipeCollection] = useState<RecipeType[]>([]);
    const [isList, setIsList] = useState(true); // État local pour refléter l'observable

    useEffect(() => {
        // S'abonner à l'observable pour écouter les changements
        const subscription = DisplayObservable$.subscribe(setIsList);

        return () => subscription.unsubscribe(); // Nettoyage de l'abonnement
    }, []);

    useEffect(() => {
        // S'abonner à l'observable pour écouter les changements
        const subscription = ResultsList$.subscribe(setRecipeCollection);
        return () => subscription.unsubscribe(); // Nettoyage de l'abonnement
    }, []);
    
    return (
        <>
        <div className='presentation'
        style={{ 
            backgroundImage: `url("/research.jpg")`,  
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
            width: "100%"
            }}>
            <div>Favoris</div>
        </div>
        <AsideLeft>
            Aside
        </AsideLeft>
        <ContentWithLeftAside>
            <section>
                section
                <article>
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
                </article>
            </section>
        </ContentWithLeftAside>
        </>
    );
};

export default Research;
