import React, { useContext, useState, useEffect } from "react";
import { getTasks } from "../components/api";
import Context from "../context";
import Column from "../components/Kanban/Column";
import "../assets/styles/Kanban.scss";

export default function Kanban() {
    const context = useContext(Context);
    const columns = context.state.columns;
    const [tasks, setTasks] = useState([]);
    const [userType, setUserType] = useState("performer");
    const user = ["Performer", "Creator", "All"];
    useEffect(() => {
        getTasks(userType).then(res => {
            setTasks(res.data.default);
        });
    }, [userType]);
    const onItemSelect = e => {
        setUserType(e.target.value);
    };
    return (
        <div className="kanban">
            {/* <h4> */}
            {/* <select>
                    {context.state.sprints.map((item, index) => {
                        return <option key={index}>{item}</option>;
                    })}
                </select> */}

            {/* </h4> */}
            <div className="d-flex">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://b2ng.bpower2.com/index.php/messages/user/TaskKanban"
                    className="btn btn-secondary my-4"
                    role="button"
                >
                    Go to Bpower2
                </a>
                <div className="input-group my-4">
                    <div className="input-group-prepend">
                        <label
                            className="input-group-text"
                            htmlFor="inputGroupSelect01"
                        >
                            Filter by:
                        </label>
                    </div>
                    <select
                        value={userType}
                        onChange={onItemSelect}
                        className="custom-select"
                        id="inputGroupSelect01"
                    >
                        {user.map((item, index) => {
                            return <option key={index}>{item}</option>;
                        })}
                    </select>
                </div>
            </div>
            <div className="column-wraper">
                {columns.map((column, index) => {
                    return <Column key={index} column={column} tasks={tasks} />;
                })}
            </div>
        </div>
    );
}
