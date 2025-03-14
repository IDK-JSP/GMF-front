import React, { useContext, useEffect, useState } from 'react';
import OpinionRecipe from './OpinionRecipe';
import OpinionMyself from './OpinionMyself';
import OpinionsResume from './OpinionsResume';
import { RecipeOpinionsType } from '../../1_types/RecipeOpinionsType';
import {AuthContext} from "../../context/AuthContext";
import { getEmailFromToken } from '../auth/getEmailFromToken';

interface OpinionsDetailsProps {
    recipeRate: number;
    recipeNbRate: number;
    recipeId: number;
    opinionList: Array<RecipeOpinionsType>;
    isLoading: boolean;
    error: string | null;
}

const OpinionsDetails: React.FC<OpinionsDetailsProps> = ({recipeId, recipeRate, recipeNbRate, opinionList,isLoading,error }) => {

    // Récuperation du mail depuis le token du localStorage
    const authContext = useContext(AuthContext);
    const token = authContext?.token;
    
    const email = getEmailFromToken(token);

    const [opinions, setOpinions] = useState<Array<RecipeOpinionsType>>(opinionList);
    
    // Observer les changements de opinionList et mettre à jour l'état local
    useEffect(() => {
        setOpinions(opinionList);
    }, [opinionList]);

    return (
        <div className="opinion-box">

            {/* TODO : Ne pas afficher le formulaire si l'utilisateur à déjà donné son avis */}
                {authContext?.isLoggedIn && opinions.filter(opinion => opinion.email === email).length === 0 &&
                (<OpinionMyself recipeId={recipeId} setOpinions={setOpinions}/>)}

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