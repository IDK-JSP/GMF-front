import React, { useContext, useEffect, useState } from 'react';
import OpinionRecipe from './OpinionRecipe';
import OpinionMyself from './OpinionMyself';
import OpinionsResume from './OpinionsResume';
import { RecipeOpinionsType } from '../../1_types/RecipeOpinionsType';
import {AuthContext} from "../../context/AuthContext";
interface OpinionsDetailsProps {
    recipeRate: number;
    recipeNbRate: number;
    recipeId: number;
    opinionList: Array<RecipeOpinionsType>;
    isLoading: boolean;
    error: string | null;
}

const OpinionsDetails: React.FC<OpinionsDetailsProps> = ({recipeId, recipeRate, recipeNbRate, opinionList,isLoading,error }) => {

    const [opinions, setOpinions] = useState<Array<RecipeOpinionsType>>(opinionList);
        const authContext = useContext(AuthContext);

    // Observer les changements de opinionList et mettre à jour l'état local
    useEffect(() => {
        setOpinions(opinionList);
    }, [opinionList]);

    return (
        <div className="opinion-box">
            <OpinionRecipe recipeRate={recipeRate} recipeNbRate={recipeNbRate} />

            {/* <div style={{width:"100px", color: authContext?.isLoggedIn ? "green" : "white"}} */}
 
                {authContext?.isLoggedIn && 
                (<OpinionMyself recipeId={recipeId}/>)}

              <OpinionsResume
                opinionsList={opinionList || []}
                recipeRate={recipeRate ?? 0}
                recipeNbRate={recipeNbRate ?? 0}
                isLoading={isLoading}
                error={error}
              />
        </div>
    );
};

export default OpinionsDetails;