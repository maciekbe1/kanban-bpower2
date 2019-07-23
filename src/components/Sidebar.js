import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/logo.png";
import { getTasks } from "../components/api";
import Context from "../context";
// import logo2 from "../assets/images/logo_bpower.png";
import "../assets/styles/Navbar.scss";
// import Context from "../context";

export default function Sidebar() {
    // const { dispatch } = useContext(Context);
    const [active, setActive] = useState(false);
    // const context = useContext(Context);
    // const [showText, setShowText] = useState(false);
    const [search, setSearch] = useState("");
    const [tasks, setTasks] = useState([]);

    const burgerActive = () => {
        // dispatch({ type: "SITEBAR_ACTIVE", payload: !active });
        setActive(!active);
    };
    const Sidebar = styled.div`
        width: 70px;
    `;
    const Img = styled.img`
        height: 60px;
    `;
    const searchTask = () => {
        // getTasksByName(search).then(res => {
        //     // setTasks(res);
        //     // console.log(res);
        //     const filter = res.data.byName.filter(val => {
        //         return context.state.columns.filter(colName => {
        //             return val.status.name === colName.name;
        //         });
        //     });
        //     setTasks(filter);
        //     console.log(filter);
        // });
        getTasks("all").then(res => {
            const filter = res.data.default.filter(task => {
                return task.name.toLowerCase().includes(search);
            });
            setTasks(filter);
        });
    };
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
                        className="sitebar-burger fa fa-arrow-circle-left"
                    />
                ) : (
                    <i
                        onClick={burgerActive}
                        className="sitebar-burger fa fa-bars"
                    />
                )}
                <div className="sidebar-next-container">
                    {/* <img
                        alt="logo2"
                        className="sidebar-next-logo"
                        src={logo2}
                    /> */}
                    <div className="sidebar-next-search">
                        <div />
                        <div className="d-flex btn-group">
                            <input
                                type="text"
                                onChange={e => setSearch(e.target.value)}
                                value={search}
                            />
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={searchTask}
                                disabled={!search}
                            >
                                <i className="fa fa-search" />
                            </button>
                        </div>
                        <div>
                            {tasks.map((task, index) => {
                                return (
                                    <Link
                                        key={index}
                                        className="sidebar-search-result"
                                        to={`/kanban/${task.id}`}
                                    >
                                        {task.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
