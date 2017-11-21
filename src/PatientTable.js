import React, {Component} from 'react';
import RefreshIndicatorLoading from "./RefreshIndicatorLoading";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui";

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

                    <Table height={(parseInt(this.props.height)-70)+'px'}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Use Auth ID</TableHeaderColumn>
                                <TableHeaderColumn>First Name</TableHeaderColumn>
                                <TableHeaderColumn>Last Name</TableHeaderColumn>
                                <TableHeaderColumn>Birth Date</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.props.users.slice(0).map(user => (
                                <TableRow key={user.id} onClick={this.onRowClick} onRowClick={this.onRowClick} onCellClick={this.onRowClick}>
                                    <TableRowColumn onClick={this.onRowClick}>{user.id}</TableRowColumn>
                                    <TableRowColumn>{user.userAuthId}</TableRowColumn>
                                    <TableRowColumn>{user.firstName}</TableRowColumn>
                                    <TableRowColumn>{user.lastName}</TableRowColumn>
                                    <TableRowColumn>{user.birthDate[1]}/{user.birthDate[2]}/{user.birthDate[0]}</TableRowColumn>
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