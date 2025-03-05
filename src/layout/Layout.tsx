import { FC } from "react";
import NavBar from "../components/header/NavBar";
import Footer from "../pages/3_footer/Footer";
import { Outlet } from "react-router";
import "../App.css";

const Layout: FC<{}> = ({}) => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
