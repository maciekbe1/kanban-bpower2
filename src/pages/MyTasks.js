import React, { useContext, useState, useEffect } from "react";
import { getToken } from "../api";
import sha256 from "js-sha256";
import axios from "axios";
import Context from "../../context";

export default function MyTasks() {
    const context = useContext(Context);
    const login = "maciej.bednarczyk";
    const password = sha256("12345");
    const userdata = btoa(`${login}:${password}`);
    const columns = context.state.columns;
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        getToken(userdata).then(res => {
            const token = res.data.token.split(".");
            const userId = JSON.parse(atob(token[1]));
            // console.log(res.data.token);
            axios({
                method: "get",
                url: `https://b2ng.bpower2.com/restApi/tasks?parameters={"searchBy":{"performer":${
                    userId.userId
                } }}`,
                headers: {
                    Authorization: res.data.token
                }
            }).then(res => {
                console.log(res.data);
                setTasks(res.data);
            });
        });
    }, [userdata]);
    return (
        <div>
            {columns.map((columnName, index) => {
                return (
                    <div className="kanban-column" key={index}>
                        <div>
                            <span>{columnName}</span>
                        </div>
                        <div className="kanban-task">
                            {tasks.map((task, index) => {
                                if (task.status.name === columnName) {
                                    return <div key={index}>{task.name}</div>;
                                }
                                return null;
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
