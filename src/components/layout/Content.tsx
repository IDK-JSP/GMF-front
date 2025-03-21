import React from "react";
import { Children } from "../../1_types/PropsType";
interface ContentProps extends Children {
  asideRight?: boolean;
  asideLeft?: boolean;
}
const Content: React.FC<ContentProps> = ({
  children,
  asideLeft = false,
  asideRight = false,
}) => {
  if (asideRight && asideLeft) {
    return <div className="content content-with-both-aside">{children}</div>;
  } else if (asideRight) {
    return <div className="content content-with-right-aside">{children}</div>;
  } else if (asideLeft) {
    return <div className="content content-with-left-aside">{children}</div>;
  } else {
    return <div className="content content-without-aside">{children}</div>;
  }
};

export default Content;
