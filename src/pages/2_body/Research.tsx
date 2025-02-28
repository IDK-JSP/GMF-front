import {FC, useEffect, useState} from 'react';
import AsideLeft from '../../components/layout/AsideLeft';
import ContentWithLeftAside from '../../components/layout/ContentWithLeftAside';
import {ResultsList$} from '../../observables/ResultsList$'
import {DisplayObservable$} from "../../observables/DisplayObservable$";
import {RecipeType} from '../../1_types/RecipeType';
import RecipeList from "../../components/commun/RecipeList";
import {IngredientType} from '../../1_types/IngredientType';
import {getIngredients} from '../../api/getIngredients';

const Research: FC<{}> = ({}) => {
    const [recipeCollection, setRecipeCollection] = useState<RecipeType[]>([]);
    const [isList, setIsList] = useState(true); // État local pour refléter l'observable
    const [checkedIngredients, setCheckedIngredients] = useState<IngredientType[]>([]);

    useEffect(() => {
        // S'abonner à l'observable pour écouter les changements
        const subscription = DisplayObservable$.subscribe(setIsList);

        return () => subscription.unsubscribe(); // Nettoyage de l'abonnement
    }, []);

useEffect(() => {
        // s'abonner à l'observable pour écouter les changements
        const subscription = DisplayObservable$.subscribe(setIsList);
    }
    , []);

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
                        <RecipeList recipeCollection={recipeCollection}/>
                    </article>
                </section>
            </ContentWithLeftAside>
        </>
    );
};

export default Research;
