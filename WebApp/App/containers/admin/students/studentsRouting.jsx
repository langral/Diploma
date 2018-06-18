import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudentsList from './studentsList.jsx';
import CreateStudent from './createStudent.jsx';
import EditStudent from './editStudent.jsx';

const StudentsRouting = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/students/create" component={CreateStudent} />
                <Route path="/admin/students/edit/:id" component={EditStudent} />
                <Route exact path='/admin/students/' component={StudentsList} />
            </Switch>
        </div>
    );
};

export default StudentsRouting; 