import { createContext } from "react";
import { UserCredentials } from "./types";

type AppContextType = {
    userCredentials: UserCredentials | null;
    setUserCredentials: React.Dispatch<React.SetStateAction<UserCredentials | null>>;
};

export const AppContext = createContext<AppContextType | null>(null);