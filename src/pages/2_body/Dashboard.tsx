import {FC, useContext, useEffect, useState, useTransition} from 'react';
import {RecipeType} from "../../1_types/RecipeType";
import get from "../../api/get";
import ContentWithoutAside from '../../components/layout/ContentWithoutAside';
import Presentation from '../../components/layout/Presentation';
import {AuthContext} from "../../context/AuthContext";
import "../../styles/recipeDisplay.css";
import "../../styles/dashboard.css";
import {useNavigate} from "react-router";
import RecipeCarousel from "../../components/commun/RecipeCarousel";
import RecipeCollection from "../../components/commun/RecipeCollection";

const collections = [
    {title: "Les mieux notées", path: "/top"},
    {title: "Les incontournables", path: "/nbRate"},
    {title: "Nos recentes", path: "/recent"},
    {title: "Les veges", path: "/vege"},
    {title: "Les vegan", path: "/vegan"},
    {title: "Nos sources sur", path: "/validate"}
]
const Dashboard: FC<{}> = ({}) => {
    const navigate = useNavigate()
    const [recipeCollection, setRecipeCollection] = useState<RecipeType[] | undefined>(undefined)
    const [isPending, startTransition] = useTransition()
    const authContext = useContext(AuthContext);

    const hydrate = () => {
        // @ts-ignore
        startTransition(async () => {
            const results = await get("/collection/top");
            startTransition(() => {
                setRecipeCollection(results);
            });
        });
    };

    const recipeCollectionCut = recipeCollection?.slice(0, 9)
    console.log(recipeCollectionCut)

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
        hydrate();
        console.log("log :", authContext?.isLoggedIn, "token :", authContext?.token, "local", localStorage.getItem("token"))
    }, []);

    return (
        <>
            {!isPending && recipeCollectionCut && (
                <>
                    <Presentation carousel={<RecipeCarousel recipeCollection={recipeCollectionCut}/>}>
                        Dashboard
                    </Presentation>

                    <ContentWithoutAside>
                        <section>
                            {recipeCollection ?
                                collections.map((collection) => (

                                    <RecipeCollection path={collection.path}
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

