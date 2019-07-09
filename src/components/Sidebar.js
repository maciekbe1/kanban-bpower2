import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/logo.png";
import logo2 from "../assets/images/logo_bpower.png";
import "../assets/styles/Navbar.scss";
import Context from "../context";

export default function Sidebar() {
    const { dispatch } = useContext(Context);
    const [active, setActive] = useState(false);
    // const [showText, setShowText] = useState(false);

    const burgerActive = () => {
        dispatch({ type: "SITEBAR_ACTIVE", payload: !active });
        setActive(!active);
    };
    const Sidebar = styled.div`
        width: 70px;
    `;
    const Img = styled.img`
        height: 65px;
    `;
    return (
        <div>
            <Sidebar className="sidebar">
                <Link className="navbar-brand" to="/">
                    <Img alt="logo" className="logo" src={logo} />
                </Link>

                <NavLink
                    exact={true}
                    className=""
                    activeClassName="active"
                    to="/"
                >
                    <div className="sidebar-link">
                        <div className="sidebar-box">
                            <div className="sidebar-icon">
                                <i className="fa fa-home" />
                            </div>
                            {/* <div
                                className={showText ? "sidebar-text" : "d-none"}
                            >
                                <p>Panel</p>
                            </div> */}
                        </div>
                    </div>
                </NavLink>
                <NavLink
                    exact={true}
                    className=""
                    activeClassName="active"
                    to="/kanban"
                >
                    <div className="sidebar-link">
                        <div className="sidebar-box">
                            <div className="sidebar-icon">
                                <i className="fa fa-tasks" />
                            </div>
                            {/* <div
                                className={showText ? "sidebar-text" : "d-none"}
                            >
                                <p>Panel</p>
                            </div> */}
                        </div>
                    </div>
                </NavLink>
            </Sidebar>
            <div
                className={
                    active
                        ? "sidebar-next sidebar-wide"
                        : "sidebar-next sidebar-narrow"
                }
            >
                {active ? (
                    <i
                        onClick={burgerActive}
                        className="fa fa-arrow-circle-left"
                    />
                ) : (
                    <i onClick={burgerActive} className="fa fa-bars" />
                )}
                <div className="sidebar-next-container">
                    <img
                        alt="logo2"
                        className="sidebar-next-logo"
                        src={logo2}
                    />
                </div>
            </div>
        </div>
    );
}
