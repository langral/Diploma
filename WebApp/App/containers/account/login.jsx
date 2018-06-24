import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Input from './components/input.jsx';
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

        this.props.login({
            userName: this.state.userName,
            password: this.state.password
        });

        e.preventDefault();
    }

    getClaimFromTarget(target, claim, callback) {
        if (target.toLowerCase().search(claim.toLowerCase()) != -1) {
            callback();
        }
    }


    redirect() {
        let user = this.props.auth;

        if (user && user.userName != null) {
            if (user.roles.includes("admin")) {
                return <Redirect to="/admin" />;
            }
            if (user.roles.includes("teacher")) {
                return <Redirect to="/teacher" />;
            }
        }
    }

    render() {
     
        return (
            <form className="std-form" onSubmit={this.onSubmit} >

                <h3>Вход</h3>
                <hr />
                
                {this.redirect()}
                {this.getErrors() && (this.getErrors())}

                <Input
                    name="userName"
                    label="User name:"
                    type="text"
                    required={true}
                    id="user-name"
                    updateForm={this.updateForm}
                />

                <Input
                    name="password"
                    label="Password:"
                    type="password"
                    required={true}
                    id="user-password"
                    updateForm={this.updateForm}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-default">Sign in</button>
                </div>

            </form>
        );
    }

};