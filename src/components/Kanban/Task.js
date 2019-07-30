import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../containers/colors";
export default function Task(props) {
    const [instance, setInstance] = useState("");
    const getColor = Object.keys(colors).map(item => {
        if (item === props.task.priority.name) {
            return colors[props.task.priority.name];
        }
        return null;
    });
    const Priority = styled.div`
        border-radius: 5px;
        width: 50px;
        height: 10px;
        background: ${getColor};
    `;

    // if (props.task.workflowInstanceData.activeStepId === "242710") {
    //     console.log(props.task.name);
    //     console.log(props.task.workflowInstanceData);

    // }
    // console.log(props.userType);
    // console.log(props.task.name);
    // console.log(props.task.workflowInstanceData);
    // console.log(props.task.workflowInstanceData.activeStepId);

    useEffect(() => {
        if (props.userType.toLowerCase() === "performer") {
            setInstance(props.task.workflowInstanceData.activeStepId);
        }
        if (props.userType.toLowerCase() === "creator") {
            setInstance(props.task.workflowInstanceData.instanceId);
        }
    }, [props]);
    return (
        <Container>
            <div className="d-flex justify-content-between">
                <Priority />
                <Paragraph>{props.task.priority.name}</Paragraph>
            </div>

            <Title>{props.task.name}</Title>
            <div className="d-flex mt-2 justify-content-between">
                <Paragraph>
                    {props.task.user_id_createdby.f_name +
                        " " +
                        props.task.user_id_createdby.l_name}
                </Paragraph>
                <Link className="task-link" to={`/kanban/${props.task.id}`}>
                    <i className="fa fa-arrow-circle-right" />
                </Link>
            </div>
            {instance ? (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    href={`https://b2ng.bpower2.com/index.php/workflow/userTask/view/id/${instance}`}
                >
                    Go to instance
                </a>
            ) : null}
            {/* 
            <Paragraph className="text-secondary">{props.task.id}</Paragraph> */}
        </Container>
    );
}
const Container = styled.div`
    border: 1px solid #a9a9a9;
    border-radius: 5px;
    padding: 8px;
    margin-bottom: 8px;
    background: #fff;
`;
const Title = styled.div`
    font-size: 16px;
    font-weight: bold;
`;
const Paragraph = styled.p`
    font-size: 15px;
    margin: 0;
`;
