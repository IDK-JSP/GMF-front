import React from 'react';

export function getEmailFromToken(token: string): string{
    if (!token) return "Non connecté";

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Décodage du payload
        return payload?.sub; // Extraction de l'email
    } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        return "Non connecté";
    }
}