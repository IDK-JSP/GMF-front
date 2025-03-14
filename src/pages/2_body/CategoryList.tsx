import {FC, startTransition, useEffect, useState} from 'react';
import ContentWithoutAside from "../../components/layout/ContentWithoutAside";
import RecipeCarousel from "../../components/RecipeCarousel";
import Presentation from "../../components/layout/Presentation";
import RecipeCard from "../../components/commun/RecipeCard";
import get from "../../api/get";
import {RecipeType} from "../../1_types/RecipeType";
import {useLocation} from "react-router-dom";
import RecipeCollection from "../../components/commun/RecipeCollection";
import RecipeList from "../../components/commun/RecipeList";

const CategoryList: FC<{}> = ({}) => {
    const [recipeCollection, setRecipeCollection] = useState<RecipeType[] | undefined>(undefined)
    const location = useLocation();
    const pathEnd = location.pathname.split('/').pop();  // Récupère la dernière partie de l'URL
    const hydrate = () => {
        // @ts-ignore
        startTransition(async () => {
            const results = await get("/collection/" + pathEnd);
            startTransition(() => {
                setRecipeCollection(results);
            });
        });
    };
    useEffect(() => {
        hydrate()
    }, []);
    return (
        <>
            <Presentation>
                Les meilleurs du moments
            </Presentation>
            <ContentWithoutAside>
                <section>
                    {recipeCollection ?
                        <RecipeList recipeCollection={recipeCollection}/>
                        :
                        <></>
                    }
                </section>
            </ContentWithoutAside>
        </>
    );
};

export default CategoryList;
