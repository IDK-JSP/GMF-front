import React, {useState} from 'react';
import './App.css';
import Router from "./routers/Router";
import {BrowserRouter} from "react-router";
import {AuthContext} from "./context/AuthContext";
import {DisplayContext} from "./context/DisplayContext";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [role, setRole] = useState("ADMIN")
    const [isItem, setIsItem] = useState(true)

    return (
        <BrowserRouter>
            <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, role, setRole}}>
                <DisplayContext.Provider value={{isItem, setIsItem}}>
                    <Router/>
                </DisplayContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}

export default App;