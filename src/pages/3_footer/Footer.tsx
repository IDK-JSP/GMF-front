import {FC} from 'react';
import {Typography} from "@mui/material";

const Footer: FC<{}> = ({}) => {
    return (
        <>
            <Typography sx={{backgroundColor : "salmon"}}>
                blablabla<br/>
                bliblibli<br/>
                blublublu
            </Typography>
        </>
    );
};

export default Footer;
