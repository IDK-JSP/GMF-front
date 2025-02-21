import {FC} from 'react';
import NavBar from "../components/header/NavBar";
import {Outlet} from "@mui/icons-material";

const LayoutWithBar: FC<{}> = ({}) => {
    return (
        <>
          <NavBar/>
          <Outlet/>
        </>
    );
};

export default LayoutWithBar;
