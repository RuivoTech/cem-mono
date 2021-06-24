import React, { createContext } from "react";

import { provider } from "./Provider";

export const Context = createContext({});

function Provider({ children }) {
    return (
        <Context.Provider value={provider}>
            {children}
        </Context.Provider>
    )
}

export default Provider