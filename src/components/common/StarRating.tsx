import React, { FC } from "react";
import { Rating } from "@mui/material";

const StarRating: FC<{
  rate: number | undefined;
  size: string | "small" | "medium" | "large" | undefined;
}> = ({ rate, size }) => {
  return (
    <div>
      {rate && (
        <Rating
          sx={{
            fontSize: size,
            "& .MuiRating-iconFilled": { color: "orange" },
            "& .MuiRating-iconEmpty": { color: "orange" },
          }}
          name="recipe-rating"
          value={rate}
          precision={0.01}
          readOnly
        />
      )}
    </div>
  );
};

export default StarRating;
