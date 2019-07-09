import axios from "axios";

export const getToken = async userData => {
    return await axios({
        method: "post",
        url: "https://b2ng.bpower2.com/index.php/restApi/generateJWT",
        headers: {
            "Content-Type": "application/json",
            "X-PINGOTHER": "pingpong"
        },
        data: {
            "user-key": userData
        }
    });
};
