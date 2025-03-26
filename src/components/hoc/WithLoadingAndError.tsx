import { FC, JSX } from "react";
import Skeleton from "react-loading-skeleton";

type Props<T> = {
  isLoading: boolean;
  error: string | null;
  data: T[] | null;
  SkeletonComponent?: FC;
  children: (data: T[]) => JSX.Element;
};

// Un HOC (Higher Order Component) est une fonction qui prend un composant et retourne un autre composant

// Utilisation d'un type générique pour pouvoir passer n'importe quel type de données

const WithLoadingAndError = <T,>({
  isLoading,
  error,
  data,
  SkeletonComponent,
  children,
}: Props<T>) => {
  // Vérification stricte du chargement
  if (isLoading) {
    return SkeletonComponent ? <SkeletonComponent /> : <Skeleton count={3} />;
  }

  // Vérification de l'erreur
  if (error) {
    return <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>;
  }

  // Si les données sont vides après le chargement
  if (!data || data.length === 0) {
    return children([]);
  }

  // Affichage normal si tout est bon
  return children(data);
};

export default WithLoadingAndError;
