import React from 'react';
import logo from './logo.svg';
import './App.css';
import FavoriteButton from "./components/button/FavoritreButton";
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
      <HelmetProvider>
      <FavoriteButton/>
      </HelmetProvider>
  );
}

export default App;
