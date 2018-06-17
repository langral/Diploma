import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import AdminRouting from './routes/route.jsx';
import { NavLink } from 'react-router-dom';


export default class Admin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Панель управления</h2>
                        <hr />
                    </div>
                    <div className="col-md-3">
                        <div className="list-group">

                            <NavLink activeClassName="active"
                                to="/admin/subjects"
                                className="list-group-item list-group-item-action">
                                Предметы
                            </NavLink>

                            <NavLink activeClassName="active" to="/admin/courses" className="list-group-item list-group-item-action">
                                Курсы
                            </NavLink>

                            <NavLink activeClassName="active" to="/admin/groups" className="list-group-item list-group-item-action">
                                Группы
                            </NavLink>

                            <NavLink activeClassName="active" to="/admin/students" className="list-group-item list-group-item-action">
                                Студенты
                            </NavLink>

                            <NavLink activeClassName="active" to="/admin/teachers" className="list-group-item list-group-item-action">
                                Преподаватели
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <AdminRouting />
                    </div>
                </div>
            </div>
        );
    }
};