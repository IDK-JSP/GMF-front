import React from 'react';
import logo from './logo.svg';
import './App.css';
import FavoriteButton from "./components/button/FavoriteButton";
import { HelmetProvider } from 'react-helmet-async';
import RecipeCard from "./components/commun/RecipeCard";

function App() {
  return (
      <HelmetProvider>
      <RecipeCard/>
      </HelmetProvider>
  );
}

export default App;
