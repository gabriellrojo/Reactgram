import { createContext } from "react";
import useAuth from "../hooks/useRegister";

export const Context = createContext()
export const ContextProvider = ({children}) => {
    const { auth, logout } = useAuth()
    return (
        <Context.Provider value={{ auth, logout }}>{children}</Context.Provider>
    )
}