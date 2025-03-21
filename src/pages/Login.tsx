import React, { FC, useEffect, useRef, useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import "../styles/loginForm.css";
import Content from "../components/layout/Content";
import Pages from "../components/layout/Pages";
import HeroSection from "../components/layout/HeroSection";

const Login: FC<{}> = ({ }) => {
  const [activeForm, setActiveForm] = useState<"none" | "login" | "register">(
    "none"
  );
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formContainerRef.current &&
        !formContainerRef.current.contains(event.target as Node)
      ) {
        setActiveForm("none");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleForm = (form: "login" | "register") => {
    setActiveForm((prev) => (prev === form ? prev : form));
  };

  return (
    <Pages pageTitle="Se connecter">
      <div className="login-container">
        <HeroSection>Se connecter</HeroSection>

        <Content>
          <section>
            <div className="form-container" ref={formContainerRef}>
              <div
                className={`form-card ${activeForm === "login"
                  ? "active"
                  : activeForm === "none"
                    ? "neutral"
                    : ""
                  }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleForm("login");
                }}
              >
                <LoginForm />
              </div>
              <p id="login-form-or">OU</p>
              <div
                className={`form-card ${activeForm === "register"
                  ? "active"
                  : activeForm === "none"
                    ? "neutral"
                    : ""
                  }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleForm("register");
                }}
              >
                <RegisterForm />
              </div>
            </div>
          </section>
        </Content>
      </div>
    </Pages>
  );
};

export default Login;
