import {FC} from 'react';
import ContentWithoutAside from "../../components/layout/ContentWithoutAside";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";

const Login: FC<{}> = ({}) => {
    return (
        <>
            <div className='presentation'
                 style={{
                     backgroundImage: `url("/research.jpg")`,
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                     height: "300px",
                     width: "100%"
                 }}>
                <div>Connexion</div>
            </div>
            <ContentWithoutAside>
                <section>
                    <article>
                        <LoginForm/>
                        <RegisterForm/>
                    </article>
                </section>
            </ContentWithoutAside>
        </>
    );
};

export default Login;
