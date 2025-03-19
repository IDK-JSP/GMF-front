import {FC, useContext, useEffect, useState, useTransition} from 'react';
import {RecipeType} from "../1_types/RecipeType";
import get from "../api/get";
import ContentWithoutAside from '../components/layout/ContentWithoutAside';
import Presentation from '../components/layout/Presentation';
import {AuthContext} from "../context/AuthContext";
import "../styles/dashboard.css";
import RecipeCarousel from "../components/common/RecipeCarousel";
import RecipeCollection from "../components/common/RecipeCollection";
import {collections} from "../1_types/CollectionsNames";

const Home: FC<{}> = ({}) => {
    const [recipeCollection, setRecipeCollection] = useState<RecipeType[] | undefined>(undefined)
    const [isPending, startTransition] = useTransition()
    const authContext = useContext(AuthContext);

    const hydrate = () => {
        startTransition(async () => {
            try {
                const results = await get("/collection/top");
                setRecipeCollection(results);
            } catch (error) {
                console.error("Erreur lors du chargement des recettes :", error);
            }
        });
    };

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
        hydrate();
    }, []);

    return (
        <>
            {!isPending && recipeCollection && (
                <>
                    <Presentation carousel={<RecipeCarousel recipeCollection={recipeCollection}/>}>
                        Home
                    </Presentation>
                    <ContentWithoutAside>
                        <section>
                            {recipeCollection ?
                                collections.map((collection) => (
                                    <RecipeCollection key={collection.path}
                                                      path={collection.path}
                                                      title={collection.title}/>
                                ))
                                :
                                <></>
                            }
                        </section>
                    </ContentWithoutAside>
                </>
            )}
        </>)
};

export default Home;

