import { createContext, useContext } from "react";

export const UserContext = createContext({
    data: null,
    setData: () => {}
})

export const userContext = () => useContext(UserContext);