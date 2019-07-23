import { createContext } from "react";
import dataColumns from "./data-columns.json";
const Context = createContext({
    columns: dataColumns,
    sprints: ["B2WNG-2019-06-01", "B2WNG-2019-06-02", "B2WNG-2019-07-01"]
    // columns: {
    //     "column-1": {
    //         id: "column-1",
    //         title: "To do",
    //         taskIds: ["task-1", "task-2", "task-3", "task-4"]
    //     }
    // },
    // columnOrder: ["column-1"]
});

export default Context;
