﻿import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeachersRouting from '../teachers/teachersRouting.jsx';
import SubjectsRouting from '../subjects/subjectsRouting.jsx';
import CoursesRouting from '../courses/coursesRouting.jsx';
import GroupsRouting from '../groups/groupsRouting.jsx';
import StudentsRouting from '../students/studentsRouting.jsx';


const AdminPage = () => {
    return (
        <div>
            <h3>Добро пожаловать в панель управления!</h3>
            <hr />
            <p>Чтобы начать работы, выберите любой объект из списка слева.</p>
            <p>В панеле управления вы можете заниматься администрированием данного приложения.<br />То есть:</p>
            <ul>
                <li>Создавать, удалять, редактировать сущности, представленные в списке слева.</li>
                <li>Регистрировать, редактировать и удалять пользователей приложения.</li>
                <li>Управлять ролями пользователей.</li>
            </ul>
        </div>
        );
}

export default class AdminRouting extends React.Component {

    render() {
        return (
            <div className="admin-right-sidebar">
                <Switch>
                    <Route path="/admin/subjects" component={SubjectsRouting} />
                    <Route path="/admin/courses" component={CoursesRouting} />
                    <Route path="/admin/teachers" component={TeachersRouting} />
                    <Route path="/admin/groups" component={GroupsRouting} />
                    <Route path="/admin/students" component={StudentsRouting} />
                    <Route path="/admin" component={AdminPage} />
                </Switch>
            </div>
        );
    }
};