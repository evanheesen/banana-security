import axios from "axios";
import jwtDecode from "jwt-decode";

async function getUserData(token) {
    const decodedToken = jwtDecode(token);
    const idUser = decodedToken.sub;

    try {
        const userData = await axios.get(`http://localhost:3000/600/users/${idUser}`,
            {"Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            });

        console.log(userData + "test getUserData");
        return userData;
    } catch (e) {
        console.error(e.response.data);
    }
}

export default getUserData;