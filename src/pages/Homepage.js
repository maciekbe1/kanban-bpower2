import React, { useContext } from "react";
import Assigned from "../components/Homepage/Assigned";
import styled from "styled-components";
import Context from "../context";
export default function Homepage() {
    const context = useContext(Context);
    const Container = styled.div`
        padding-top: 40px;
        margin-left: ${context.state.sitebar ? "360px" : "130px"};
    `;

    return (
        <Container>
            <Assigned />
        </Container>
    );
}
