import React, {Component} from 'react';
import './ConsentList.css';
import {
    List,
    ListItem,
    RefreshIndicator, Subheader, Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
    TableRowColumn
} from "material-ui";
import RefreshIndicatorLoading from "./RefreshIndicatorLoading";

const providerNames = ((props) =>{
    // return providers
    //     .map(provider => provider.name ? provider.name : `${provider.firstName} ${provider.lastName}`)
    //     .join(', ');
    debugger;
     return (<ul>{props.providers
        .map(provider => <li key={provider.id}>{provider.name ? provider.name : `${provider.firstName} ${provider.lastName}`}</li>)
        // .map(name => <li>{name}</li>)
        }
    </ul>);
});
class ConsentTable extends Component {
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

    // static providerNames(providers){
    //     // return providers
    //     //     .map(provider => provider.name ? provider.name : `${provider.firstName} ${provider.lastName}`)
    //     //     .join(', ');
    //     return (<ul>{providers
    //         .map(provider => provider.name ? provider.name : `${provider.firstName} ${provider.lastName}`)
    //         .map(name => <li>name</li>)
    //         .join()}
    //     </ul>);
    // }

    static displayNames(items){
        return items.map(item => item.display).join(', ');
    }

    static formatLocalDate(dateArr){
        return (dateArr && dateArr.length > 0 &&`${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`) || '---';
    }
    static formatTimestamp(timestamp){
        if(timestamp){
            const d = new Date(timestamp);
            console.log('date', d, `${d.getMonth()}/${d.getDay()}/${d.getFullYear()}`);
            return `${d.getMonth()}/${d.getDay()}/${d.getFullYear()}`;
        }
        return '---';
    }
    render() {
        // console.log('state:', this.state);
        // console.log('props:', this.props);
        // const { width, height } = this.props.size;
        console.log('ConsentList props:', this.props);
        return (
            <div key={this.props.key} >
                {this.props.consents.length === 0 ?
                    <RefreshIndicatorLoading /> :


                    <Table height={(parseInt(this.props.height)-70)+'px'}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn style={{width: '10%', whiteSpace: 'nowrap'}}>ID</TableHeaderColumn>
                                <TableHeaderColumn style={{whiteSpace: 'wrap'}}>From Providers</TableHeaderColumn>
                                <TableHeaderColumn style={{whiteSpace: 'wrap'}}>To Provider</TableHeaderColumn>
                                <TableHeaderColumn style={{whiteSpace: 'wrap'}}>Share Purposes</TableHeaderColumn>
                                <TableHeaderColumn style={{whiteSpace: 'wrap'}}>Share Categories</TableHeaderColumn>
                                <TableHeaderColumn>Start Date</TableHeaderColumn>
                                <TableHeaderColumn>End Date</TableHeaderColumn>
                                <TableHeaderColumn>Sign Date</TableHeaderColumn>
                                <TableHeaderColumn>Revoke Date</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                        {this.props.consents.map(consent => (
                            <TableRow key={consent.id}>
                                <TableRowColumn style={{width: '10%', whiteSpace: 'nowrap'}}>{consent.id}</TableRowColumn>
                                <TableRowColumn style={{whiteSpace: 'wrap'}}>{providerNames({providers: consent.fromProviders})}</TableRowColumn>
                                <TableRowColumn style={{whiteSpace: 'wrap'}}>{providerNames({providers: consent.toProviders})}</TableRowColumn>
                                <TableRowColumn style={{whiteSpace: 'wrap'}}>{ConsentTable.displayNames(consent.sharePurposes)}</TableRowColumn>
                                <TableRowColumn style={{whiteSpace: 'wrap'}}>{ConsentTable.displayNames(consent.shareSensitivityCategories)}</TableRowColumn>
                                <TableRowColumn>{ConsentTable.formatLocalDate(consent.startDate)}</TableRowColumn>
                                <TableRowColumn>{ConsentTable.formatLocalDate(consent.endDate)}</TableRowColumn>
                                <TableRowColumn>{ConsentTable.formatTimestamp(consent.attestedDate)}</TableRowColumn>
                                <TableRowColumn>{ConsentTable.formatTimestamp(consent.revokedDate)}</TableRowColumn>
                            </TableRow>

                        ))}
                        </TableBody>

                    </Table>

                }


            </div>

        );
    }
}

export default ConsentTable;
