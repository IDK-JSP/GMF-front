import React from "react";
import { Children } from "../../1_types/PropsType";

const AsideRight: React.FC<Children> = ({ children }) => {
  return <aside className="abs-right">{children}</aside>;
};

export default AsideRight;
