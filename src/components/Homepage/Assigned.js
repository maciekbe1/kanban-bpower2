import React, { useContext, useState, useEffect } from "react";
import { getToken } from "../../components/api";
// import sha256 from "js-sha256";
import axios from "axios";
import Context from "../../context";
// import parse from "html-react-parser";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../containers/colors";

export default function Assigned() {
    const context = useContext(Context);
    // const login = "jacek.rakoczy"
    const login = process.env.REACT_APP_LOGIN;
    // const password = sha256("Jacek2018");
    const password = process.env.REACT_APP_PASSWORD;
    const userdata = btoa(`${login}:${password}`);
    const [tasks, setTasks] = useState([]);
    // const [taskCard, setTaskCard] = useState(0);

    useEffect(() => {
        getToken(userdata).then(res => {
            const token = res.data.token.split(".");
            const userId = JSON.parse(atob(token[1]));
            // console.log(userId.userId);
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
    // console.log(tasks);
    const Container = styled.div`
        -webkit-box-shadow: 0px 18px 228px -42px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 18px 228px -42px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 18px 228px -42px rgba(0, 0, 0, 0.75);
    `;
    return (
        <div className="assigned">
            <div className="row mb-4">
                <div className="col-sm-4">
                    <h1 className="">Assigned</h1>
                </div>
                <div className="col-sm-6">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <label
                                className="input-group-text"
                                htmlFor="inputGroupSelect01"
                            >
                                Sprint
                            </label>
                        </div>
                        <select
                            className="custom-select"
                            id="inputGroupSelect01"
                        >
                            {context.state.sprints.map((item, index) => {
                                return <option key={index}>{item}</option>;
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="list-group" id="list-tab" role="tablist">
                        {tasks.map((item, index) => {
                            // if (item.status.name !== "Done") {
                            return (
                                <a
                                    key={index}
                                    // onClick={() => cardSetter(index)}
                                    className={`${
                                        index === 0
                                            ? `list-group-item list-group-item-action active ${
                                                  item.status.name === "Done"
                                                      ? "line-through"
                                                      : null
                                              }`
                                            : `list-group-item list-group-item-action ${
                                                  item.status.name === "Done"
                                                      ? "line-through"
                                                      : null
                                              }`
                                    }`}
                                    id={`list-${item.id}-list`}
                                    data-toggle="list"
                                    href={`#list-${item.id}`}
                                    role="tab"
                                    aria-controls={`${item.id}`}
                                >
                                    {item.id + " - " + item.name}
                                </a>
                            );
                            // }
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
                                    id={`list-${task.id}`}
                                    role="tabpanel"
                                    aria-labelledby={`list-${task.id}-list`}
                                >
                                    <div className="card-task-description">
                                        <h4>{task.status.name}</h4>
                                        {/* <p>{parse(task.description).text}</p> */}
                                        <p>
                                            <strong>Created by: </strong>
                                            {task.user_id_createdby.f_name +
                                                " " +
                                                task.user_id_createdby.l_name}
                                        </p>
                                        <p>
                                            <strong>Contact: </strong>
                                            {task.user_id_createdby.email}
                                        </p>
                                        <Link to={`/kanban/${task.id}`}>
                                            Check
                                        </Link>
                                    </div>
                                </Div>
                            );
                            // }
                        })}
                    </Container>
                </div>
            </div>
        </div>
    );
}
