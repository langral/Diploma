import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeacherForm from './teacherForm.jsx';
import { getTeachers, deleteTeacher } from './accountAPI.jsx'
import Pagination from '../../utils/pagination.jsx'

export default class TeachersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            records: [],
            currentPage: 1,
            totalElements: "",
            pageSize: 5
        }

        this.deleteHandler = this.deleteHandler.bind(this);
        this.getAllTeachers = this.getAllTeachers.bind(this);
    }

    getAllTeachers(page) {
        let p = this.state.currentPage;
        if (page)
            p = page;
        getTeachers(p,
            (pageInfo) => {
                this.setState(pageInfo);
            },
            () => {
                console.log('Error');
            }
        );
    }

    componentWillMount() {
        this.getAllTeachers();
    }

    createId(str) {
        return "#" + str;
    }

    deleteHandler(e) {
        let id = e.target.dataset.id;
        deleteTeacher(id,
            (data) => {
                this.getAllTeachers();
                console.log("ok");
            },
            (error) => {
                console.log("not");
            }
        );

    }

    createTeachersTable() {
        let teachers = this.state.records;

        return (            
            teachers.map((teacher) => {
                console.log(teacher);
                return (
                    <tr key="{teacher.id}">
                        <td>{teacher.userName}</td>
                        <td>{teacher.fio}</td>
                        <td>
                            <Link to="/admin/teachers/edit"
                                className="btn btn-primary btn-sm">Ред.
                                    </Link>
                            &nbsp;
                            <button
                                className="btn btn-danger btn-sm" data-toggle="modal" data-target={this.createId(teacher.id)} >Удалить
                            </button>

                            <div class="modal fade" id={teacher.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Удаление</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            Вы уверены что хотите удалить данного преподавателя?
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" onClick={this.deleteHandler} data-id={teacher.id} data-dismiss="modal">Да</button>
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Нет</button>
                                        </div>
                                    </div>
                                </div>
                            </div> 

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
                <Pagination currentPage={this.state.currentPage}
                    totalElements={this.state.totalElements}
                    update={this.getAllGroups} />
            </div>
        );
    }
};

