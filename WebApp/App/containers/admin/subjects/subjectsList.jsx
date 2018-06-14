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

export default class SubjectsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subjects: SUBJECTS
        }
    }

    createSubjectsTable() {
        let subjects = this.state.subjects;

        return (
                subjects.map((subject) => {
                    return (
                        <tr key="{subject.id}">
                                <td>{subject.title}</td>
                                <td>
                                    <Link to="admin/subjects/edit"
                                          className="btn btn-primary btn-sm">Ред.
                                    </Link>
                                    &nbsp;
                                    <Link to="admin/subjects/edit"
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
                        <h3>Предметы</h3>
                    </div>
                    <div className="actions">
                        <div className="action">
                            <Link to="admin/subjects/create"
                                className="btn btn-success">Добавить новый
                            </Link>
                        </div>
                    </div>
                </div>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Предмет
                            </th>
                            <th>
                                <form className="form-inline form">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Поиск</span>
                                        </div>
                                        <input  type="text"
                                                className="form-control"
                                                placeholder="введите предмет..."
                                                aria-label="Username"
                                                aria-describedby="basic-addon1" />
                                    </div>
                                </form>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.createSubjectsTable()}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">&#60;&#60;</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">&#62;&#62;</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
};