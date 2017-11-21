import React, {Component} from 'react';
import './ConsentList.css';
import {
    List,
    ListItem,
    RefreshIndicator, Subheader, Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
    TableRowColumn
} from "material-ui";
import RefreshIndicatorLoading from "./RefreshIndicatorLoading";


class ConsentList extends Component {
    // constructor(props){
    //     super(props);
    //     const users = this.getUsers();
    //     console.log(users);
    //     this.state = {users: users};
    // }
    // state = {consents: []};

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
         console.log('ConsentList props:', this.props);
        return (
            <div key={this.props.key} >
                {this.props.consents.length === 0 ?
                    <RefreshIndicatorLoading /> :


                    <List>
                        <Subheader>Consents</Subheader>
                        {this.props.consents.map(consent => (
                            <ListItem key={consent.id}
                                      primaryText={consent.id}
                                      // secondaryText={'Birth Date' + user.birthDate[1] + '/' + user.birthDate[2] + '/' + user.birthDate[0]}
                                      // onClick={() => this.props.onClick(user)}
                            />
                        ))}

                    </List>


                }


            </div>

        );
    }
}

export default ConsentList;
