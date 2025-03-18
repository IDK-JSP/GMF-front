import React, { use, useContext, useEffect, useState } from 'react';
import { RecipeType } from '../../1_types/RecipeType';
import { ResultsList$ } from '../../observables/ResultsList$';
import { DynamicFilterContext } from '../../context/DynamicFilterContext';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { toast } from 'react-toastify';
import DisplayCardOrItem from '../button/DisplayCardOrItem';

const DynamicFilter: React.FC<{ matching: boolean,  display: boolean;}> = ({ matching, display }) => {

    const filterContext = useContext(DynamicFilterContext)

    const toggleFilter = (
        event: React.MouseEvent<HTMLElement>,
        newFilter: boolean | null
    ) => {
        if (!filterContext) {
            return;
        }

        if (newFilter !== null) {
            filterContext.setIsMatching(newFilter);
        }
    };
    

    // Abonnement à l'observable pour afficher les résultats
    const [recipeCollection, setRecipeCollection] = useState<RecipeType[]>([]);
    useEffect(() => {
        const subscription = ResultsList$.subscribe(setRecipeCollection);
        return () => subscription.unsubscribe();
    }
    , []);

    return (
        <div>
            {matching ?
            <ToggleButtonGroup
                color="primary"
                value={filterContext?.isMatching}
                exclusive
                onChange={toggleFilter}
                aria-label="display of result"
            >
                <ToggleButton value={true} aria-label="display item">
                    Match
                </ToggleButton>
                <ToggleButton value={false} aria-label="display card">
                    Not Match
                </ToggleButton>
            </ToggleButtonGroup>
            : null}
            {display ?
            <DisplayCardOrItem/>
            : null}
        </div>
    );
};

export default DynamicFilter;