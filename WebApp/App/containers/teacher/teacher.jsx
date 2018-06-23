import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import TeacherRouting from './routes/route.jsx';
import { NavLink } from 'react-router-dom';


export default class Teacher extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Личный кабинет преподавтеля</h2>
                        <hr />
                    </div>
                    <div className="col-md-3">
                        <div className="list-group">

                            <NavLink activeClassName="active"
                                to="/teacher/attedence"
                                className="list-group-item list-group-item-action">
                                Учет посещаемости
                            </NavLink>

                            <NavLink activeClassName="active" to="/teacher/attestation" className="list-group-item list-group-item-action">
                                Итоговая аттестация
                            </NavLink>

                            <NavLink activeClassName="active" to="/teacher/subjects" className="list-group-item list-group-item-action">
                                Мои предметы
                            </NavLink>

                            <NavLink activeClassName="active" to="/teacher/groups" className="list-group-item list-group-item-action">
                                Мои группы
                            </NavLink>

                        </div>
                    </div>
                    <div className="col-md-9">
                        <TeacherRouting />
                    </div>
                </div>
            </div>
        );
    }
};