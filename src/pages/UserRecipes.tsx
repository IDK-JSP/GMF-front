import {FC, startTransition, useEffect, useState} from 'react';
import Presentation from "../components/layout/Presentation";
import ContentWithoutAside from "../components/layout/ContentWithoutAside";
import DynamicFilter from "../components/common/DynamicFilter";
import RecipeList from "../components/common/RecipeList";
import get from "../api/get";
import {RecipeType} from "../1_types/RecipeType";

const UserRecipes: FC<{}> = ({}) => {
    const [recipeCollection, setRecipeCollection] = useState<RecipeType[] | undefined>(undefined)

    const hydrate = () => {
        // @ts-ignore
        startTransition(async () => {
            const results = await get("/collection/top");
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
                Mes recettes
            </Presentation>

            <ContentWithoutAside>
                <section>
                    <DynamicFilter display={true}/>
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

export default UserRecipes;
