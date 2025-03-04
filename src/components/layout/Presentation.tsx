import React from "react";
import { Children } from "../../1_types/PropsType";

interface PresentationProps extends Children {
  imgUrl: string;
}

const Presentation: React.FC<PresentationProps> = ({ children, imgUrl }) => {
  return (
    <div
      className="presentation"
      style={{
        backgroundImage: `url("${imgUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
        width: "100%",
      }}
    >
      <div>{children}</div>
    </div>
  );
};

export default Presentation;
