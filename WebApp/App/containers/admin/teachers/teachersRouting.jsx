import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeacherForm from './teacherForm.jsx';
import TeachersList from './teachersList.jsx';

export default class TeachersRouting extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div>
                <Switch>
                    <Route path="/admin/teachers/create" component={TeacherForm} />
                    <Route path="/admin/teachers/edit" component={TeacherForm} />
                    <Route exact path='/admin/teachers/' component={TeachersList} />
                </Switch>
            </div>
        );
    }
};