import React from "react";
import styled from "styled-components";

export default function Footer() {
    const Footer = styled.div`
        line-height: 70px;
        position: fixed;
        bottom: 0;
        right: calc(50% - 95px);
    `;
    return <Footer className="footer text-center">powered by bpower2</Footer>;
}
