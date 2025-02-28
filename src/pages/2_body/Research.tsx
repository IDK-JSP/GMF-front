import {FC, useEffect, useState} from 'react';
import AsideLeft from '../../components/layout/AsideLeft';
import ContentWithLeftAside from '../../components/layout/ContentWithLeftAside';
import {ResultsList$} from '../../observables/ResultsList$'
import {RecipeType} from '../../1_types/RecipeType';
import RecipeList from "../../components/commun/RecipeList";

const Research: FC<{}> = ({}) => {
    const [recipeCollection, setRecipeCollection] = useState<RecipeType[]>([]);

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
