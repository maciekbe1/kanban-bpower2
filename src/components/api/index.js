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
export const getTasks = async user => {
    const login = process.env.REACT_APP_LOGIN;
    const password = process.env.REACT_APP_PASSWORD;
    const userdata = btoa(`${login}:${password}`);
    const taskPerformer = getToken(userdata).then(res => {
        const token = res.data.token.split(".");
        const userId = JSON.parse(atob(token[1]));
        const performer = `https://b2ng.bpower2.com/restApi/tasks/method/byName/parameters/{"projectId":"default","searchBy":{"performer": ${
            userId.userId
        }}}
        `;
        const creator = `https://b2ng.bpower2.com/restApi/tasks/method/byName/parameters/{"projectId":"default","searchBy":{"user_id_createdby": ${
            userId.userId
        }}}
        `;
        const all = `https://b2ng.bpower2.com/restApi/tasks/method/byName/parameters/{"projectId":"default","searchBy": {"performer": ${
            userId.userId
        }, "user_id_createdby": ${userId.userId}}}
        `;
        const result = axios({
            method: "get",
            url:
                user.toLowerCase() === "performer"
                    ? performer
                    : user.toLowerCase() === "creator"
                    ? creator
                    : all,
            headers: {
                Authorization: res.data.token
            }
        }).then(res => {
            return res;
        });
        return result;
    });
    return await taskPerformer;
};
