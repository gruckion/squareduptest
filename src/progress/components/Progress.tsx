import React from "react";
import { CircularProgress } from "@material-ui/core";
import "../styles/progress.scss";

const Progress = () => {
    return (
        <div className="progress-container">
            <CircularProgress className="progress-indicator" color="primary" />
        </div>
    );
};

export { Progress };
