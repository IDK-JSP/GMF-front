import {FC, useContext, useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router';
import Layout from "../layout/Layout";
import RecipeDetails from '../pages/2_body/RecipeDetails';
import Research from "../pages/2_body/Research";
import Register from "../pages/2_body/Register";
import UserRecipes from "../pages/2_body/UserRecipes";
import {AuthContext} from "../context/AuthContext";
import AdminDashboard from "../pages/2_body/AdminDashboard";
import CategoryList from "../pages/2_body/CategoryList";
import Favorite from "../pages/2_body/Favorite";
import Settings from "../pages/2_body/Settings";
import Login from "../pages/2_body/Login";
import Dashboard from "../pages/2_body/Dashboard";
import {isTokenExpired} from '../components/auth/isTokenExpired';
import ErrorPage from '../pages/2_body/ErrorPage';
import CreateRecipe from "../pages/2_body/CreateRecipe";

const Router: FC<{}> = ({}) => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext doit être utilisé dans un AuthProvider");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (isTokenExpired(token)) {
            authContext.logout();
        }
    }, [authContext]);

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Navigate to="/Dashboard" replace/>}/>
                <Route path="Dashboard" element={<Dashboard/>}/>
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
                    <Route path="Register" element={<Register/>}/>
                </Route>}

            {authContext?.isLoggedIn && authContext.role === "ADMIN" &&
                <Route element={<Layout/>}>
                    <Route path="AdminDashboard" element={<AdminDashboard/>}/>
                </Route>}

            <Route element={<Layout/>}>
                <Route path="Error" element={<ErrorPage/>}/>
                <Route path="*" element={<Navigate to="/Error" replace/>}/>
            </Route>
        </Routes>
    );
};

export default Router;
