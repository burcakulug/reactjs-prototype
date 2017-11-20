import React, {Component} from 'react';
import './PatientList.css';
import {
    List,
    ListItem,
    RefreshIndicator, Subheader, Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
    TableRowColumn
} from "material-ui";
import RefreshIndicatorLoading from "./RefreshIndicatorLoading";


class PatientList extends Component {
    // constructor(props){
    //     super(props);
    //     const users = this.getUsers();
    //     console.log(users);
    //     this.state = {users: users};
    // }
    state = {users: []};

    // async componentDidMount(){
    //     const users = await this.getUsers();
    //     this.setState({users: users})
    //     // console.log(JSON.stringify(this.state));
    // }
    // getUsers(){
    //     const users= fetch("/users")
    //         .then(resp => resp.json())
    //         .then(json => json.content)/*
    //         .then(json => {
    //             console.log(json);
    //             return json;
    //         })*/;
    //     return users;
    // }

    render() {
        // console.log('state:', this.state);
        // console.log('props:', this.props);
        // const { width, height } = this.props.size;
        return (
            <div key={this.props.key} >
                {this.props.users.length === 0 ?
                    <RefreshIndicatorLoading /> :


                    <List>
                    <Subheader>Users</Subheader>
                        {this.props.users.map(user => (
                            <ListItem key={user.id}
                                primaryText={user.firstName + ' ' + user.lastName}
                                secondaryText={'Birth Date' + user.birthDate[1] + '/' + user.birthDate[2] + '/' + user.birthDate[0]}
                            />
                        ))}

                    </List>


                }


            </div>

        );
    }
}

export default PatientList;
