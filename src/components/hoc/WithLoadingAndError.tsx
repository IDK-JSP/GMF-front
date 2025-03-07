import { FC, JSX } from "react";
import Skeleton from "react-loading-skeleton";

type Props<T> = {
  isLoading: boolean;
  error: string | null;
  data: T[] | null;
  SkeletonComponent?: FC;
  children: (data: T[]) => JSX.Element;
};

const WithLoadingAndError = <T,>({
  isLoading,
  error,
  data,
  SkeletonComponent,
  children,
}: Props<T>) => {
  // 🔥 Vérification stricte du chargement
  if (isLoading) {
    return SkeletonComponent ? <SkeletonComponent /> : <Skeleton count={3} />;
  }

  // 🛑 Vérification de l'erreur
  if (error) {
    return <p style={{ color: "red", fontWeight: "bold" }}>❌ {error}</p>;
  }

  // 🚨 Si les données sont vides après le chargement
  if (!data || data.length === 0) {
    return <p style={{ color: "gray" }}>Aucune donnée trouvée.</p>;
  }

  // ✅ Affichage normal si tout est bon
  return children(data);
};

export default WithLoadingAndError;
