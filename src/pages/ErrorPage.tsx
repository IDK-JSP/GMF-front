import { FC } from "react";
import Content from "../components/layout/Content";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import "../styles/errorPage.css";
import Pages from "../components/layout/Pages";

const ErrorPage: FC<{}> = ({}) => {
  const navigate = useNavigate();

  return (
    <Pages pageTitle="Erreur 404">
      <main>
        <Content>
          <section style={{ marginTop: "75px" }}>
            <article>
              <img src={"/404.png"} alt={"Erreur 404"} />
              <Typography variant="h5">
                Oops ! La page que vous avez demandée n'existe pas...
              </Typography>
              <button
                className="home-btn"
                onClick={() => {
                  navigate("/Home");
                }}
              >
                <Typography variant="h5">Revenir à l'accueil</Typography>
              </button>
            </article>
          </section>
        </Content>
      </main>
    </Pages>
  );
};

export default ErrorPage;
