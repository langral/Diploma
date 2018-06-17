import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeacherForm from './techerForm.jsx';

const TEACHERS = [
    {
        id: 1,
        name: "Золотарёв С.В.",
        userName: "ZolotarevSV"
    },
    {
        id: 2,
        name: "Вощинска Г.Э.",
        userName: "VoshinskayGE"
    },
    {
        id: 3,
        name: "Артёмов М.А.",
        userName: "ArtemovMA"
    },
    {
        id: 4,
        name: "Лазарев К.П.",
        userName: "LazarevKP"
    },
    {
        id: 5,
        name: "Шишкина Э.Л.",
        userName: "ShishkinaEL"
    },
    {
        id: 6,
        name: "Украинский П.С.",
        userName: "UkrainskiPS"
    },
    {
        id: 7,
        name: "Зиновьев С.В.",
        userName: "ZinovevSV"
    },
    {
        id: 8,
        name: "Барановский Е.С.",
        userName: "BaranovskiES"
    }
];


export default class TeachersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teachers: TEACHERS
        }
    }

    createTeachersTable() {
        let teachers = this.state.teachers;

        return (
            teachers.map((teacher) => {
                return (
                    <tr key="{teacher.id}">
                        <td>{teacher.userName}</td>
                        <td>{teacher.name}</td>
                        <td>
                            <Link to="/admin/teachers/edit"
                                className="btn btn-primary btn-sm">Ред.
                                    </Link>
                            &nbsp;
                            <Link to="/admin/teachers/delete"
                                className="btn btn-danger btn-sm">Удалить
                             </Link>
                        </td>
                    </tr>
                );
            })
        );
    }


    render() {


        return (
            <div>
                <div className="top-bar">
                    <div className="header">
                        <h3>Преподаватели</h3>
                    </div>
                    <div className="actions">
                        <div className="action">
                            <Link to="/admin/teachers/create"
                                className="btn btn-success">Зарегистрировать
                            </Link>
                        </div>
                    </div>
                </div>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Логин
                            </th>
                            <th>
                                Преподаватель
                            </th>
                            <th>
                                <form className="form-inline form">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Поиск</span>
                                        </div>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="введите ФИО..."
                                            aria-label="Username"
                                            aria-describedby="basic-addon1" />
                                    </div>
                                </form>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.createTeachersTable()}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">&#60;&#60;</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">&#62;&#62;</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
};

