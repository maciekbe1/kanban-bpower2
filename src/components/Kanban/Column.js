import React from "react";
import styled from "styled-components";
import Task from "./Task";
// import { Droppable } from "react-beautiful-dnd";
const Container = styled.div`
    border: 1px solid #ccc;
    border-radius: 2px;
    background: #e3e4e6;
`;
const Title = styled.h5`
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
