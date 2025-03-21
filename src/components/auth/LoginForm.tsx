import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { LoginFormType } from "../../1_types/LoginFormType";
import "../../styles/loginForm.css";
import post from "../../api/post";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";

const LoginForm: FC<{}> = ({}) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    setErrorMessage(null);
    const response = await post(`/auth/login`, data, "Connexion réussie");
    if (response) {
      authContext.login(response);
      navigate("/Home");
    } else {
      toast.error("Mauvais identifiants");
    }
  };

  return (
    <div className="login-card">
      <Typography fontWeight="fontWeightBold" variant="h5">
        Se connecter
      </Typography>
      <hr />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: "Email requis" })}
            />
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input
              type="password"
              {...register("password", { required: "Mot de passe requis" })}
            />
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <button type="submit" className="login-button" disabled={isSubmitting}>
          {" "}
          {/*"disabled" évite le spam du bouton*/}
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
