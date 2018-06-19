import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStudent } from './studentAPI.jsx'
import { editStudent } from './studentAPI.jsx'
import { getGroups } from '../groups/groupAPI.jsx'

export default class EditStudent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            errors: [],
            success: "",
            recordsAllGroup: [],
            selectedGroup: ""
        };

        this.submitHandler = this.submitHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    submitHandler(e) {
        e.preventDefault();
        let self = this;
        let data = {};

        data.id = this.props.match.params.id;
        data.name = this.state.name;
        data.groupId = this.refs.groupList.value;

        editStudent(data,
            (data) => { 
                this.setState({ name: "", success: data.success, errors: [] });
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

    nameHandler(e) {
        this.setState({ name: e.target.value });
    }

    goBack() {
        this.props.history.goBack();
    }

    getGroups() {
        let groups = this.state.recordsAllGroup;

        return (
            groups.map((group) => {
                if (group.id === this.state.selectedGroup)
                    return (
                        <option selected value={group.id}>{group.number}</option>
                    );
                else 
                    return (
                        <option value={group.id}>{group.number}</option>
                    );
            })
        );
    }

    componentWillMount() {
        let id = this.props.match.params.id;
        getStudent(id,
            (data) => {
                this.setState({
                    name: data.Name, selectedGroup: data.GroupId
                });
            },
            (error) => {
                this.setState({ errors: error.errors });
            }
        );
        getGroups(null,
            (data) => {
                this.setState({ recordsAllGroup: data.records })
            },
            (error) => {
                console.log(error);
            });
    }

    render() {
        let errors = this.state.errors;
        let success = this.state.success;

        return (
            <div>
                <div className="top-bar">
                    <div className="header">
                        <h3>Изменение студента</h3>
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
                        <label htmlFor="subName">ФИО студента</label>
                        <input type="text" name="name" className="form-control" id="subName" placeholder="фио..." value={this.state.name} onChange={this.nameHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect2">Группы</label>
                        <select ref="groupList" className="form-control" id="exampleFormControlSelect2">
                            {this.getGroups()}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Сохранить</button>
                </form>
            </div>
        );
    }
};