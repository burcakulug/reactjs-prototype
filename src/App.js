import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PatientList from "./PatientList";

class App extends Component {
    render() {
        return (
            <div className="App">
                {/*<header className="App-header">*/}
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    {/*<h1 className="App-title">Welcome to React</h1>*/}
                {/*</header>*/}
                {/*<p className="App-intro">*/}
                    {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
                {/*</p>*/}


                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <PatientList />
                </MuiThemeProvider>

            </div>
        );
    }
}

export default App;
