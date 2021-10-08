import React, {createContext, useState} from "react";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState(false);

    function toggleAuth() {
        if (isAuth) {
            toggleIsAuth(false);
            console.log("Gebruiker is uitgelogd!")
        }
        else {
            toggleIsAuth(true);
            console.log("Gebruiker is ingelogd!")
        }
    }

    return (
        <AuthContext.Provider value={{ toggleAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;