import React from "react";
import {Redirect, Route} from "react-router-dom";

function PrivateRoute({ isAuth, children, ...rest }) {
    return (
        <Route {...rest}>
            {isAuth ? children : <Redirect to="/" />}
        </Route>
    );
}

export default PrivateRoute;