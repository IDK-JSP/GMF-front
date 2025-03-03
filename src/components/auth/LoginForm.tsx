import {FC, useContext, useState} from 'react';
import {useNavigate} from "react-router";
import {SubmitHandler, useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext";
import {LoginFormType} from "../../1_types/LoginFormType";
import axios from "axios";
import "../../styles/loginForm.css"

export const post = async (url: string, data: {}, config?: {}) => {
    try {
        const response = await axios.post(url, data, config);
        console.log("Response", response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


const LoginForm: FC<{}> = ({}) => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormType>({
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
                authContext?.setToken(response.data);
                navigate("/");
            } else {
                setErrorMessage("Identifiants incorrects !");
            }
        } catch (error) {
            setErrorMessage("Une erreur est survenue !");
            console.error("Erreur lors de la connexion", error);
        }
    };

    return (
            <div className="login-card">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                    <button type="submit" className="login-button">Se connecter</button>
                </form>
                <p className="register-link" onClick={() => navigate("/Register")}>
                    Pas encore de compte ? Cliquez ici pour vous inscrire !
                </p>
        </div>
    );
};

export default LoginForm;
