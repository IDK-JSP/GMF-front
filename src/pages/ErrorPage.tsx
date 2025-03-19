import {FC} from 'react';
import ContentWithoutAside from "../components/layout/ContentWithoutAside";
import {Typography} from "@mui/material";
import {useNavigate} from "react-router";
import "../styles/errorPage.css"

const ErrorPage: FC<{}> = ({}) => {
    const navigate = useNavigate()

    return (
        <>
            <main>
                <ContentWithoutAside>
                    <section>
                        <article>
                        <img src={"/404.png"} alt={"Erreur 404"}/>
                            <Typography variant="h5">
                                Oops ! La page que vous avez demandée n'existe pas...
                            </Typography>
                            <button className="home-btn" onClick={() => {
                                navigate("/Home")
                            }}>
                            <Typography variant="h5">
                                Revenir à l'accueil
                            </Typography>
                            </button>
                        </article>
                    </section>
                </ContentWithoutAside>
            </main>
        </>
    );
};

export default ErrorPage;
