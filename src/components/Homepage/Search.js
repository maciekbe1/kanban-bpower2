import React, { useEffect } from "react";
import axios from "axios";
import { getToken } from "../../components/api";

export default function Search() {
    const login = process.env.REACT_APP_LOGIN;
    const password = process.env.REACT_APP_PASSWORD;
    const userdata = btoa(`${login}:${password}`);
    useEffect(() => {}, []);
    getToken(userdata).then(res => {
        const token = res.data.token.split(".");
        const userId = JSON.parse(atob(token[1]));
        axios({
            method: "get",
            url: `https://qang.bpower2.com/restApi/tasks/method/byName/parameters/{"projectId":"default","searchBy":{"performer":${
                userId.userId
            },"user_id_createdby":${userId.userId}}}`,
            headers: {
                Authorization: res.data.token
            }
        }).then(res => {
            console.log(res);
        });
    });
    return <div />;
}
