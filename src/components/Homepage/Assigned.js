import React, { useContext, useState, useEffect } from "react";
import { getToken } from "../../components/api";
import sha256 from "js-sha256";
import axios from "axios";
import Context from "../../context";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Assigned() {
    const context = useContext(Context);
    const login = "maciej.bednarczyk";
    const password = sha256("12345");
    const userdata = btoa(`${login}:${password}`);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getToken(userdata).then(res => {
            const token = res.data.token.split(".");
            const userId = JSON.parse(atob(token[1]));
            axios({
                method: "get",
                url: `https://b2ng.bpower2.com/restApi/tasks?parameters={"searchBy":{"performer":${
                    userId.userId
                } }}`,
                headers: {
                    Authorization: res.data.token
                }
            }).then(res => {
                // console.log(res.data);
                setTasks(res.data);
            });
        });
    }, [userdata]);
    return (
        <div>
            <h1>Assigned</h1>
            {/* <div>
                {tasks.map((item, index) => {
                    if (item.status.name !== "Done") {
                        return (
                            <div key={index}>
                                <Link to={`/kanban/${item.id}`}>{item.id}</Link>
                            </div>
                        );
                    }
                })}
            </div> */}
            <div className="row">
                <div className="col-4">
                    <div className="list-group" id="list-tab" role="tablist">
                        {tasks.map((item, index) => {
                            if (item.status.name !== "Done") {
                                return (
                                    <a
                                        key={index}
                                        className="list-group-item list-group-item-action"
                                        id={`${item.id}`}
                                        data-toggle={`${item.id}`}
                                        href={`#${item.id}`}
                                        role="tab"
                                        aria-controls={`${item.id}`}
                                    >
                                        {item.id}
                                    </a>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className="col-8">
                    <div className="tab-content" id="nav-tabContent">
                        {tasks.map((item, index) => {
                            if (item.status.name !== "Done") {
                                return (
                                    // <div  key={index}>
                                    <div
                                        key={index}
                                        className="tab-pane fade show active"
                                        id={`${item.id}`}
                                        role="tabpanel"
                                        aria-labelledby={`${item.id}`}
                                    >
                                        {item.status.name}
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
