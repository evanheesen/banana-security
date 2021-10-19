import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import jwtDecode from "jwt-decode";

function Profile() {

    const {email, username} = useContext(AuthContext);
    const [privateContent, setPrivateContent] = useState({
        data: {},
    });

    useEffect(() => {
        const token = localStorage.getItem('token'); // checken of we een token hebben
        console.log("Context wordt gerefresht")

        if (token) { // als er een token is, dan op basis van de gegevens de gebruikersdata ophalen
            getPrivateContent(token);
        } else { // zo niet, gaan we verder met ons leven
            setPrivateContent({});
        }

    }, [])

    async function getPrivateContent(token) {

        try {
            const result = await axios.get('http://localhost:3000/660/private-content',
                {
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
                <p><strong>Gebruikersnaam:</strong> {username}</p>
                <p><strong>Email:</strong> {email}</p>
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