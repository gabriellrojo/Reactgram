import { createContext } from "react";
import useRegister from "../hooks/useRegister";

export const Context = createContext()
export const ContextProvider = ({children}) => {
    const { token, userPost } = useRegister()
    return (
        <Context.Provider value={{ token, userPost }}>{children}</Context.Provider>
    )
}