import { FC } from "react";
import { Children } from "../../1_types/PropsType";

interface PagesProps extends Children {
  pageTitle?: string;
}
const Pages: FC<PagesProps> = ({ children, pageTitle = "GMF" }) => {
  return (
    <>
      {pageTitle ? <title>{pageTitle}</title> : <title>GMF</title>}
      <link rel="icon" href="/GMF-logo.png" type="image/x-icon" />
      {children}
    </>
  );
};

export default Pages;
