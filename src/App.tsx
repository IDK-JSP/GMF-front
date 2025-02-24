import React from 'react';
import './App.css';
import {HelmetProvider} from 'react-helmet-async';
import RecipeCard from "./components/commun/RecipeCard";

function App() {
    return (
        <HelmetProvider>
            <RecipeCard/>
        </HelmetProvider>
    );
}

export default App;