import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from "axios";

function SignUp() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const history = useHistory();
    const source = axios.CancelToken.source();

    async function onSubmit(data) { // wachten op data, dus daarom asynchrome functie

        console.log(data)

        try {
            const result = await axios.post('http://localhost:3000/register', {
                cancelToken: source.token,
                email: data.email,
                username: data.username,
                password: data.password,
            });
            console.log(result)
            history.push("/signin")

            return function cleanup() {
                source.cancel();
            }

        } catch (e) {
            console.error(e.response.data);
        }
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
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
                            {...register("email", {
                                required: "Emailadres invullen is  verplicht",
                                minLength: {
                                    value: 6,
                                    message: "Het emailadres moet minimaal minstens 6 tekens bevatten",
                                }
                                },
                            )}
                        />
                    {errors.email && <p className="error-text">{errors.email.message}</p> }
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