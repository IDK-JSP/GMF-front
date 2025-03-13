export function isTokenExpired(token: string | null): boolean {
    if (!token) return true;
  
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Décoder le JWT
      return payload.exp * 1000 < Date.now(); // Vérifie si expiré
    } catch (error) {
      console.error("Erreur de décodage du token :", error);
      return true; // Par défaut, considérer invalide
    }
  }
  