import React, {Component} from 'react';
import './PatientListGrid.css';
import {sizeMe} from "react-sizeme";
import PatientList from "./PatientList";

const config = { monitorHeight: true , monitorWidth: true};
const sizeMeHOC = sizeMe(config);

class PatientListGrid extends Component {

    render() {
        // console.log('state:', this.state);
        // console.log('props:', this.props);
        const { width, height } = this.props.size;
        return (
            <div>
                {this.props.showSize && <span>My size is {width}px x {height}px</span> }
                {this.props.children}
                <PatientList {...this.props}/>
            </div>

        );
    }
}

export default sizeMeHOC(PatientListGrid);
