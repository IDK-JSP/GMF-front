import {FC, useContext, useState} from 'react';
import {useNavigate} from "react-router";
import {SubmitHandler, useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext";
import {LoginFormType} from "../../1_types/LoginFormType";
import "../../styles/loginForm.css"
import {post} from "../../api/post";

const LoginForm: FC<{}> = ({}) => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginFormType>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
        setErrorMessage(null);
        try {
            const response = await post(`http://localhost:8080/auth/login`, data);

            if (response) {
                authContext?.setIsLoggedIn(true);
                authContext?.setToken(response);
                navigate("/Dashboard");
            } else {
                setErrorMessage("Identifiants incorrects !");
            }
        } catch (error) {
            setErrorMessage("Identifiants incorrects ou erreur serveur !");
            console.error("Erreur lors de la connexion", error);
        }
    };

    return (
        <div className="login-card">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" {...register("email", {required: "Email requis"})} />
                    {errors.email && <p className="error-text">{errors.email.message}</p>}
                </div>
                <div className="input-group">
                    <label>Mot de passe</label>
                    <input type="password" {...register("password", {required: "Mot de passe requis"})} />
                    {errors.password && <p className="error-text">{errors.password.message}</p>}
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="login-button"
                        disabled={isSubmitting}> {/*"disabled" évite le spam du bouton*/}
                    Se connecter
                </button>
            </form>
            {/* <p className="register-link" onClick={() => navigate("/Register")}>
                Pas encore de compte ? Cliquez ici pour vous inscrire !
            </p>*/}
        </div>
    );
};

export default LoginForm;
