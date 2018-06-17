import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SubjectsList from './subjectsList.jsx';
import CreateSubject from './createSubject.jsx';
import EditSubject from './editSubject.jsx';

const SubjectsRouting = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/subjects/create" component={CreateSubject} />
                <Route path="/admin/subjects/edit/:id" component={EditSubject} />
                <Route exact path='/admin/subjects/' component={SubjectsList} />
            </Switch>
        </div>
    );
};

export default SubjectsRouting; 