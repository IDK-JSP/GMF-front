import React, {FC, useEffect, useRef, useState} from 'react';
import ContentWithoutAside from "../../components/layout/ContentWithoutAside";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";

const Login: FC<{}> = ({}) => {
    const [activeForm, setActiveForm] = useState<'none' | 'login' | 'register'>('none');
    const formContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formContainerRef.current && !formContainerRef.current.contains(event.target as Node)) {
                setActiveForm('none');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="login-container">
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
                {/*<section>
                    <Box sx={{display: "flex", flexDirection: "row", gap: "100px", alignItems: "space-around"}}>
                        <article>

                            <LoginForm/>
                        </article>
                        <article>
                            <RegisterForm/>
                        </article>
                    </Box>
                </section>*/}
                <div className="form-container" ref={formContainerRef}>
                    <div
                        className={`form-card ${activeForm === 'login' ? 'active' : activeForm === 'none' ? 'neutral' : ''}`}
                        onClick={() => setActiveForm(activeForm === 'login' ? 'none' : 'login')}
                    >
                        <LoginForm/>
                    </div>
                    <div
                        className={`form-card ${activeForm === 'register' ? 'active' : activeForm === 'none' ? 'neutral' : ''}`}
                        onClick={() => setActiveForm(activeForm === 'register' ? 'none' : 'register')}
                    >
                        <RegisterForm/>
                    </div>
                </div>
            </ContentWithoutAside>
        </div>
    );
};

export default Login;
