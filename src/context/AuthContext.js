import React, {createContext, useState} from "react";
import {useHistory} from "react-router-dom";

// 1. Context maken
export const AuthContext = createContext({});

// 2. Custom Provider component
// 3. Wikkel Provider component om <App />
// Function is jasje voor Provider. Hiermee wikkelen we een component om de basis heen, zodat we meer functies mee kunnen geven.
function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState(false);
    const history = useHistory();

    function logOut() {
        toggleIsAuth(!isAuth);
        console.log("Je bent uitgelogd");
        history.push("/")
    }

    function logIn() {
        toggleIsAuth(!isAuth);
        console.log("Je bent ingelogd")
        history.push("/profile");
    }

    //4. Data maken die voor iedereen beschikbaar is
    const contextAuth = {
        isAuth: isAuth,
        logIn: logIn,
        logOut: logOut,
    }

    return (
        <AuthContext.Provider value={contextAuth}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;