import React, { FC } from "react";
import AsideLeft from "../components/layout/AsideLeft";
import "../styles/createRecipe.css";
import IngredientsSection from "../components/createRecipe/IngredientsSection";
import { useRecipeForm } from "../components/createRecipe/useRecipeForm";
import StepsSection from "../components/createRecipe/StepsSection";
import Pages from "../components/layout/Pages";
import HeroSection from "../components/layout/HeroSection";
import Content from "../components/layout/Content";

const CreateRecipe: FC<{}> = ({}) => {
  const {
    title,
    setTitle,
    person,
    setPerson,
    description,
    setDescription,
    cookingTime,
    setCookingTime,
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
        <Content>
              <form onSubmit={submitRecipe} className="recipe-form">
              <article>
                <div className="input-field recipe-title">
                  <p>Ajouter un titre à votre recette : <span style={{ color: "red" }}>*</span></p>
                  <input
                    type="text"
                    maxLength={64}
                    placeholder="Ma recette idéale"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <p>Ajouter la durée qu'il faut prévoir pour réaliser la recette (en minutes): <span style={{ color: "red" }}>*</span></p>
                  <input
                  type="number"
                  min={0}
                  placeholder="Durée nécessaire pour réaliser la recette (exemple : '90' pour une recette prête en 1h30)"
                  value={cookingTime}
                  onChange={(e)=> setCookingTime(parseInt(e.target.value))}
                  required
                  />
                  <p>
                    Pour combien de personne est prévue la recette ?
                  </p>
                  <input
                    type="number"
                    className="person-quantity"
                    min={0}
                    placeholder="Nombre de personnes"
                    value={person}
                    defaultValue={2}
                    onChange={(e) => setPerson(Number(e.target.value))}
                    required
                  />
                
                <textarea
                  className="recipe-description"
                  maxLength={500}
                  placeholder="Ajouter une présentation à votre recette (facultatif)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                </div>
                </article>
                <article>
                <IngredientsSection
            ingredients={ingredients}
            addIngredient={addIngredient}
            updateIngredient={updateIngredient}
            removeIngredient={removeIngredient}
            allIngredients={allIngredients}
            allMeasurements={allMeasurements}
          />
                </article>
                <article>
                <StepsSection
                  steps={steps}
                  addStep={addStep}
                  updateStep={updateStep}
                  removeStep={removeStep}
                />
                </article>
                <article>
                <p className="required-fields"><span style={{ color: "red" }}>*</span> Champs obligatoires</p>
                <button type="submit" className="btn-submit">
                  Créer la Recette
                </button>
              
          </article>
          </form>
        </Content>
      </main>
    </Pages>
  );
};

export default CreateRecipe;
