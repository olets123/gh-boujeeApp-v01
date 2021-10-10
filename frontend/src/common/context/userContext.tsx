import { createContext } from "react";

export type ContextProps = {
  userData: {};
  setUserData: (
    value: React.SetStateAction<{
      token: string;
      user: undefined;
    }>
  ) => void;
};

export default createContext<ContextProps | null>(null);
