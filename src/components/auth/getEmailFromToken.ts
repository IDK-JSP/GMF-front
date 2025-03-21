export const getEmailFromToken = (token: string | null) => {
      try {
        if (!token) return null;
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub || null;
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        return null;
      }
    };