﻿import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GroupsList from '../groups/groups.jsx';
import SubjectsList from '../subjects/subjects.jsx';
import Attedence from '../attedence/attedence.jsx';
import Attestation from '../attestation/attestation.jsx'

const TeacherPage = () => {
    return (
        <div>
            <h3>Добро пожаловать!</h3>
            <hr />
            <p>Чтобы начать работу, выберите любой пункт из списка слева.</p>
            <p>В данной программе вы можете:</p>
            <ul>
                <li>Формировать и сохранять данные учета посещаемости студентов.</li>
                <li>Формировать и сохранять результаты итоговых аттестаций.</li>
                <li>При использовании совместно с серсисом Х возможно получение документов в формате .docx.</li>
                <li>Просматривать предметы, ассоциированные с вашим профилем.</li>
                <li>Просматривать с какими группами студентов связан, ассциированный с вашим профилем предмет.</li>
                <li>Просматривать список студентов, выбранной группы.</li>
            </ul>
        </div>
        );
}

export default class TeacherRouting extends React.Component {

    render() {
        return (
            <div className="admin-right-sidebar">
                <Switch>
                    <Route path="/teacher/attedence" component={Attedence} />
                    <Route path="/teacher/attestation" component={Attestation} />
                    <Route path="/teacher/subjects" component={SubjectsList} />
                    <Route path="/teacher/groups" component={GroupsList} />
                    <Route path="/teacher" component={TeacherPage} />
                </Switch>
            </div>
        );
    }
};