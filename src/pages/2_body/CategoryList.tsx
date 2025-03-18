import {FC, startTransition, useEffect, useState} from 'react';
import ContentWithoutAside from "../../components/layout/ContentWithoutAside";
import Presentation from "../../components/layout/Presentation";
import get from "../../api/get";
import {RecipeType} from "../../1_types/RecipeType";
import {useLocation} from "react-router-dom";
import RecipeList from "../../components/commun/RecipeList";
import DynamicFilter from '../../components/commun/DynamicFilter';
import {collections} from "./Dashboard";


const CategoryList: FC<{}> = ({}) => {
    const [recipeCollection, setRecipeCollection] = useState<RecipeType[] | undefined>(undefined)
    const location = useLocation();
    const title = collections.find((collection) => collection.path.split('/').pop() === location.pathname.split('/').pop())?.title;
    console.log("location" , location);
    console.log("title" , title);
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
            {title}
            </Presentation>
            
            <ContentWithoutAside>
                <section>
                <DynamicFilter display={true} />
                    <article>
                    {recipeCollection ?
                        <RecipeList recipeCollection={recipeCollection}/>
                        :
                        <></>
                    }
                    </article>
                </section>
            </ContentWithoutAside>
        </>
    );
};

export default CategoryList;
