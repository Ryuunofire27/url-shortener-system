import { createContext } from "react";

export type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType>({ isLoading: false, setIsLoading: () => {} });