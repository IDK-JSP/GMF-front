import {FC, useContext, useState} from "react";
import {useNavigate} from "react-router";
import {SubmitHandler, useForm} from "react-hook-form";
import {RegisterFormType} from "../../1_types/RegisterFormType";
import {post} from "../../api/post";
import "../../styles/loginForm.css";
import {AuthContext} from "../../context/AuthContext";

const RegisterForm: FC<{}> = ({}) => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPasswordInfo, setShowPasswordInfo] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors, isSubmitting, isValid}} = useForm<RegisterFormType>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleError = (error: any) => {
        if (error.response && error.response.data) {
            setErrorMessage(Object.values(error.response.data).join(" "));
        } else {
            setErrorMessage("Une erreur est survenue.");
        }
        console.error("Erreur API :", error);
    };

    const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
        setErrorMessage(null);

        if (data.password !== data.confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            const response = await post("http://localhost:8080/auth/register", {
                email: data.email,
                password: data.password,
            });

            if (response) {
                console.log("Inscription réussie", response.data);

                // Connexion automatique après l'inscription
                const loginResponse = await post("http://localhost:8080/auth/login", {
                    email: data.email,
                    password: data.password,
                });

                if (loginResponse) {
                    console.log("Connexion réussie", loginResponse.data);
                    authContext?.setIsLoggedIn(true);
                    authContext?.setToken(loginResponse);
                    navigate("/Dashboard");
                } else {
                    setErrorMessage("Inscription réussie, mais échec de connexion automatique.");
                }
            }
        } catch (error) {
            handleError(error);
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
                    <input
                        type="password"
                        {...register("password", {required: "Mot de passe requis"})}
                        onFocus={() => setShowPasswordInfo(true)}
                        onBlur={(e) => e.target.value === "" && setShowPasswordInfo(false)}
                    />
                    {showPasswordInfo && (
                        <div className="password-info">
                            Le mot de passe doit contenir au moins :
                            <ul>
                                <li>12 caractères</li>
                                <li>2 chiffres</li>
                                <li>2 caractères spéciaux</li>
                            </ul>
                        </div>
                    )}
                    {errors.password && <p className="error-text">{errors.password.message}</p>}
                </div>
                <div className="input-group">
                    <label>Confirmer le mot de passe</label>
                    <input type="password" {...register("confirmPassword", {required: "Confirmation requise"})} />
                    {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="login-button"
                        disabled={isSubmitting || !isValid}>
                    S'inscrire
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
