import {FC, useContext} from 'react';
import {Navigate, Route, Routes} from 'react-router';
import Layout from "../layout/Layout";
import {Dashboard, Favorite, Login, Settings} from '@mui/icons-material';
import RecipeDetails from '../pages/2_body/RecipeDetails';
import Research from "../pages/2_body/Research";
import Register from "../pages/2_body/Register";
import Error from "../pages/2_body/Error";
import UserRecipes from "../pages/2_body/UserRecipes";
import {AuthContext} from "../auth/AuthContext";
import AdminDashboard from "../pages/2_body/AdminDashboard";
import CategoryList from "../pages/2_body/CategoryList";

const Router: FC<{}> = ({}) => {
    const authContext = useContext(AuthContext)

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Navigate to="/Dashboard" replace/>}/>
                <Route path="Dashboard" element={<Dashboard/>}/>
                <Route path="RecipeDetails/:id" element={<RecipeDetails/>}/>
                <Route path="Research" element={<Research/>}/>
                <Route path="Research/:searchQuery" element={<Research/>}/>
                <Route path="CategoryList/:category" element={<CategoryList/>}/>
            </Route>

            {authContext?.isLoggedIn &&
                <Route element={<Layout/>}>
                    <Route path="Favorite" element={<Favorite/>}/>
                    <Route path="UserRecipes" element={<UserRecipes/>}/>
                    <Route path="Settings" element={<Settings/>}/>
                    <Route path="Register" element={<Register/>}/>
                    <Route path="Login" element={<Login/>}/>
                </Route>}

            {authContext?.isLoggedIn && authContext.role === "ADMIN" &&
                <Route element={<Layout/>}>
                    <Route path="AdminDashboard" element={<AdminDashboard/>}/>
                </Route>}

            <Route element={<Layout/>}>
                <Route path="Error" element={<Error/>}/>
                <Route path="*" element={<Navigate to="/Error" replace/>}/>
            </Route>
        </Routes>
    );
};

export default Router;
