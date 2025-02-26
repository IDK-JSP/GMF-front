import * as React from 'react';
import {FC} from 'react';
import {Box} from "@mui/material";

const Pages: FC<{ children: any }> = ({children}) => {
    return (
        <Box>
            <title>Projet GMF</title>
            <link rel="icon" href="" type="image/x-icon"/>
            {children}
        </Box>
    );
};

export default Pages;
