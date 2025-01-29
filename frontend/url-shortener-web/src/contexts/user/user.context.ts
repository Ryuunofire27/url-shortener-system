import { createContext } from "react";

export type UserContextType = {
  id: string;
}

export const initialUserContext: UserContextType = {
  id: crypto?.randomUUID() || '',
}

export const UserContext = createContext<UserContextType>(initialUserContext);