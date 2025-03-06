import {FC, useContext, useEffect, useState, useTransition} from 'react';
import {RecipeType} from "../../1_types/RecipeType";
import RecipeList from "../../components/commun/RecipeList";
import {getRecipe} from "../../api/getRecipe";
import ContentWithoutAside from '../../components/layout/ContentWithoutAside';
import Presentation from '../../components/layout/Presentation';
import {AuthContext} from "../../context/AuthContext";

const Dashboard: FC<{}> = ({}) => {
    const [recipeCollection, setRecipeCollection] = useState<RecipeType[] | undefined>(undefined)
    const [isPending, startTransition] = useTransition()
    const authContext = useContext(AuthContext);

    const hydrate = () => {
        // @ts-ignore
        startTransition(async () => {
            const results = await getRecipe();
            startTransition(() => {
                setRecipeCollection(results);
            });
        });
    };


    useEffect(() => {
        hydrate();
        console.log(recipeCollection)
        console.log("log :", authContext?.isLoggedIn, "token :", authContext?.token)
    }, []);

    return (
        <>
            <Presentation imgUrl={"/test.jpg"}>Dashboard</Presentation>
            <ContentWithoutAside>
                <section>
                    <article>
                        {!isPending && recipeCollection && (
                            <RecipeList recipeCollection={recipeCollection}/>
                        )}
                    </article>
                </section>
            </ContentWithoutAside>
        </>
    );
};

export default Dashboard;
