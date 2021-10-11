import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {useForm} from 'react-hook-form';

function SignIn() {

    const { logIn } = useContext(AuthContext);
    const {register, handleSubmit} = useForm();

    function onSubmit(data) {
        logIn(data);
        console.log(data)
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form
      onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset>
            <label htmlFor="email">
                Emailadres:
                <input
                    className="inputField"
                    type="email"
                    id="email"
                    {...register("email")}
                />
            </label>
            <label htmlFor="password">
                Wachtwoord:
                <input
                    className="inputField"
                    type="password"
                    id="password"
                    {...register("password")}
                />
            </label>

        <button
        type="submit"
        label="login-button"
        value={true}
        {...register("isAuth")}
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