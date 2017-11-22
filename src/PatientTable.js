import React, {Component} from 'react';
import RefreshIndicatorLoading from "./RefreshIndicatorLoading";
import {
    FloatingActionButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
    TableRowColumn
} from "material-ui";
import {ActionAssignment} from "material-ui/svg-icons";

class PatientTable extends Component {

    onRowClick(){
        console.log('row click');
    }

    render() {
        // console.log('state:', this.state);
        console.log('props:', this.props);
        // const { width, height } = this.props.size;
        return (
            <div key={this.props.key}>
                {this.props.users.length === 0 ?
                    <RefreshIndicatorLoading/> :

                    <Table
                        // height={(parseInt(this.props.height)-70)+'px'}
                        // width="100%"
                        style={{whiteSpace: 'wrap'}}
                    >
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn style={{width: '10%', whiteSpace: 'nowrap'}}>ID</TableHeaderColumn>
                                <TableHeaderColumn style={{whiteSpace: 'wrap'}}>Use Auth ID</TableHeaderColumn>
                                <TableHeaderColumn>First Name</TableHeaderColumn>
                                <TableHeaderColumn>Last Name</TableHeaderColumn>
                                <TableHeaderColumn>Birth Date</TableHeaderColumn>
                                <TableHeaderColumn>Actions</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.props.users.slice(0).map(user => (
                                <TableRow key={user.id}>
                                    <TableRowColumn style={{width: '10%', whiteSpace: 'nowrap'}} onClick={this.onRowClick}>{user.id}</TableRowColumn>
                                    <TableRowColumn style={{whiteSpace: 'wrap'}}>{user.userAuthId}</TableRowColumn>
                                    <TableRowColumn>{user.firstName}</TableRowColumn>
                                    <TableRowColumn>{user.lastName}</TableRowColumn>
                                    <TableRowColumn>{user.birthDate[1]}/{user.birthDate[2]}/{user.birthDate[0]}</TableRowColumn>
                                    <TableRowColumn>
                                        <FloatingActionButton mini={true} onClick={() => this.props.onClick(user, 'table')}>
                                            {/*<span>Consents</span>*/}
                                            <ActionAssignment/>
                                        </FloatingActionButton>
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>


                }


            </div>

        );
    }
}

export default PatientTable;