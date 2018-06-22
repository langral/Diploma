import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from '../../account/components/input.jsx'
import { getSubjects } from '../subjects/subjectAPI.jsx'
import { register, createGroupTeacher, createSubjectTeacher, getGroupsBySubject } from './accountAPI.jsx';


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
            recordsSubject: [],
            recordsGroup: [],
            success: false
        }

        this.goBack = this.goBack.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getErrors = this.getErrors.bind(this);
        this.updateForm = this.updateForm.bind(this);
    }

    goBack() {
        this.props.history.goBack();
    }


    showSuccess(success) {
        if (success) {
            return (
                <div class="alert alert-success" role="alert">
                    Преподователь {this.userName} успешно зарегистрирован!
                </div>
            );
        } else {
            return (
                <div className="hidden" ></div>
            )
        }
    }

    getAllGroups(page) {
        let p = this.state.currentPage;
        if (page)
            p = page;
        getGroups(p,
            (pageInfo) => {
                this.setState(pageInfo);
            },
            () => {
                console.log('Error');
            }
        );
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


    componentWillMount() {
        getSubjects(null,
            (data) => {
                this.setState({ recordsSubject: data.records })
            },
            (error) => {
                console.log(error);
            });
    }

    getSubjects() {
        let subjects = this.state.recordsSubject;

        return (
            subjects.map((subject) => {
                return (
                    <option value={subject.id}>{subject.name}</option>
                );
            })
        );
    }

    getGroups() {
        let groups = this.state.recordsGroup;
   
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

    getArrayOfSelectedGroupsFromSelectList() {
        let listOf = Array.from(this.refs.groupList.querySelectorAll("option"));
        return listOf.filter((el) => el.selected).map((el) => { return { id: el.value, name: el.innerText } });
    }

    getArrayOfSelectedSubjectsFromSelectList() {
        let listOf = Array.from(this.refs.subjectList.querySelectorAll("option"));
        return listOf.filter((el) => el.selected).map((el) => { return { id: el.value, name: el.innerText } });
    }

    getGroupsBySubjects(e) {

        let listOf = this.getArrayOfSelectedSubjectsFromSelectList();
        console.log(listOf);
        getGroupsBySubject(
            listOf,
            (data) => {
                this.setState({ recordsGroup: data.records })
            },
            (error) => {
                console.log(error);
            });
    }

    assingTeacherToSubjects(teacherId, subjects) {

        createSubjectTeacher(
            {
                teacherId: teacherId,
                subjects: subjects
            },
            (data) => {
                this.assingTeacherToGroups(teacherId, this.getArrayOfSelectedGroupsFromSelectList());
            },
            (error) => {
                console.log(error);
            });
    }

    assingTeacherToGroups(teacherId, groups) {
        createGroupTeacher(
            {
                teacherId: teacherId,
                groups: groups
            },
            (data) => {
                this.setState({ success: true})
            },
            (error) => {
                console.log(error);
            });
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
                self.assingTeacherToSubjects(data.Id, self.getArrayOfSelectedSubjectsFromSelectList());
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
                    {this.showSuccess(this.state.success)}

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
                        <label htmlFor="exampleFormControlSelect2">Предметы</label>
                        <select ref="subjectList" onChange={this.getGroupsBySubjects.bind(this)} multiple className="form-control" id="exampleFormControlSelect2">
                            {this.getSubjects()}
                        </select>
                    </div>

          
                    <div className="form-group">
                        <label for="exampleFormControlSelect2">Группы</label>
                        <select ref="groupList" multiple  className="form-control" id="exampleFormControlSelect2">
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