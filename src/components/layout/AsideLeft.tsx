import React from "react";
import { Children } from "../../1_types/PropsType";

const AsideLeft: React.FC<Children> = ({ children }) => {
  return <aside className="abs-left">{children}</aside>;
};

export default AsideLeft;
