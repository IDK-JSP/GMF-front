import React, {FC} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IngredientInput from "./IngredientInput";
import QuantityInput from "./QuantityInput";
import MeasurementSelect from "./MeasurementSelect";
import {IngredientItemProps} from "../../1_types/CreateRecipeType";

const IngredientItem: FC<IngredientItemProps> = ({
                                                     index,
                                                     value,
                                                     inputValues,
                                                     setInputValues,
                                                     quantity,
                                                     id_measurement,
                                                     allIngredients,
                                                     allMeasurements,
                                                     onChange,
                                                     removeItem,
                                                 }) => {
    return (
        <div key={index} className="ingredient-container">

            <IngredientInput index={index}
                             value={value}
                             inputValues={inputValues}
                             setInputValues={setInputValues}
                             onChange={onChange}
                             allIngredients={allIngredients}/>

            <QuantityInput index={index}
                           quantity={quantity}
                           onChange={onChange}/>

            <MeasurementSelect index={index}
                               id_measurement={id_measurement}
                               allMeasurements={allMeasurements}
                               onChange={onChange}/>

            {index > 0 && (
                <button type="button" className="btn-delete" onClick={() => removeItem(index)}>
                    <DeleteIcon/>
                </button>
            )}
        </div>
    );
};

export default IngredientItem;
