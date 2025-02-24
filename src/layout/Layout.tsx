import {FC} from 'react';
import NavBar from "../components/header/NavBar";
import {Outlet} from "@mui/icons-material";
import Footer from "../pages/3_footer/Footer";

const Layout: FC<{}> = ({}) => {
    return (
        <>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default Layout;
