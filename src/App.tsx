import React, {useState, useEffect, useContext} from "react";
import "./App.css";
import Router from "./routers/Router";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import {DisplayContext} from "./context/DisplayContext";
import "react-loading-skeleton/dist/skeleton.css";
  import { ToastContainer, toast } from 'react-toastify';


function App() {
    const storedToken = localStorage.getItem("");
    const storedRole = localStorage.getItem("role") || "";

    const [token, setToken] = useState(storedToken || "");
    const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
    const [role, setRole] = useState(storedRole);
    const [isItem, setIsItem] = useState(true);

    // Mettre à jour localStorage quand le token change
    useEffect(() => {
        if (token) {
            localStorage.setItem("", token);
            setIsLoggedIn(true);
        } else {
            localStorage.removeItem("");
            setIsLoggedIn(false);
        }
    }, [token]);

    useEffect(() => {
        localStorage.setItem("role", role);
    }, [role]);
    

    return (
        <>
        <BrowserRouter>
            <AuthContext.Provider
                value={{isLoggedIn, setIsLoggedIn, role, setRole, token, setToken}}
            >
                <DisplayContext.Provider value={{isItem, setIsItem}}>
                    <Router/>
                </DisplayContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        </>
    );
}

export default App;
