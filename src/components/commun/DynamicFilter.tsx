import React, { use, useContext, useEffect, useState } from 'react';
import { RecipeType } from '../../1_types/RecipeType';
import { ResultsList$ } from '../../observables/ResultsList$';
import { DynamicFilterContext } from '../../context/DynamicFilterContext';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';

const DynamicFilter: React.FC = () => {

    const filterContext = useContext(DynamicFilterContext)

    const toggleFilter = (
        event: React.MouseEvent<HTMLElement>,
        newFilter: boolean | null,
    ) => {
        if (newFilter !== null)
            filterContext?.setIsMatching(newFilter);
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
        </div>
    );
};

export default DynamicFilter;