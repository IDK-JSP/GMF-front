import React, {FC, useEffect, useRef, useState} from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import '../styles/loginForm.css';
import ContentWithoutAside from "../components/layout/ContentWithoutAside";

const Login: FC<{}> = ({}) => {
    const [activeForm, setActiveForm] = useState<'none' | 'login' | 'register'>('none');
    const formContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
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

    const toggleForm = (form: 'login' | 'register') => {
        setActiveForm(prev => (prev === form ? prev : form));
    };

    return (
        <div className="login-container">
            <div className="presentation" style={{
                backgroundImage: `url("/research.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
                width: "100%"
            }}>
                <div>Connexion / Inscription</div>
            </div>
<main>
            <ContentWithoutAside>
                <section>
                    <div className="form-container" ref={formContainerRef}>
                        <div
                            className={`form-card ${activeForm === 'login' ? 'active' : activeForm === 'none' ? 'neutral' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleForm('login');
                            }}
                        >
                            <LoginForm/>
                        </div>
                        <div
                            className={`form-card ${activeForm === 'register' ? 'active' : activeForm === 'none' ? 'neutral' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleForm('register');
                            }}
                        >
                            <RegisterForm/>
                        </div>
                    </div>
                </section>
            </ContentWithoutAside>
            </main>
        </div>
    );
};

export default Login;
