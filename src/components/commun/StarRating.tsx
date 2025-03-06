import React, { FC } from "react";
import { Rating } from "@mui/material";

const StarRating: FC<{
  rate: number | undefined;
  size: "small" | "medium" | "large" | undefined;
}> = ({ rate, size }) => {
  return (
    <Rating
      sx={{
        "& .MuiRating-iconFilled": { color: "orange" },
        "& .MuiRating-iconEmpty": { color: "orange" },
      }}
      name="recipe-rating"
      size={size || "medium"}
      defaultValue={rate}
      precision={0.01}
      readOnly
    />
  );
};

export default StarRating;
