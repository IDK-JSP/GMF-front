import React, {useState} from 'react';
import './App.css';
import Router from "./routers/Router";
import {BrowserRouter} from "react-router";
import {AuthContext} from "./auth/AuthContext";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [role, setRole] = useState("ADMIN")

    return (
        <BrowserRouter>
            <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, role, setRole}}>
                    <Router/>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}

export default App;