import React, {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

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


    useEffect(() => {
        // checken of we een token hebben
        const token = localStorage.getItem('token');

        if (token) {
            // zo ja, dan op basis van de gegevens de gebruikersdata ophalen


            toggleIsAuth({
                isAuth: true,
                user: {
                    email: 'evanheesen@gmail.com',
                    id: 1,
                },
                status: 'done',
            })

        } else {
            // zo niet, gaan we verder met ons leven
            toggleIsAuth( {
                ...isAuth,
                status: 'done',
            });
        }
        console.log(token);



    }, [])

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


    function logIn(JWT) {
        // JWT in local storage
        localStorage.setItem('token', JWT);

        // Zorgen dat we de gebruikersdata ophalen. Nieuw GET request met decoden JWT.
        const decodedToken = jwtDecode(JWT);
        console.log(decodedToken);

        // GET request om gebruikersgegevens op te halen.
        async function getUserData(e) {
            e.preventDefault();
            const idUser = decodedToken.sub;

            try {
                const userData = await axios.get(`http://localhost:3000/600/users/${idUser}`,
                    {"Authorization": "Bearer xxx.xxx.xxx",
                    });

                console.log(userData);
            } catch (e) {
                console.error(e);
            }
        }

        // Gebruikersdata in de state plaatsen
        toggleIsAuth({
            ...isAuth,
            isAuth: true,
            user: {
                email: decodedToken.email,
                id: decodedToken.sub,
            }
        });

        // console.log(isAuth.user);
        console.log(`Je bent ingelogd!`)
        history.push("/profile");
    }

    //4. Data maken die voor iedereen beschikbaar is
    const contextAuth = {
        isAuth: isAuth.isAuth,
        user: isAuth.user.email,
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