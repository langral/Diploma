import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GroupList from '../groups/groups.jsx';

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
                    <Route path="/teacher/attedence" component={TeacherPage} />
                    <Route path="/teacher/attestation" component={TeacherPage} />
                    <Route path="/teacher/groups" component={Teachers} />
                </Switch>
            </div>
        );
    }
};