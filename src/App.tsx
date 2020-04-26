import React from 'react';
import './App.css';
import { Weather } from './weather/components';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import green from '@material-ui/core/colors/green';

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
      <Weather />
    </ThemeProvider>

    </div>
  );
}

export default App;
