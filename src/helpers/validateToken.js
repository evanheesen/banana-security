function validateToken(decodedToken) {
    const expDateToken = decodedToken.exp * 1000;
    const dateNow = Date.now();

    if (expDateToken > dateNow) {
        return true
    } else {
        return false;
    }
}

export default validateToken;