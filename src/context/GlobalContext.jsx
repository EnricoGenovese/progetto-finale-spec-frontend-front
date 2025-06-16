import { createContext } from "react";
import useLaptop from "../hooks/useLaptop";

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {


    const contextLaptop = useLaptop()
        
    return (
        <GlobalContext.Provider value={{ ...contextLaptop }}>
            {children}
        </GlobalContext.Provider>
    )
}