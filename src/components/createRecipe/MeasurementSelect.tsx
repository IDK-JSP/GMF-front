import React, {FC} from 'react';
import {MeasurementSelectProps} from "../../1_types/CreateRecipeType";

const MeasurementSelect: FC<MeasurementSelectProps> = ({id_measurement, allMeasurements, onChange}) => {
    return (
        <select
            className="input-field ingredient-measurement"
            value={id_measurement || ""}
            onChange={(e) => onChange(Number(e.target.value))}
            required
        >
            <option value="">Choisir une mesure</option>
            {allMeasurements.map(measurement => (
                <option key={measurement.id_measurement} value={measurement.id_measurement}>
                    {measurement.name}
                </option>
            ))}
        </select>
    );
};

export default MeasurementSelect;
