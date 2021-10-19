import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {

    const {user} = useContext(AuthContext);
    const [privateContent, setPrivateContent] = useState({
        data: {},
    });

    // persist on refresh
    useEffect(() => {
        const token = localStorage.getItem('token'); // checken of we een token hebben
        const source = axios.CancelToken.source();
        console.log("Context wordt gerefresht")

        if (token) { // als er een token is, dan op basis van de gegevens de gebruikersdata ophalen
            getPrivateContent(token, source);

            return function cleanup() {
                source.cancel();
            }

        } else { // zo niet, gaan we verder met ons leven
            setPrivateContent({});
        }

    }, [])

    async function getPrivateContent(token, source) {

        try {
            const result = await axios.get('http://localhost:3000/660/private-content',
                {
                    cancelToken: source.token,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
            console.log(result)

            setPrivateContent({
                ...privateContent,
                data: {
                    title: result.data.title,
                    content: result.data.content,
                },
            });

        } catch (e) {
            console.error(e.response.data);
        }
    }

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </section>
            {privateContent ?
                <section>
                    <h2>Strikt geheime profiel-content</h2>
                    <h3>{privateContent.data.title}</h3>
                    <p>{privateContent.data.content}</p>
                </section>
                : ""}
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;