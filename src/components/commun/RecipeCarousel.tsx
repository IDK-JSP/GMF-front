import React, {FC, useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {RecipeType} from "../../1_types/RecipeType";
import "../../styles/recipeCarousel.css";
import StarRating from "./StarRating";
import DietBadge from "./DietBadge";

const RecipeCarousel: FC<{ recipeCollection: RecipeType[] }> = ({recipeCollection}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (recipeCollection.length === 0) return; // évite une erreur si la liste est vide
        console.log(recipeCollection)

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
        <div className="carousel-container">
            <AnimatePresence mode="wait">
                <motion.div
                    key={recipeCollection[currentIndex].id_recipe}
                    initial={{opacity: 0, x: 50}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: -50}}
                    transition={{duration: 0.5}}
                    className="carousel-slide"
                >
                    {/* Badges V */}
                    {recipeCollection[currentIndex]?.diet && (
                        <DietBadge diet={recipeCollection[currentIndex].diet} sizeInPixels={0} />
                        )}

                    {recipeCollection[currentIndex]?.id_recipe && (
                        <>
                        <img
                            src={`/recipe/recipe_${recipeCollection[currentIndex].id_recipe}.jpg` || "https://placehold.co/500x500?text=No\nImage"}
                            alt={recipeCollection[currentIndex].title}
                            className="carousel-image"
                        />
                        <div className="carousel-overlay">
                            <h2 className="carousel-title">{recipeCollection[currentIndex].title}</h2>
                            <StarRating rate={recipeCollection[currentIndex].rate} size="medium"/>
                        </div>
                        </>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Boutons de navigation */}
            <button onClick={prevSlide} className="carousel-prev-button">◀</button>
            <button onClick={nextSlide} className="carousel-next-button">▶</button>
        </div>
    );
};

export default RecipeCarousel;
