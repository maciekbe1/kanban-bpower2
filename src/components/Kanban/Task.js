import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../containers/colors";
export default function Task(props) {
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

            {/* 
            <Paragraph className="text-secondary">{props.task.id}</Paragraph> */}
        </Container>
    );
}
