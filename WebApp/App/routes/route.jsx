import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../containers/home/home.jsx';
import LoginContainer from '../containers/account/loginContainer.jsx';
import Admin from '../containers/admin/admin.jsx';
import Teacher from '../containers/teacher/teacher.jsx';
import PrivateRoute from '../authorization/authorization.jsx';

const AdminRoute = PrivateRoute(['admin']);
const TeacherRoute = PrivateRoute(['teacher']);

export default class Routing extends React.Component {

    render() {
        return (
            <main className="main">
                <Switch>
                    <Route exact path="/" component={LoginContainer} />
                    <Route exact path="/login" component={LoginContainer} />
                    <Route path="/admin" component={AdminRoute(Admin)} />
                    <Route path="/teacher" component={TeacherRoute(Teacher)} />
                </Switch>
            </main>
        );
    }
};