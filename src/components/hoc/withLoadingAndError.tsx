import { FC, JSX } from "react";
import Skeleton from "react-loading-skeleton";

// Composant HOC (High Order Component) qui gère les cas de chargement et d'erreur
// Il tient compte du chargemement de la page, des erreurs et de la présence de données

// Application aux composants IngredientResume, StageResume et DietResume
// A étendre à d'autres composants si besoin

type Props<T> = {
  isLoading: boolean;
  error: string | null;
  data: T[] | null;
  SkeletonComponent?: FC;
  children: (data: T[]) => JSX.Element;
};

const withLoadingAndError = <T,>({
  isLoading,
  error,
  data,
  SkeletonComponent,
  children,
}: Props<T>) => {
  if (isLoading)
    return SkeletonComponent ? <SkeletonComponent /> : <Skeleton count={3} />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data || data.length === 0)
    return SkeletonComponent ? <SkeletonComponent /> : <Skeleton count={3} />;

  return children(data);
};

export default withLoadingAndError;
