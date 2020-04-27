import React from "react";
import { Weather } from "./weather/components";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import lightGreen from "@material-ui/core/colors/lightGreen";
import green from "@material-ui/core/colors/green";
import "./App.css";

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: lightGreen,
    },
});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <ToastContainer
                    autoClose={5000}
                />
                <Weather />
            </ThemeProvider>
        </div>
    );
}

export { App };
