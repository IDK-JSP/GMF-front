import React, { FC } from "react";
import AsideLeft from "../components/layout/AsideLeft";
import "../styles/createRecipe.css";
import IngredientsSection from "../components/createRecipe/IngredientsSection";
import { useRecipeForm } from "../components/createRecipe/useRecipeForm";
import StepsSection from "../components/createRecipe/StepsSection";
import Pages from "../components/layout/Pages";
import HeroSection from "../components/layout/HeroSection";
import { Typography } from "@mui/material";
import Content from "../components/layout/Content";

const CreateRecipe: FC<{}> = ({}) => {
  const {
    title,
    setTitle,
    person,
    setPerson,
    description,
    setDescription,
    ingredients,
    addIngredient,
    updateIngredient,
    removeIngredient,
    steps,
    addStep,
    updateStep,
    removeStep,
    allIngredients,
    allMeasurements,
    submitRecipe,
  } = useRecipeForm();

  return (
    <Pages pageTitle="Créer une recette">
      <HeroSection>Créer une recette</HeroSection>
      <main>
        <AsideLeft>
          <IngredientsSection
            ingredients={ingredients}
            addIngredient={addIngredient}
            updateIngredient={updateIngredient}
            removeIngredient={removeIngredient}
            allIngredients={allIngredients}
            allMeasurements={allMeasurements}
          />
        </AsideLeft>
        <Content asideLeft>
          <section>
            <article>
              <form onSubmit={submitRecipe} className="recipe-form">
                <div className="input-field recipe-title">
                  <Typography sx={{ marginRight: "10px" }}>Titre :</Typography>
                  <input
                    type="text"
                    placeholder="La purée de mamie"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="input-field recipe-person">
                  <Typography sx={{ marginRight: "10px" }}>
                    Recette prévue pour
                  </Typography>
                  <input
                    type="number"
                    placeholder="Nombre de personnes"
                    value={person}
                    onChange={(e) => setPerson(Number(e.target.value))}
                    required
                  />
                </div>
                <textarea
                  className="recipe-description"
                  placeholder="Décrivez votre recette ici..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <StepsSection
                  steps={steps}
                  addStep={addStep}
                  updateStep={updateStep}
                  removeStep={removeStep}
                />
                <button type="submit" className="btn-submit">
                  Créer la Recette
                </button>
              </form>
            </article>
          </section>
        </Content>
      </main>
    </Pages>
  );
};

export default CreateRecipe;
