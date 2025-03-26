import React, {FC} from 'react';
import {QuantityInputProps} from "../../1_types/CreateRecipeType";

const QuantityInput: FC<QuantityInputProps> = ({quantity, onChange}) => {
    return (
        <input
            className="input-field ingredient-quantity"
            type="number"
            min="0"
            placeholder="Quantité"
            value={quantity}
            onChange={(e) => onChange(Number(e.target.value))}
            required
        />
    );
};

export default QuantityInput;
