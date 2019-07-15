import React, { useContext, useState, useEffect } from "react";
import { getToken } from "../components/api";
// import sha256 from "js-sha256";
import axios from "axios";
import Context from "../context";
import Column from "../components/Kanban/Column";
import styled from "styled-components";

export default function Kanban() {
    const context = useContext(Context);
    const login = process.env.REACT_APP_LOGIN;
    const password = process.env.REACT_APP_PASSWORD;
    const userdata = btoa(`${login}:${password}`);
    const columns = context.state.columns;
    const [tasks, setTasks] = useState([]);
    const Container = styled.div`
        padding-top: 40px;
        margin-left: ${context.state.sitebar ? "360px" : "330px"};
    `;

    useEffect(() => {
        getToken(userdata).then(res => {
            const token = res.data.token.split(".");
            const userId = JSON.parse(atob(token[1]));
            axios({
                method: "get",
                url: `https://b2ng.bpower2.com/restApi/tasks/method/byName/parameters/{"projectId":"default","searchBy":{"performer": ${
                    userId.userId
                }, "user_id_createdby": ${userId.userId}}}
                `,
                headers: {
                    Authorization: res.data.token
                }
            }).then(res => {
                // console.log(res.data);
                setTasks(res.data);
            });
        });
    }, [userdata]);
    // console.log(tasks);
    return (
        <Container>
            <h4>
                <select>
                    {context.state.sprints.map((item, index) => {
                        return <option key={index}>{item}</option>;
                    })}
                </select>
            </h4>
            <div className="row">
                {columns.map((column, index) => {
                    return <Column key={index} column={column} tasks={tasks} />;
                })}
            </div>
        </Container>
    );
}
