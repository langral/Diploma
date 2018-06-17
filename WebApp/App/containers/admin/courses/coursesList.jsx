import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCourses } from './courseAPI.jsx'
import Pagination from '../../utils/pagination.jsx'
import { deleteCourse } from './courseAPI.jsx'

export default class CoursesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            records: [],
            currentPage: 1,
            totalElements: "",
            pageSize: 5
        }

        this.getAllCourses = this.getAllCourses.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
       // this.searchHandler = this.searchHandler.bind(this);
    }

    getAllCourses(page) {
        let p = this.state.currentPage;

        if (page)
            p = page;
        getCourses(p,
            (pageInfo) => {
                this.setState(pageInfo);
            },
            () => {
                console.log('Error');
            }
        );
    }

    componentWillMount() {
        this.getAllCourses();
    }

    deleteHandler(e) {
        let id = e.target.dataset.id;

        deleteCourse(id,
            (data) => {
                this.getAllCourses();
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

    createCoursesTable() {
        let courses = this.state.records;

        return (
            courses.map((course) => {
                    return (
                        <tr key="{course.id}">
                            <td>{course.number}</td>
                                <td>
                                <Link to={`/admin/courses/edit/${course.id}`}
                                        className="btn btn-primary btn-sm" >Ред.
                                    </Link>
                                    &nbsp;
                                    <button
                                    className="btn btn-danger btn-sm" data-toggle="modal" data-target={this.createId(course.id)} >Удалить
                                    </button>
         
                                <div class="modal fade" id={course.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Удаление</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    Вы уверены что хотите удалить данный курс?
                                                </div>
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-primary" onClick={this.deleteHandler} data-id={course.id} data-dismiss="modal">Да</button>
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
                        <h3>Курсы</h3>
                    </div>
                    <div className="actions">
                        <div className="action">
                            <Link to="/admin/courses/create"
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
                                Курс
                            </th>
                            <th>
                                <form className="form-inline form">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Поиск</span>
                                        </div>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="введите курс..."
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
                        {this.createCoursesTable()}
                    </tbody>
                </table>
                <Pagination currentPage={this.state.currentPage}
                            totalElements={this.state.totalElements}
                            update={this.getAllCourses} />
            </div>
        );
    }
};