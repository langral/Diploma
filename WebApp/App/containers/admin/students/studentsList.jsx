import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStudents } from './studentAPI.jsx'
import Pagination from '../../utils/pagination.jsx'
import { deleteStudent } from './studentAPI.jsx'

export default class StudentsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            records: [],
            currentPage: 1,
            totalElements: "",
            pageSize: 5
        }

        this.getAllStudents = this.getAllStudents.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
       // this.searchHandler = this.searchHandler.bind(this);
    }

    getAllStudents(page) {
        let p = this.state.currentPage;
        if (page)
            p = page;
        getStudents(p,
            (pageInfo) => {
                this.setState(pageInfo);
            },
            () => {
                console.log('Error');
            }
        );
    }

    componentWillMount() {
        this.getAllStudents();
    }

    deleteHandler(e) {
        let id = e.target.dataset.id;
        deleteStudent(id,
            (data) => {
                this.getAllStudents();
                console.log("ok");
            },
            (error) => {
                console.log("not");
            }
        );

    }

    createId(str) {
        return "#" + str;
    }

    createStudentsTable() {
        let students = this.state.records;

        return (
            students.map((student) => {
                    return (
                        <tr key="{student.id}">
                            <td>{student.name}</td>
                                <td>
                                <Link to={`/admin/students/edit/${student.id}`}
                                        className="btn btn-primary btn-sm" >Ред.
                                    </Link>
                                    &nbsp;
                                    <button
                                    className="btn btn-danger btn-sm" data-toggle="modal" data-target={this.createId(student.id)} >Удалить
                                    </button>
         
                                <div class="modal fade" id={student.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Удаление</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    Вы уверены что хотите удалить данного судента?
                                                </div>
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-primary" onClick={this.deleteHandler} data-id={student.id} data-dismiss="modal">Да</button>
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

   /* searchHandler(e) {
        let value = e.target.value.toLowerCase();
        console.log(value);
        let filter = this.state.records.filter(record => {
            return record.name.toLowerCase().includes(value);
        });

        this.setState({ filterRecords: filter });
    }*/

    render() {
        

        return (
            <div>
                <div className="top-bar">
                    <div className="header">
                        <h3>Студенты</h3>
                    </div>
                    <div className="actions">
                        <div className="action">
                            <Link to="/admin/students/create"
                                className="btn btn-success" onClick={this.createViewHandler}>Добавить нового
                            </Link>
                        </div>
                    </div>
                </div>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Студент
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
                                            aria-describedby="basic-addon1"
                                            onChange={this.searchHandler}
                                        />
                                    </div>
                                </form>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.createStudentsTable()}
                    </tbody>
                </table>
                <Pagination currentPage={this.state.currentPage}
                            totalElements={this.state.totalElements}
                    update={this.getAllStudents} />
            </div>
        );
    }
};