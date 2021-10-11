import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {useForm} from 'react-hook-form';

function SignIn() {

    const { logIn } = useContext(AuthContext);
    const {handleSubmit} = useForm();

    function onSubmit(data) {
        logIn(data);
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form
      onSubmit={handleSubmit(onSubmit)}
      >
        <p>*invoervelden*</p>

          <input></input>

        <button
        type="submit"
        label="login-button"
        >
            Inloggen
        </button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;