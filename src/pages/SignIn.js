import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {useForm} from 'react-hook-form';
import axios from "axios";

function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logIn } = useContext(AuthContext);

    async function onSubmit(e) {
        e.preventDefault();

        try {
            const result = await axios.post('http://localhost:3000/login', {
                email: email,
                password: password,
            });
            console.log(result.data.accessToken);
            logIn(result.data.accessToken);
        } catch(e) {
            console.error(e);
        }
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form
      onSubmit={onSubmit}
      >
        <fieldset>
            <label htmlFor="email">
                Emailadres:
                <input
                    className="inputField"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label htmlFor="password">
                Wachtwoord:
                <input
                    className="inputField"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>

        <button
        type="submit"
        label="login-button"
        >
            Inloggen
        </button>
        </fieldset>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;