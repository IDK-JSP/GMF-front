export function isTokenExpired(token: string | null): boolean {
    if (!token) return true;
    try {
        const payloadBase64 = token.split(".")[1]; // Décoder le JWT
        if (!payloadBase64) throw new Error("Token malformé");
        const payload = JSON.parse(atob(payloadBase64));
        if (!payload.exp) throw new Error("Expiration non définie dans le token");
        return payload.exp * 1000 < Date.now(); // Vérifie si expiré
    } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
        return true; // Par défaut, considérer invalide
    }
}
