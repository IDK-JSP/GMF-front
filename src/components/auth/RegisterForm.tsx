import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormType } from "../../1_types/RegisterFormType";
import "../../styles/loginForm.css";
import { AuthContext } from "../../context/AuthContext";
import post from "../../api/post";
import { toast } from "react-toastify";
import { Typography } from '@mui/material';

const RegisterForm: FC<{}> = ({ }) => {
    const authContext = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPasswordInfo, setShowPasswordInfo] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<RegisterFormType>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });


    const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
        setErrorMessage(null);

        if (data.password !== data.confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas !");
            return;
        }

        const dataConnexion = {
            email: data.email,
            password: data.password
        }
        const response = await post("/auth/register", dataConnexion, "Inscription réussie");
        if (response) {
            // Connexion automatique après l'inscription
            const loginResponse = await post("/auth/login", {
                email: data.email,
                password: data.password,
            });
            if (loginResponse) {
                authContext.login(loginResponse);
            } else {
                toast.error("Inscription réussie, mais échec de connexion automatique.");
            }
        }

    };

    return (
        <div className="login-card">
            <Typography fontWeight="fontWeightBold" variant="h5">S'enregistrer</Typography>
            <hr />
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" {...register("email", { required: "Email requis" })} />
                    {errors.email && <p className="error-text">{errors.email.message}</p>}
                </div>
                <div className="input-group">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        {...register("password", { required: "Mot de passe requis" })}
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
                    <input type="password" {...register("confirmPassword", { required: "Confirmation requise" })} />
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
