import React from "react";
import AssignedPerformer from "./AssignedPerformer";
import AssignedCreator from "./AssignedCreator";
import styled from "styled-components";
export default function Assigned() {
    const AssignedTab = styled.ul`
        margin-bottom: 1rem;
    `;
    return (
        <div className="assigned">
            <div className="row mb-4">
                <div className="col-sm-4">
                    <h1 className="my-4">Assigned</h1>
                </div>
                <div className="col-sm-6 d-flex align-items-center justify-content-end">
                    <h5>
                        User:{" "}
                        <span className="badge badge-secondary my-4">
                            Jacek Rakoczy
                        </span>
                    </h5>
                </div>
            </div>

            <AssignedTab
                className="nav nav-pills"
                id="pills-tab"
                role="tablist"
            >
                <li className="nav-item">
                    <a
                        className="nav-link active"
                        id="performer-tab"
                        data-toggle="pill"
                        href="#performer"
                        role="tab"
                        aria-controls="performer"
                        aria-selected="true"
                    >
                        Performer
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        id="creator-tab"
                        data-toggle="pill"
                        href="#creator"
                        role="tab"
                        aria-controls="creator"
                        aria-selected="false"
                    >
                        Creator
                    </a>
                </li>
            </AssignedTab>
            <div className="tab-content" id="myTabContent">
                <div
                    className="tab-pane fade show active"
                    id="performer"
                    role="tabpanel"
                    aria-labelledby="performer-tab"
                >
                    <AssignedPerformer />
                </div>
                <div
                    className="tab-pane fade"
                    id="creator"
                    role="tabpanel"
                    aria-labelledby="creator-tab"
                >
                    <AssignedCreator />
                </div>
            </div>
        </div>
    );
}
