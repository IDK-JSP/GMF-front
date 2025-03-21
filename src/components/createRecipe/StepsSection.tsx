import {FC} from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import {StepsSectionProps} from "../../1_types/CreateRecipeType";

const StepsSection: FC<StepsSectionProps> = ({steps, addStep, updateStep, removeStep}) => {

    return (
        <div>
            <h3 className="section-title">Étapes</h3>
            {steps.map((step, index) => (
                <div key={index} className="step-container">
                    <span className="step-number">{index + 1}</span>
                    <textarea
                        className="input-field step-input"
                        value={step}
                        onChange={(e) => updateStep(index, e.target.value)}
                        placeholder={`Étape ${index + 1}`}
                        required
                    />
                    {steps.length > 1 && (
                        <button type="button" className="btn-delete"
                                onClick={() => removeStep(index)}>
                            <DeleteIcon/>
                        </button>
                    )}
                </div>
            ))}
            <button type="button" className="btn-add" onClick={addStep}>Ajouter une étape</button>
        </div>
    );
};

export default StepsSection;
