import { createContext, useState, ReactNode, FC } from "react";

interface DynamicFilterContextType {
  isMatching: boolean;
  setIsMatching: (value: boolean) => void;
}

export const DynamicFilterContext = createContext<DynamicFilterContextType | null>(null);

export const DynamicFilterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isMatching, setIsMatching] = useState<boolean>(true);

  return (
    <DynamicFilterContext.Provider value={{ isMatching, setIsMatching }}>
      {children}
    </DynamicFilterContext.Provider>
  );
};
