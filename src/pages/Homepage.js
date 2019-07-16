import React from "react";
import Assigned from "../components/Homepage/Assigned";
// import Search from "../components/Homepage/Search";
// import styled from "styled-components";
import "../assets/styles/Homepage.scss";
export default function Homepage() {
    // const Container = styled.div`
    //     padding-top: 40px;
    // `;

    return (
        <div className="container-fluid">
            <Assigned />
            {/* <Search /> */}
        </div>
    );
}
