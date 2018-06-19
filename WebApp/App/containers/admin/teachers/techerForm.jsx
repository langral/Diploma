import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from '../../account/components/input.jsx'
import { register } from './accountAPI.jsx';


const SUBJECTS = [
    {
        id: 1,
        title: "Шаблоны проектирования"
    },
    {
        id: 2,
        title: "Математический анализ"
    },
    {
        id: 3,
        title: "Алгебра и теория чисел"
    },
    {
        id: 4,
        title: "Методы оптимизаций"
    },
    {
        id: 5,
        title: "Язык программирования C#"
    },
    {
        id: 6,
        title: "Базы данных"
    },
    {
        id: 7,
        title: "Теория чисел"
    },
    {
        id: 8,
        title: "Математическая статистика"
    }
];



const GROUPS = [
    {
        id: 1,
        number: 11
    },
    {
        id: 2,
        number: 44
    },
    {
        id: 3,
        number: 21
    },
    {
        id: 4,
        number: 89
    },
    {
        id: 5,
        number: 91
    },
    {
        id: 6,
        number: 34
    }
];

export default class TeacherForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: "",
            passwordConfirm: "",
            FIO: "",
            email: "",
            errors: [],
            subjects: SUBJECTS,
            groups: GROUPS
        }

        this.goBack = this.goBack.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getErrors = this.getErrors.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }

    goBack() {
        this.props.history.goBack();
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

    getSubjects() {
        let subjects = this.state.subjects;

        return (
            subjects.map((subject) => {
                return (
                    <option>{subject.title}</option>
                );
            })
        );
    }

    getGroups() {
        let groups = this.state.groups;

        return (
            groups.map((group) => {
                return (
                    <option>{group.number}</option>
                );
            })
        );
    }

    updateForm(newState) {
        this.setState(newState);
    }

    onSubmit(e) {
        let self = this;

        register({
            userName: this.state.userName,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm,
            fio: this.state.FIO,
            email: this.state.email
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


        return (
            <div>
                <div className="top-bar">
                    <div className="header">
                        <h3>Зарегистрировать преподавателя</h3>
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
                
                <form onSubmit={this.onSubmit} >
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
                        name="FIO"
                        label="ФИО:"
                        type="text"
                        required={true}
                        id="user-fio"
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

                    <Input
                        name="passwordConfirm"
                        label="Повторите пароль:"
                        type="password"
                        required={true}
                        id="user-confirm-password"
                        updateForm={this.updateForm}
                    />

                    <Input
                        name="email"
                        label="Email:"
                        type="email"
                        required={false}
                        id="user-email"
                        updateForm={this.updateForm}
                    />

                    <div className="form-group">
                        <label for="exampleFormControlSelect2">Предметы</label>
                        <select multiple className="form-control" id="exampleFormControlSelect2">
                            {this.getSubjects()}
                            </select>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlSelect2">Группы</label>
                        <select multiple className="form-control" id="exampleFormControlSelect2">
                            {this.getGroups()}
                        </select>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Зарегистрировать</button>
                    </div>
           
                </form>
            </div>
        );
    }
};