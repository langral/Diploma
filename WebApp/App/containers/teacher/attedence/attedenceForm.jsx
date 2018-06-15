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

export default class AttedenceForm extends React.Component {
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
                        <h3>Создать учет посещаемости</h3>
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
                        <label for="exampleFormControlInput1">Учебный год</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="2017/2018 Семестр: 7" />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Преподаватель</label>
                        <input type="text" className="form-control" value="Золотарев С.В." id="exampleFormControlInput1" disabled />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Факультет</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="факультет прикладной математики, информатики и механики" />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Уровень образования</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="бакалавриат" />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Специальность / направление</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Б2.В.ДВ.1.1 Языки и системы программирования" />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Вид занятия</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="лабораторные" />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlSelect2">Предмет</label>
                        <select  className="form-control" id="exampleFormControlSelect2">
                            {this.getSubjects()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlSelect2">Группа</label>
                        <select  className="form-control" id="exampleFormControlSelect2">
                            {this.getGroups()}
                        </select>
                    </div>
                    <button type="button" class="btn btn-primary">Создать</button>
                </form>
            </div>
        );
    }
};