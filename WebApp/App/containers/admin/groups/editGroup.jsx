import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGroup } from './groupAPI.jsx'
import { editGroup } from './groupAPI.jsx'
import { getSubjects } from '../subjects/subjectAPI.jsx'
import { getCourses } from '../courses/courseAPI.jsx'

export default class EditSubject extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            number: "",
            errors: [],
            success: "",
            recordsSubject: [],
            recordsCourse: [],
            selectedSubject: [],
            selectedCourse: ""
        };

        this.submitHandler = this.submitHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    getSelectValues(select) {
        var result = [];
        var options = select && select.options;
        var opt;

        for (var i = 0, iLen = options.length; i < iLen; i++) {
            opt = options[i];

            if (opt.selected) {
                result.push({
                    id: opt.value,
                    name: opt.text
                });
            }
        }
        return result;
    }

    submitHandler(e) {
        e.preventDefault();
        let self = this;
        let data = {};

        data.id = this.props.match.params.id;
        data.number = this.state.number;
        data.courseId = this.refs.courseList.value;
        data.subject = this.getSelectValues(this.refs.subjectList);

        editGroup(data,
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
        this.setState({ number: e.target.value });
    }

    goBack() {
        this.props.history.goBack();
    }

    getSubjects() {
        let subjects = this.state.recordsSubject;
        let selectSubject = this.state.selectedSubject;

        return (
            subjects.map((subject) => {
                if (selectSubject.some((elem) => elem.SubjectId === subject.id ))
                    return (
                        <option selected value={subject.id}>{subject.name}</option>
                    );
                else
                    return (
                        <option value={subject.id}>{subject.name}</option>
                    );
            })
        );
    }

    getCourses() {
        let courses = this.state.recordsCourse;

        return (
            courses.map((course) => {
                if (course.id === this.state.selectedCourse)
                    return (
                        <option selected value={course.id}>{course.number}</option>
                    );
                else
                    return (
                        <option value={course.id}>{course.number}</option>
                    );
            })
        );
    }

    componentWillMount() {
        let id = this.props.match.params.id;
        getGroup(id,
            (data) => {
                this.setState({
                    number: data.group.Number, selectedSubject: data.subjectList, selectedCourse: data.group.CourseId });
            },
            (error) => {
                this.setState({ errors: error.errors });
            }
        );
        getSubjects(null,
            (data) => {
                this.setState({ recordsSubject: data.records })
            },
            (error) => {
                console.log(error);
            });
        getCourses(null,
            (data) => {
                this.setState({ recordsCourse: data.records })
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
                        <h3>Изменение группу</h3>
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
                        <label htmlFor="subName">Название группы</label>
                        <input type="text" name="name" className="form-control" id="subName" placeholder="название предмета..." value={this.state.number} onChange={this.nameHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect2">Курсы</label>
                        <select ref="courseList" className="form-control" id="exampleFormControlSelect2">
                            {this.getCourses()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect2">Предметы</label>
                        <select ref="subjectList" multiple className="form-control" id="exampleFormControlSelect2">
                            {this.getSubjects()}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Сохранить</button>
                </form>
            </div>
        );
    }
};