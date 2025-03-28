import {FC, useContext} from "react";
import {Navigate, Route, Routes} from "react-router";
import Layout from "../components/layout/Layout";
import RecipeDetails from "../pages/RecipeDetails";
import Research from "../pages/Research";
import UserRecipes from "../pages/UserRecipes";
import {AuthContext} from "../context/AuthContext";
import AdminDashboard from "../pages/AdminDashboard";
import CategoryList from "../pages/CategoryList";
import Favorite from "../pages/Favorite";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ErrorPage from '../pages/ErrorPage';
import CreateRecipe from "../pages/CreateRecipe";

const Router: FC<{}> = ({}) => {
    const authContext = useContext(AuthContext);

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Navigate to="/Home" replace/>}/>
                <Route path="Home" element={<Home/>}/>
                <Route path="RecipeDetails/:id" element={<RecipeDetails/>}/>
                <Route path="Research" element={<Research/>}/>
                <Route path="Research/:searchQuery" element={<Research/>}/>
                <Route path="CategoryList/:category" element={<CategoryList/>}/>
                <Route path="Login" element={<Login/>}/>
            </Route>

            {authContext?.isLoggedIn &&
                <Route element={<Layout/>}>
                    <Route path="Favorite" element={<Favorite/>}/>
                    <Route path="UserRecipes" element={<UserRecipes/>}/>
                    <Route path="CreateRecipe" element={<CreateRecipe/>}/>
                    <Route path="Settings" element={<Settings/>}/>
                </Route>}

            {authContext?.isLoggedIn && authContext.role === "ADMIN" && (
                <Route element={<Layout/>}>
                    <Route path="AdminDashboard" element={<AdminDashboard/>}/>
                </Route>
            )}

            <Route element={<Layout/>}>
                <Route path="Error" element={<ErrorPage/>}/>
                <Route path="*" element={<Navigate to="/Error" replace/>}/>
            </Route>
        </Routes>
    );
};

export default Router;
