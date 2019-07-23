import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/kanban_bp2.png";
import "../assets/styles/Navbar.scss";

export default function Navbar() {
    return (
        <div className="navigation">
            <Link className="navbar-brand" to="/">
                <img alt="logo" className="logo" src={logo} />
            </Link>
        </div>
    );
}
