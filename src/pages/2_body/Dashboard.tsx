import {FC, useEffect, useState, useTransition} from 'react';
import {RecipeType} from "../../1_types/RecipeType";
import Pages from "../../components/layout/Pages";
import RecipeList from "../../components/commun/RecipeList";
import {getRecipe} from "../../api/getRecipe";
import ContentWithoutAside from '../../components/layout/ContentWithLeftAside';
import Presentation from '../../components/layout/Presentation';

const Dashboard: FC<{}> = ({}) => {
    const [recipeCollection, setRecipeCollection] = useState<RecipeType[] | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const hydrate = () => {
        // @ts-ignore
        startTransition(async () => {
            const results = await getRecipe()
            startTransition(() => {
                setRecipeCollection(results)
            })
        });
    }

    useEffect(() => {
        hydrate();
    }, []);

    console.log(recipeCollection)

    return (
        <>
            <Presentation>
                Dashboard
            </Presentation>
            <ContentWithoutAside>
                <section>
                    <article>
                        {!isPending && recipeCollection &&
                        <RecipeList recipeCollection={recipeCollection}/>
                        }
                    </article>
                </section>
            </ContentWithoutAside>
            
        </>
    );
};

export default Dashboard;
