import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Input from './components/input.jsx';
import { register } from './accountAPI.jsx';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: "",
            errors: [],
            success: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.getErrors = this.getErrors.bind(this);
    }

    getErrors() {
        if (this.state.errors.length > 0) {
            let errors = this.state.errors.map((error, index) => {
                return (
                    <p key={index}>{error}</p>
                );
            });

            return (
                <div className="alert alert-danger">
                    {errors}
                </div>
            );
        }
    }

    updateForm(newState) {
        this.setState(newState);
    }

    onSubmit(e) {
        let self = this;

        register({
            userName: this.state.userName,
            password: this.state.password
        },
            function (data) {
                self.setState({ success: true });
            },
            function (error) {
                if (error.errors) {
                    self.setState({
                        errors: error.errors,
                        success: false
                    });
                }
            }
        );
        e.preventDefault();
    }

    render() {
        console.log(this.state);
        return (
            <form className="std-form" onSubmit={this.onSubmit} >

                <h3>Вход в приложение</h3>
                <hr />

                {this.state.success && (<Redirect to="/login" />)}
                {this.getErrors() && (this.getErrors())}

                <Input
                    name="userName"
                    label="Логин:"
                    type="text"
                    required={true}
                    id="user-name"
                    updateForm={this.updateForm}
                />

                <Input
                    name="password"
                    label="Пароль:"
                    type="password"
                    required={true}
                    id="user-password"
                    updateForm={this.updateForm}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-default">Войти</button>
                </div>

            </form>
        );
    }

};