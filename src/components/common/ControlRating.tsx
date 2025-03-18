import React, { FC } from "react";
import { Rating } from "@mui/material";

interface ControlRatingProps {
  value: number | null;
  setValue: (value: number | null) => void;
}

const ControlRating: FC<ControlRatingProps> = ({ value, setValue }) => {
  return (
    <Rating
      name="simple-controlled"
      value={value ?? 0} 
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    />
  );
};

export default ControlRating;
