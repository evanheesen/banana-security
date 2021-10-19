function validateToken(decodedToken) {
    const expDateToken = decodedToken.exp * 1000;
    const dateNow = Date.now();

    if (expDateToken > dateNow) {
        return true
        console.log("true")
    }
    return false;
    console.log("false")
}

export default validateToken;