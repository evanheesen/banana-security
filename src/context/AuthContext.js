import React, {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
// import getUserData from "../helpers/getUserData";

// 1. Context maken
export const AuthContext = createContext({});

// 2. Custom Provider component
// 3. Wikkel Provider component om <App />
// Function is jasje voor Provider. Hiermee wikkelen we een component om de basis heen, zodat we meer functies mee kunnen geven.
function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: {},
        status: 'pending',
    });
    const history = useHistory();


    // persist on refresh:
    useEffect(() => {
        const token = localStorage.getItem('token'); // checken of we een token hebben
        console.log("Context wordt gerefresht")

        if (token) { // als er een token is, dan op basis van de gegevens de gebruikersdata ophalen
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            getUserData(token, decodedToken);
        }

        else { // zo niet, gaan we verder met ons leven
            toggleIsAuth({
                ...isAuth,
                status: 'done',
            });
        }

    }, [])


    async function getUserData(token, decodedToken, pushLink) {
        const idUser = decodedToken.sub;

        try {
            const result = await axios.get(`http://localhost:3000/600/users/${idUser}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

            console.log(result);

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    email: result.data.email,
                    id: result.data.id,
                    username: result.data.username,
                },
                status: 'done',
            });

            if(pushLink) {
                history.push(pushLink);
            }

        } catch (e) {
            console.error(e.response.data);
        }
    }


    function logOut() {
        console.log("Je bent uitgelogd");
        localStorage.clear();

        toggleIsAuth({
            ...isAuth,
            isAuth: false,
            user: null,
        });

        history.push("/")
    }


    function logIn(token) {
        localStorage.setItem('token', token); // JWT in local storage

        // Zorgen dat we de gebruikersdata ophalen. Nieuw GET request met decoden JWT om gebruikersgegevens op te halen.
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);

        getUserData(token, decodedToken, "/profile");

        console.log(`Je bent ingelogd!`)
    }

    //4. Data maken die voor iedereen beschikbaar is
    const contextAuth = {
        isAuth: isAuth.isAuth,
        email: isAuth.user.email,
        username: isAuth.user.username,
        logIn: logIn,
        logOut: logOut,
    }

    return (
        <AuthContext.Provider value={contextAuth}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;