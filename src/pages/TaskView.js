import React, { useState, useEffect } from "react";
import { getToken } from "../components/api";
// import sha256 from "js-sha256";
import axios from "axios";
import styled from "styled-components";

import { dateConverter } from "../containers/date";
// import parse from "html-react-parser";
//.replace(/<(.|\n)*?>/g, "")
import Markdown from "markdown-to-jsx";

export default function TaskView(props) {
    const login = process.env.REACT_APP_LOGIN;
    const password = process.env.REACT_APP_PASSWORD;
    const userdata = btoa(`${login}:${password}`);
    const id = props.match.params.id;
    // const context = useContext(Context);
    const [task, setTask] = useState([]);
    // const Container = styled.div`
    //     padding-top: 40px;
    //     margin-left: ${context.state.sitebar ? "360px" : "330px"};
    // `;
    useEffect(() => {
        getToken(userdata).then(res => {
            // const token = res.data.token.split(".");
            axios({
                method: "get",
                url: `https://b2ng.bpower2.com/restApi/tasks/method/byName/parameters/
                {"projectId":"default","searchBy":{"id":${id}}}`,
                headers: {
                    Authorization: res.data.token
                }
            }).then(res => {
                // console.log(res);
                const filter = res.data.byName.filter(task => {
                    return task.id === id;
                });
                setTask(filter[0]);
            });
        });
    }, [userdata, id]);
    // console.log(task.description);
    const Status = styled.h3`
        display: inline-block;
        background: #e6e6e6;
        color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.125);
        padding: 5px;
        border-radius: 5px;
    `;
    const Paragraph = styled.p`
        margin: 0;
    `;
    const Description = styled.div`
        margin: 20px 0;
        border-top: 1px solid lightgrey;
        padding-top: 10px;
    `;
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-9 mt-4">
                    <p>
                        <strong>Task id: </strong>
                        {task.id}
                    </p>
                    <h1>{task.name}</h1>
                    <Description>
                        {/* <iframe >
                            {task.description ? task.description : null}
                        </iframe> */}
                        {task.description ? (
                            <Markdown options={{ overrides: { "<o:p>": "p" } }}>
                                {task.description}
                            </Markdown>
                        ) : null}
                    </Description>
                </div>
                <div className="col-sm-3 mt-4">
                    <div className="mb-4">
                        <Paragraph className="text-secondary mb-2">
                            STATUS:
                        </Paragraph>
                        <Status className="d-inline-block bg-secondary">
                            {task.status
                                ? task.status.name === ""
                                    ? "No status"
                                    : task.status.name
                                : null}
                        </Status>
                    </div>

                    <div className="mb-4">
                        <Paragraph className="text-secondary">
                            CREATED BY
                        </Paragraph>
                        <p>
                            {task.user_id_createdby
                                ? task.user_id_createdby.f_name +
                                  " " +
                                  task.user_id_createdby.l_name
                                : null}
                        </p>
                    </div>
                    <div className="mb-4">
                        <Paragraph className="text-secondary">
                            PERFORMER
                        </Paragraph>
                        {task.performer
                            ? task.performer.f_name +
                              " " +
                              task.performer.l_name
                            : null}
                    </div>
                    {task.start_date !== "0000-00-00 00:00:00" &&
                    task.start_date !== "" &&
                    task.start_date !== null ? (
                        <div className="mb-4">
                            <Paragraph className="text-secondary">
                                START DATE
                            </Paragraph>
                            <p>{dateConverter(task.start_date)}</p>
                        </div>
                    ) : null}
                    {task.due_date ? (
                        <div className="mb-4">
                            <Paragraph className="text-secondary">
                                DUE DATE
                            </Paragraph>
                            <p>{dateConverter(task.due_date)}</p>
                        </div>
                    ) : null}
                    {task.ssr_updated ? (
                        <div className="mb-4">
                            <Paragraph className="text-secondary">
                                UPDATED AT
                            </Paragraph>
                            <p>{dateConverter(task.ssr_updated)}</p>
                        </div>
                    ) : null}
                    {task.working_time_estimation ? (
                        <div className="mb-4">
                            <Paragraph className="text-secondary">
                                ESTIMATION
                            </Paragraph>
                            <p>{task.working_time_estimation}</p>
                        </div>
                    ) : null}
                    {task.time_consuming ? (
                        <div className="mb-4">
                            <Paragraph className="text-secondary">
                                TIME CONSUMING
                            </Paragraph>
                            <p>{task.time_consuming}</p>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
