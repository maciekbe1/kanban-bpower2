import React, { useContext, useReducer } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Context from "./context";
import reducer from "./reducer";
import "./assets/styles/Global.scss";
// import styled from "styled-components";
import Homepage from "./pages/Homepage";
import Kanban from "./pages/Kanban";
import TaskView from "./pages/TaskView";

// import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
// import Footer from "./components/Footer";
function App() {
    const initialState = useContext(Context);
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider value={{ state, dispatch }}>
            <BrowserRouter>
                <Sidebar />
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={render => <Homepage {...render} />}
                    />
                    <Route path="/kanban/:id" component={TaskView} />
                    <Route path="/kanban" component={Kanban} />
                </Switch>
                {/* <Footer /> */}
            </BrowserRouter>
        </Context.Provider>
    );
}

export default App;
