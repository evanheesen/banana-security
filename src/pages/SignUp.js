import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {useForm} from "react-hook-form";
import {AuthContext} from "../context/AuthContext";

function SignUp() {

    const {register, handleSubmit} = useForm();
    const { logIn, user } = useContext(AuthContext);

    function onSubmit(data) {
        logIn(data);
        console.log(data)
    }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
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
                      {...register("user")}
                  />
              </label>
              <label htmlFor="username">
                  Gebruikersnaam:
                  <input
                      className="inputField"
                      type="text"
                      id="username"
                      {...register("username")}
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
                  label="register-button"
                  value={true}
                  {...register("isAuth")}
              >
                  Registreren
              </button>
          </fieldset>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;