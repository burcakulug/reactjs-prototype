import React, {Component} from 'react';
import './PatientList.css';
import {
    RefreshIndicator, Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
    TableRowColumn
} from "material-ui";

const style = {
    container: {
        position: 'relative',
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
};

const RefreshIndicatorLoading = () => (
    <div style={style.container}>
        {/*<RefreshIndicator*/}
            {/*size={40}*/}
            {/*left={10}*/}
            {/*top={0}*/}
            {/*status="loading"*/}
            {/*style={style.refresh}*/}
        {/*/>*/}
        <RefreshIndicator
            size={50}
            left={70}
            top={0}
            loadingColor="#FF9800"
            status="loading"
            style={style.refresh}
        />
    </div>
);

class PatientList extends Component {
    // constructor(props){
    //     super(props);
    //     const users = this.getUsers();
    //     console.log(users);
    //     this.state = {users: users};
    // }
    state = {users: []};

    async componentDidMount(){
        const users = await this.getUsers();
        this.setState({users: users})
        console.log(JSON.stringify(this.state));
    }
    getUsers(){
        const users= fetch("/users")
            .then(resp => resp.json())
            .then(json => json.content)/*
            .then(json => {
                console.log(json);
                return json;
            })*/;
        return users;
    }

    render() {
        console.log(this.state);
        return (
            <div>
                {this.state.users.length === 0 ?
                    <RefreshIndicatorLoading /> :

                    <Table >
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
                            {this.state.users.map(user => (
                                <TableRow key={user.id}>
                                    <TableRowColumn>{user.id}</TableRowColumn>
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

export default PatientList;
