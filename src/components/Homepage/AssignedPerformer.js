import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../containers/colors";
import { getToken } from "../api";
import axios from "axios";

export default function AssignedPerformer() {
    const Container = styled.div`
        -webkit-box-shadow: 0px 18px 228px -42px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 18px 228px -42px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 18px 228px -42px rgba(0, 0, 0, 0.75);
    `;

    const login = process.env.REACT_APP_LOGIN;
    const password = process.env.REACT_APP_PASSWORD;
    const userdata = btoa(`${login}:${password}`);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getToken(userdata).then(res => {
            const token = res.data.token.split(".");
            const userId = JSON.parse(atob(token[1]));
            axios({
                method: "get",
                url: `https://b2ng.bpower2.com/restApi/tasks/method/byName/parameters/{"projectId":"default","searchBy":{"performer": ${
                    userId.userId
                }}}
                `,
                headers: {
                    Authorization: res.data.token
                }
            })
                .then(res => {
                    let arrayTask = [];
                    res.data.map(task => {
                        if (task.status.name) {
                            arrayTask.push(task);
                        }
                        return null;
                    });
                    setTasks(arrayTask);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }, [userdata]);
    if (isLoading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="row">
                <div className="col-sm-4">
                    <div className="list-group" id="list-tab" role="tablist">
                        {tasks.map((item, index) => {
                            return (
                                <a
                                    key={index}
                                    className={`${
                                        index === 0
                                            ? `list-group-item list-group-item-action active ${
                                                  item.status.name === "Done"
                                                      ? "line-through"
                                                      : ""
                                              }`
                                            : `list-group-item list-group-item-action ${
                                                  item.status.name === "Done"
                                                      ? "line-through"
                                                      : ""
                                              }`
                                    }`}
                                    id={`list-${item.id}-list-2`}
                                    data-toggle="list"
                                    href={`#list-${item.id}-2`}
                                    role="tab"
                                    aria-controls={`${item.id}-2`}
                                >
                                    {item.id + " - " + item.name}
                                </a>
                            );
                        })}
                    </div>
                </div>
                <div className="col-sm-6">
                    <Container
                        className="tab-content list-group-item"
                        id="nav-tabContent"
                    >
                        {tasks.map((task, index) => {
                            const getColor = Object.keys(colors).map(color => {
                                if (color === task.priority.name) {
                                    return colors[task.priority.name];
                                }
                                return null;
                            });
                            const Div = styled.div`
                                border-right: 4px solid ${getColor};
                            `;
                            return (
                                <Div
                                    key={index}
                                    className={
                                        index === 0
                                            ? "tab-pane fade show active"
                                            : "tab-pane fade show"
                                    }
                                    id={`list-${task.id}-2`}
                                    role="tabpanel"
                                    aria-labelledby={`list-${task.id}-list-2`}
                                >
                                    <div className="card-task-description">
                                        <h4>{task.status.name}</h4>
                                        {/* <p>{parse(task.description).text}</p> */}
                                        <p>
                                            <strong>Created by: </strong>
                                            {task.user_id_createdby
                                                ? task.user_id_createdby
                                                      .f_name +
                                                  " " +
                                                  task.user_id_createdby.l_name
                                                : null}
                                        </p>
                                        <p>
                                            <strong>Performer: </strong>
                                            {task.performer
                                                ? task.performer.f_name +
                                                  " " +
                                                  task.performer.l_name
                                                : null}
                                        </p>
                                        <p>
                                            <strong>Contact: </strong>
                                            {task.user_id_createdby
                                                ? task.user_id_createdby.email
                                                : null}
                                        </p>
                                        <p>
                                            <strong>Updated at: </strong>
                                            {task.ssr_updated}
                                        </p>
                                        <Link to={`/kanban/${task.id}`}>
                                            Check
                                        </Link>
                                    </div>
                                </Div>
                            );
                        })}
                    </Container>
                </div>
            </div>
        );
    }
}
