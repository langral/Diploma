import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserProfileFromJwt } from '../../../utils/jwtTools.jsx'
import { getItem } from '../../../utils/localStorageTools.jsx'
import { AUTH_KEY } from '../../../settings/settings.jsx'
import Input from '../input.jsx'
import {  getSubjects, createAttestation } from './api.jsx'

export default class AttestationForm extends React.Component {
    constructor(props) {
        super(props);

        let auth = getItem(AUTH_KEY).authToken;
        auth = getUserProfileFromJwt(auth);
      
        this.state = {
            FIO: auth.teacherName,
            subjects: [],
            groups: [],
            courses: [],
            teacherId: auth.name
        }
        

        this.goBack = this.goBack.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }

    getAllSubjects(groupId) {

        getSubjects(
            (pageInfo) => {
                this.setState({ subjects: pageInfo.records });
            },
            () => {
                console.log('Error');
            }
        );
    }

    getArrayOfSelectedCoursesFromSelectList() {
        let listOf = Array.from(this.refs.courseList.querySelectorAll("option"));
        return listOf.filter((el) => el.selected).map((el) => { return { id: el.value, number: el.innerText } });
    }


    componentWillMount() {
        this.getAllSubjects();
    }

    goBack() {
        this.props.history.goBack();
    }

    getCourses() {
        let courses = this.state.courses;

        return (
            courses.map((course) => {
                return (
                    <option value={course.id}>{course.number}</option>
                );
            })
        );
    }


    getSubjects() {
        let subjects = this.state.subjects;

        return (
            subjects.map((subject) => {
                return (
                    <option value={subject.id}>{subject.name}</option>
                );
            })
        );
    }

    getGroups() {
        let groups = this.state.groups;

        return (
            groups.map((group) => {
                return (
                    <option value={group.id}>{group.number}</option>
                );
            })
        );
    }

    updateForm(newState) {
        this.setState(newState);
    }

    selectOnChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        let obj = {};
        obj[name] = value;

        this.setState(obj);
    }

    submit(e) {
        e.preventDefault();
        let obj = this.state;
        delete obj.subjects;
        delete obj.groups;
        delete obj.courses;
        delete obj.FIO;
        delete obj.courseId;
     

        createAttestation(obj,
            (data) => { console.log("success"); },
            (er) => { console.log(er); }
        );

        return false;
    }

    render() {
     
        return (
            <div>
                <div className="top-bar">
                    <div className="header">
                        <h3>Создать аттестацию</h3>
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

                <form onSubmit={this.submit.bind(this)} >

                    <Input
                        name="year"
                        label="Учебный год:"
                        type="text"
                        required={true}
                        id="year"
                        updateForm={this.updateForm}
                    />

                    <Input
                        name="semester"
                        label="Семестр:"
                        type="text"
                        required={true}
                        id="semester"
                        updateForm={this.updateForm}
                    />

                    <Input
                        name="teacherId"
                        label="Преподаватель:"
                        type="text"
                        required={true}
                        id="teacher"
                        updateForm={this.updateForm}
                        disabled={true}
                        value={this.state.FIO}
                    />

                    <Input
                        name="department"
                        label="Факультет:"
                        type="text"
                        required={true}
                        id="department"
                        updateForm={this.updateForm}
                    />

                    <Input
                        name="specialty"
                        label="Направление / специальность:"
                        type="text"
                        required={true}
                        id="specialty"
                        updateForm={this.updateForm}
                    />


                    <div className="form-group">
                        <label for="subject">Предмет</label>
                        <select name="subjectId" onChange={this.selectOnChange.bind(this)} ref="subjectList" className="form-control" id="subject">
                            <option defaultValue>Выберите предмет...</option>
                            {this.getSubjects()}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Создать</button>
                </form>
            </div>
        );
    }
};