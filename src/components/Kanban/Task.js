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
    const Container = styled.div`
        border: 1px solid #fff;
        border-radius: 2px;
        padding: 8px;
        margin-bottom: 8px;
        background: #fff;
        border-left: 4px solid ${getColor};
        -webkit-box-shadow: 0px 18px 228px -42px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 18px 228px -42px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 18px 228px -42px rgba(0, 0, 0, 0.75);
    `;
    const Title = styled.div`
        font-size: 16px;
        font-weight: bold;
    `;
    const Paragraph = styled.p`
        font-size: 12px;
        margin: 10px 0;
    `;
    return (
        <Container>
            <Title>
                <Link to={`/kanban/${props.task.id}`}>{props.task.name}</Link>
            </Title>
            <Paragraph>{props.task.priority.name}</Paragraph>
            <Paragraph>
                {props.task.user_id_createdby.f_name +
                    " " +
                    props.task.user_id_createdby.l_name}
            </Paragraph>
            <Paragraph className="text-secondary">{props.task.id}</Paragraph>
        </Container>
    );
}