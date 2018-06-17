import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CoursesList from './coursesList.jsx';
import CreateCourse from './createCourse.jsx';
import EditCourse from './editCourse.jsx';

const CoursesRouting = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/courses/create" component={CreateCourse} />
                <Route path="/admin/courses/edit/:id" component={EditCourse} />
                <Route exact path='/admin/courses/' component={CoursesList} />
            </Switch>
        </div>
    );
};

export default CoursesRouting; 