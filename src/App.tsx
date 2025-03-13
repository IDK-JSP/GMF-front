import React, {useState} from "react";
import "./App.css";
import Router from "./routers/Router";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import {DisplayContext} from "./context/DisplayContext";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
    const [isItem, setIsItem] = useState(true);

    return (
        <AuthProvider>
            <DisplayContext.Provider value={{isItem, setIsItem}}>
                <BrowserRouter>
                    <Router/>
                </BrowserRouter>
            </DisplayContext.Provider>
        </AuthProvider>
    );
}

export default App;
