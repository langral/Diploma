import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSubject } from './subjectAPI.jsx'
import { editSubject } from './subjectAPI.jsx'

export default class EditSubject extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            errors: [],
            success: ""
        };

        this.submitHandler = this.submitHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.props.history.goBack();
    }

    submitHandler(e) {
        e.preventDefault();
        let self = this;

        editSubject({ Id: this.props.match.params.id, Name: this.state.name },
            (data) => {
                this.setState({ name: "", success: data.success });
            },
            (error) => {
                this.setState({ errors: error.errors, success: "" });
            }
        );
        return false;
    }

    showSuccess(success) {
        if (success) {
            return (
                <div class="alert alert-success" role="alert">
                    {success}
                </div>
            );
        } else {
            return (
                <div className="hidden" ></div>
            )
        }
    }

    showErrors(errors) {
        if (errors && errors.length > 0)
            return (
                <div className="alert alert-danger form-group" role="alert">
                    <ul>
                        {
                            errors.map(error => {
                                return (
                                    <li>{error}</li>
                                );
                            })
                        }
                    </ul>
                </div>

            )
        else
            return (
                <div className="hidden" ></div>
            )
    }

    componentWillMount() {
        let id = this.props.match.params.id;
        getSubject(id,
            (data) => {
                this.setState({ name: data.Name });
            },
            (error) => {
                this.setState({ errors: error.errors });
            }
        );
    }

    nameHandler(e) {
        this.setState({ name: e.target.value });
    }

    render() {
        let errors = this.state.errors;
        let success = this.state.success;

        return (
            <div>
                <div className="top-bar">
                    <div className="header">
                        <h3>Изменить предмет</h3>
                    </div>
                    <div className="actions">
                        <div className="action">
                            <button onClick={this.goBack}
                                className="btn btn-success">Назад
                        </button>
                        </div>
                    </div>
                </div>
                <hr />
                <form onSubmit={this.submitHandler}>
                    {this.showErrors(errors)}
                    {this.showSuccess(success)}
                    <div className="form-group">
                        <label htmlFor="subName">Название предмета</label>
                        <input type="text" name="name" className="form-control" id="subName" placeholder="название предмета..." value={this.state.name} onChange={this.nameHandler} />
                    </div>
                    <button type="submit" className="btn btn-primary">Сохранить</button>
                </form>
            </div>
        );
    }
};