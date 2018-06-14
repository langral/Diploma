import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
            FIO: "",
            email: "",
            subjects: SUBJECTS,
            groups: GROUPS
        }

        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.props.history.goBack();
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
                
                <form>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Логин</label>
                        <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Ivanov" />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Пароль</label>
                        <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="пароль" />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Повторите пароль</label>
                        <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="пароль" />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Email</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
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
                    <button type="button" class="btn btn-primary">Зарегистрировать</button>
                </form>
            </div>
        );
    }
};