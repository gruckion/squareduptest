import React from "react";
import { CircularProgress } from "@material-ui/core";
import "../styles/progress.scss";

const Progress = () => {
    return (
        <div className="progress-container">
            <CircularProgress className="bob" color="primary" />
        </div>
    );
};

export { Progress };
