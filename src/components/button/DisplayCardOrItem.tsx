import {FC, useEffect, useState} from "react";
import {Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import {DisplayObservable$, setViewMode} from "../../observables/DisplayObservable$";

const DisplayCardOrItem: FC<{}> = ({}) => {

    const [isItem, setIsItem] = useState(true)

    useEffect(() => {
        // S'abonner à l'observable pour écouter les changements
        const subscription = DisplayObservable$.subscribe(setIsItem);

        return () => subscription.unsubscribe(); // Nettoyage de l'abonnement
    }, []);

    const toggleView = () => {
        setViewMode(!isItem); // Màj l'observable
    }

    return (
        <Stack direction="row" justifyContent="center" mt={13} mb={5}>
            <ToggleButtonGroup value={isItem} exclusive onChange={toggleView} aria-label="display of result">
                <ToggleButton value="false" aria-label="display item">
                    <FormatListBulletedIcon/>
                </ToggleButton>
                <ToggleButton value="true" aria-label="display card">
                    <GridViewIcon/>
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
};

export default DisplayCardOrItem;
