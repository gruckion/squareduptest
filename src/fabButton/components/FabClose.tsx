import React from "react";
import { Fab } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "../styles/fab-close.scss";

interface FabCloseProps {
    currentWoeid: number;
    onChangeLocation: () => void;
}

const FabClose: React.FunctionComponent<FabCloseProps> = ({ currentWoeid, onChangeLocation }) => {
    return (
        <div className="float-close">
            {currentWoeid !== -1 &&
                <Fab color="default" aria-label="close" onClick={onChangeLocation}>
                    <CloseIcon htmlColor="rgb(101, 123, 61)" />
                </Fab>}
        </div>
    )
};

export { FabClose };