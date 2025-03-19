import {FC, useContext, useEffect, useState, useTransition} from 'react';
import {RecipeType} from "../1_types/RecipeType";
import get from "../api/get";
import ContentWithoutAside from '../components/layout/ContentWithoutAside';
import Presentation from '../components/layout/Presentation';
import {AuthContext} from "../context/AuthContext";
import "../styles/dashboard.css";
import {useNavigate} from "react-router";
import RecipeCarousel from "../components/common/RecipeCarousel";
import RecipeCollection from "../components/common/RecipeCollection";

export const collections = [
    {title: "Les mieux notées", path: "/top"},
    {title: "Les incontournables", path: "/nbRate"},
    {title: "Nos récentes", path: "/recent"},
    {title: "Les végés", path: "/vege"},
    {title: "Les vegan", path: "/vegan"},
    {title: "Nos sources sûres", path: "/validate"}
]
const Dashboard: FC<{}> = ({}) => {
    const navigate = useNavigate()
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

            { recipeCollection && (
                <>
                    <Presentation carousel={<RecipeCarousel recipeCollection={recipeCollection}/>}>
                        Dashboard
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
            )};
        </>)
};

export default Dashboard;

