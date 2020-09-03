import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class UsersPage extends Component {
    static displayName = UsersPage.name;

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isAuthenticated: false
        }
    }

    getItems = () => {
        Axios.get('api/users', {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("access_key")
            }
        })
            .then(response => { response.json() })
            .then(response => { this.setState({ items: response })})
            .catch(error => {
                console.log(error)
            })                

    }

    componentDidMount() {
        this.getItems();
    }

    render() {
        const { isAuthenticated } = this.state;
        
        if(!isAuthenticated) {
            return this.anonymousView();
        } else {
            return this.authenticatedView();
        }
    }

    authenticatedView() {
        return(
        <div className="mt-5 mb-5">
                <Table striped>
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!this.state.items || this.state.items.length <= 0 ?
                            <tr>
                                <td colSpan="6" align="center"><b>No Users yet</b></td>
                            </tr>
                            : this.state.items.map(item => (
                                <tr key={item.index}>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
        )
    }

    anonymousView() {
        return(
            <div className="mt-5 mb-5">
                <h4>Чтобы посмотреть таблицу пользователей, необходимо аторизоваться.</h4>
            </div>
        )
    }
}

export default withRouter(UsersPage);