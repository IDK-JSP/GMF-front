import React, { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RecipeType } from "../../1_types/RecipeType";
import "../../styles/recipeCarousel.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";

const RecipeCarousel: FC<{ recipeCollection: RecipeType[] }> = ({
  recipeCollection,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const handleNavigate = (recipe: RecipeType) => {
    navigate(`/RecipeDetails/${recipe.id_recipe}`, { state: { recipe } });
  };

  useEffect(() => {
    if (recipeCollection.length === 0) return; // évite une erreur si la liste est vide

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % recipeCollection.length);
    }, 5000); // Change d'image toutes les 5 secondes

    return () => clearInterval(interval);
  }, [recipeCollection.length]);

  const nextSlide = () => {
    if (recipeCollection.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recipeCollection.length);
  };

  const prevSlide = () => {
    if (recipeCollection.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? recipeCollection.length - 1 : prevIndex - 1
    );
  };

  if (recipeCollection.length === 0) {
    return <p className="no-recipes">Aucune recette disponible</p>;
  }

  return (
    <div
      className="carousel-container"
      onClick={() => handleNavigate(recipeCollection[currentIndex])}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={recipeCollection[currentIndex].id_recipe}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="carousel-slide"
        >
          {recipeCollection[currentIndex]?.id_recipe && (
            <img
              src={
                `/recipe/carousel/recipe_${recipeCollection[currentIndex].id_recipe}.png` ||
                "/research.jpg"
              }
              alt={recipeCollection[currentIndex].title}
              className="carousel-image"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Boutons de navigation */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Empêche la propagation de l'événement
          prevSlide();
        }}
        className="carousel-prev-button"
      >
        <KeyboardArrowLeftIcon />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Empêche la propagation de l'événement
          nextSlide();
        }}
        className="carousel-next-button"
      >
        <KeyboardArrowRightIcon />
      </button>
    </div>
  );
};

export default RecipeCarousel;
