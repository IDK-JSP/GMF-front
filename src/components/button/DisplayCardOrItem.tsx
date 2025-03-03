import React from 'react';
import {FC, useContext} from 'react';
import {Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import {DisplayContext} from "../../context/DisplayContext";

const DisplayCardOrItem: FC<{}> = ({}) => {

    const displayContext = useContext(DisplayContext)

    const toggleView = (
        event: React.MouseEvent<HTMLElement>,
        newViewMode: boolean | null,
    ) => {
        if (newViewMode !== null)
            displayContext?.setIsItem(newViewMode);
    };

    return (
        <Stack direction="row" justifyContent="center" margin={5}>
            <ToggleButtonGroup
                color="primary"
                value={displayContext?.isItem}
                exclusive
                onChange={toggleView}
                aria-label="display of result"
            >
                <ToggleButton value={true} aria-label="display item">
                    <FormatListBulletedIcon/>
                </ToggleButton>
                <ToggleButton value={false} aria-label="display card">
                    <GridViewIcon/>
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
};

export default DisplayCardOrItem;