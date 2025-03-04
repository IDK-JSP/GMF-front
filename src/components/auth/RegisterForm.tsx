import {FC, useState} from 'react';
import {useNavigate} from "react-router";
import {SubmitHandler, useForm} from "react-hook-form";
import {RegisterFormType} from "../../1_types/RegisterFormType";
import {post} from "../../api/post";
import "../../styles/loginForm.css"

const RegisterForm: FC<{}> = ({}) => {
    const navigate = useNavigate();
    const {register, handleSubmit, watch, formState: {errors, isSubmitting}} = useForm<RegisterFormType>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
                console.log("Inscription réussie", response);
                navigate("/Login");
            } else {
                setErrorMessage("Erreur lors de l'inscription !");
            }
        } catch (error) {
            setErrorMessage("Une erreur est survenue !");
            console.error("Erreur lors de l'inscription", error);
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
                <div className="input-group">
                    <label>Confirmer le mot de passe</label>
                    <input type="password" {...register("confirmPassword", {required: "Confirmation requise"})} />
                    {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
                </div>

                <button type="submit" className="login-button"
                        disabled={isSubmitting}> {/*"disabled" évite le spam du bouton*/}
                    S'inscrire
                </button>
            </form>
            {/*<p className="register-link" onClick={() => navigate("/Register")}>
                Déjà inscrit ? Cliquez ici pour vous connecter !
            </p>*/}
        </div>
    );
};

export default RegisterForm;
