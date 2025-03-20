import { FC } from "react";
import NavBar from "../navBar/NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import "../../App.css";

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
