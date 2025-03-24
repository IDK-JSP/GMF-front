import { useState, useEffect } from "react";

// Hook perso pour gérer l'affichage d'une image avec fallback
const useImage = (imgUrl: string, imgDefault: string) => {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imgUrl) {
      setError("URL d'image manquante");
      setImage(imgDefault);
      setIsLoading(false);
      return;
    }

    const img = new Image();
    img.src = imgUrl;

    img.onload = () => {
      setImage(imgUrl);
      setIsLoading(false);
      setError(null);
    };

    img.onerror = () => {
      setImage(imgDefault);
      setIsLoading(false);
      setError("Impossible de charger l'image");
    };
  }, [imgUrl, imgDefault]);

  return { image, isLoading, error };
};

export default useImage;
