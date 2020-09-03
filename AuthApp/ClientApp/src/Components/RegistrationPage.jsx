import React, { Component } from 'react';
import {
    Form,
    Button,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import { withRouter, useHistory } from 'react-router-dom';
import Axios from 'axios';
import Auth from './Auth';

class RegistrationPage extends Component {
    static displayName = RegistrationPage.name;

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            login: '',
            password: '',
            repeatPassword: ''
        };
    }

    onChange = event => {
        this.setState({ [event.target.name]: [event.target.value] });
    }

    checkValues (name, login, password, repeatPassword) {
        let correctValues = false;
        if(name === '' || name.length > 255){
            alert('Поле: Имя. Значение не может быть пустым или превышать 255 символов!');
        } else if (login === '' || login.length > 255) {
            alert('Поле: Логин. Значение не может быть пустым или превышать 255 символов!');
        } else if (password === '' || password.length > 255) {
            alert('Поле: Пароль. Значение не может быть пустым или превышать 255 символов!');
        } else if (password === repeatPassword) {
            alert('Пароль и повтор пароля не совпадают');
        } else {
            correctValues = true;
        }

        return correctValues;
    }

    submitNew = event => {
        event.preventDefault();

        const { name, login, password, repeatPassword } = this.state;
        let correctValues = false;

        if(name === '' || name.length > 255){
            alert('Поле: Имя. Значение не может быть пустым или превышать 255 символов!');
            correctValues = false;
        } else {
            correctValues = true;
        }
        
        if (login === '' || login.length > 255) {
            alert('Поле: Логин. Значение не может быть пустым или превышать 255 символов!');
            correctValues = false;
        } else {
            correctValues = true;
        }

        if (password === repeatPassword) {
            alert('Пароль и повтор пароля не совпадают');
            correctValues = false;
        } else {
            if (password === '' || password.length > 255) {
                alert('Поле: Пароль. Значение не может быть пустым или превышать 255 символов!');
                correctValues = false;
            } else {
                correctValues = true;
            }

            if (repeatPassword === '' || repeatPassword.length > 255) {
                alert('Поле: Пароль. Значение не может быть пустым или превышать 255 символов!');
                correctValues = false;
            } else {
                correctValues = true;
            }
        }

        if(correctValues)
        {
            Axios.post('api/Users', {
                "Name": `${name}`,
                "Login": `${login}`,
                "Password": `${password}`
            }).then(response => {
                console.log(response.json());
                console.log(response);
            }).catch(error => {
                console.log(error);
            })

            setTimeout(100);

            Axios.post('/login', {
                "Login": `${login}`,
                "Password": `${password}`
            }).then(response => {
                console.log(response.json());
                const data = response.json();
                sessionStorage.setItem("access_token", data.access_token);
                Auth.name = data.Name;
                Auth.authenticate();
                useHistory().history.push('/users-list');
            }).catch(error => {
                console.log(error);
            });
        } else {
            this.setState({ name: '', login: '', password: '', repeatPassword: '' });
        }
    }

    render() {
        return (
            <div className="mt-5 mb-5">
                <div className="container">
                    <div className="row">
                        <h2>Регистрация</h2>
                    </div>
                    <div className="row">
                        <Form>
                            <FormGroup>
                                <Label for="name">Имя:</Label>
                                <Input type="text" name="name" onChange={this.onChange} value={this.state.name === '' ? '' : this.state.name} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="login">Логин:</Label>
                                <Input type="text" name="login" onChange={this.onChange} value={this.state.login === '' ? '' : this.state.login}  />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Пароль:</Label>
                                <Input type="password" name="password" onChange={this.onChange} value={this.state.password === '' ? '' : this.state.password} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="repeatPassword">Повтор пароля:</Label>
                                <Input type="password" name="repeatPassword" onChange={this.onChange} value={this.state.repeatPassword === '' ? '' : this.state.repeatPassword} />
                            </FormGroup>
                            <Button onClick={this.submitNew}>Send</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RegistrationPage);