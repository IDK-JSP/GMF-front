import React, {FC} from 'react';
import Presentation from "../components/layout/Presentation";
import AsideLeft from "../components/layout/AsideLeft";
import ContentWithLeftAside from "../components/layout/ContentWithLeftAside";
import "../styles/createRecipe.css";
import IngredientsSection from "../components/createRecipe/IngredientsSection";
import {useRecipeForm} from "../components/createRecipe/useRecipeForm";
import StepsSection from "../components/createRecipe/StepsSection";

const CreateRecipe: FC<{}> = ({}) => {
    const {
        title, setTitle,
        person, setPerson,
        ingredients, addIngredient, updateIngredient,
        steps, addStep, updateStep, removeStep,
        allIngredients, allMeasurements,
        submitRecipe
    } = useRecipeForm();

    return (
        <>
            <Presentation>Créer une recette</Presentation>
            <main>
                <AsideLeft>
                    <IngredientsSection
                        ingredients={ingredients}
                        addIngredient={addIngredient}
                        updateIngredient={updateIngredient}
                        allIngredients={allIngredients}
                        allMeasurements={allMeasurements}
                    />
                </AsideLeft>
                <ContentWithLeftAside>
                    <section>
                        <article>
                            <form onSubmit={submitRecipe} className="recipe-form">
                                <input className="input-field recipe-title" type="text" placeholder="Titre"
                                       value={title} onChange={(e) => setTitle(e.target.value)} required/>
                                <input className="input-field recipe-person" type="number"
                                       placeholder="Nombre de personnes"
                                       value={person} onChange={(e) => setPerson(Number(e.target.value))} required/>
                                <StepsSection steps={steps} addStep={addStep} updateStep={updateStep}
                                              removeStep={removeStep}/>
                                <button type="submit" className="btn-submit">Créer la Recette</button>
                            </form>
                        </article>
                    </section>
                </ContentWithLeftAside>
            </main>
        </>
    );
};

export default CreateRecipe;
