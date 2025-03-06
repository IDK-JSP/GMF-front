import React, { FC } from "react";
import { Rating } from "@mui/material";

const ControlRating: FC = () => {
  const [value, setValue] = React.useState<number | null>(0);
  return (
    <Rating
      name="simple-controlled"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    />
  );
};

export default ControlRating;
