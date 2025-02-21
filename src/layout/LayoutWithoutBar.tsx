import {FC} from 'react';
import {Outlet} from "@mui/icons-material";

const LayoutWithoutBar: FC<{}> = ({}) => {
    return (
        <>
            <Outlet/>
        </>
    );
};

export default LayoutWithoutBar;
