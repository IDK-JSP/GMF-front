import { useState, useEffect } from "react";

// Hook perso pour géré l'affichage d'une image

const useImage = (imgUrl: string) => {
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!imgUrl) {
            setError("URL d'image manquante");
            setIsLoading(false);
            return;
        }

        const img = new Image();
        img.src = imgUrl;

        img.onload = () => {
            setImage(imgUrl);
            setIsLoading(false);
        };

        img.onerror = () => {
            setError("Impossible de charger l'image");
            setIsLoading(false);
        };
    }, [imgUrl]);

    return { image, isLoading, error };
};

export default useImage;
