import * as React from 'react';
import {FC} from 'react';
import {Box} from "@mui/material";
import {Helmet} from "react-helmet-async";

const Pages: FC<{ children: any }> = ({children}) => {
    return (
        <Box>
            <Helmet>
                <title>Projet GMF</title>
                <link rel="icon" href="" type="image/x-icon"/>
            </Helmet>
            {children}
        </Box>
    );
};

export default Pages;
