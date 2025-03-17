import { FC } from "react";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/layout/Footer";
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
