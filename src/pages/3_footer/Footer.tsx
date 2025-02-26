import {FC} from 'react';
import {Typography} from "@mui/material";

const Footer: FC<{}> = ({}) => {
    return (
        <>
            <Typography sx={{backgroundColor : "salmon"}}>
                Footer du site
            </Typography>
        </>
    );
};

export default Footer;
