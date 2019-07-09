import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../assets/styles/Navbar.scss";
import { Slider } from "react-burgers";

export default function Navbar() {
    return (
        <div className="navigation bg-light">
            <Link className="navbar-brand" to="/">
                <img alt="logo" className="logo" src={logo} />
            </Link>
        </div>
    );
}
