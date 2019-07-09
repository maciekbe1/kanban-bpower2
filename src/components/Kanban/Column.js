import React from "react";
import styled from "styled-components";
import Task from "./Task";
// import { Droppable } from "react-beautiful-dnd";
const Container = styled.div`
    margin: 15px;
    border: 1px solid #ccc;
    border-radius: 2px;
    width: 12rem;
    background: #f4f5f7;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
`;
export default function Column(props) {
    // console.log(props);
    return (
        <Container>
            <Title>{props.column.name}</Title>
            <TaskList>
                {props.tasks.map((task, index) => {
                    return props.column.name === task.status.name ? (
                        <Task index={index} key={index} task={task} />
                    ) : null;
                })}
            </TaskList>
        </Container>
    );
}
