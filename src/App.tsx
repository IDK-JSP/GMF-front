import React, {useState} from "react";
import "./App.css";
import Router from "./routers/Router";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import {DisplayContext} from "./context/DisplayContext";
import "react-loading-skeleton/dist/skeleton.css";
import {ToastContainer} from 'react-toastify';
import {StockRecipeProvider} from "./context/StockRecipeContext";


function App() {
    const [isItem, setIsItem] = useState(true);

    return (
        <>
            <AuthProvider>
                <StockRecipeProvider>
                    <DisplayContext.Provider value={{isItem, setIsItem}}>
                        <BrowserRouter>
                            <Router/>
                        </BrowserRouter>
                    </DisplayContext.Provider>
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
                </StockRecipeProvider>
            </AuthProvider>
        </>

    );
}

export default App;
