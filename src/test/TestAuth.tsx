import {useContext, useEffect} from "react";
import AuthContext from "../context/AuthContext";

const TestAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const {token, isLoggedIn, role, login, logout} = authContext;

    useEffect(() => {
        console.log("🔍 TestAuth Mounted");
        console.log("👉 Token actuel :", token);
        console.log("✅ Utilisateur connecté :", isLoggedIn);
        console.log("🛠️ Rôle :", role);
    }, [token, isLoggedIn, role]);

    const handleLoginTest = async () => {
        console.log("🔑 Tentative de connexion...");

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: "toto@toto.com", // Remplace par un vrai email
                    password: "password12++", // Remplace par un vrai mot de passe
                }),
            });

            if (!response.ok) {
                throw new Error("Échec de la connexion");
            }

            const token = await response.text(); // 🔥 Lire la réponse comme un texte brut
            console.log("✅ Token reçu :", token);

            // Utiliser le token pour la connexion
            login(token);
        } catch (error) {
            console.error("❌ Erreur de connexion :", error);
        }
    };


    const handleLogoutTest = () => {
        console.log("🚪 Déconnexion...");
        logout();
        console.log("✅ Déconnecté !");
    };

    const handleTokenExpirationTest = () => {
        console.log("⏳ Simulation d'expiration...");
        login("EXPIRED_TOKEN"); // Simule un token expiré
        console.log("🚨 Token expiré simulé !");
    };

    return (
        <div style={{padding: "20px", border: "2px solid red", margin: "20px"}}>
            <h2>🛠️ Test Auth</h2>
            <p>Token : {token || "Aucun"}</p>
            <p>Connecté : {isLoggedIn ? "✅ Oui" : "❌ Non"}</p>
            <p>Rôle : {role || "Aucun"}</p>
            <button onClick={handleLoginTest}>🔑 Simuler Connexion</button>
            <button onClick={handleLogoutTest}>🚪 Simuler Déconnexion</button>
            <button onClick={handleTokenExpirationTest}>⏳ Simuler Expiration</button>
        </div>
    );
};

export default TestAuth;
