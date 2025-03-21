export function clearAuthContext(setAuthContext: (value: any) => void) {
    localStorage.removeItem("token"); // Supprime le token stocké
    setAuthContext(null); // Réinitialise le contexte d'authentification
    window.location.href = "/login"; // Redirection vers la page de connexion
  }
  