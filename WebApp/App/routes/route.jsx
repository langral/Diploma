import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../containers/home/home.jsx';
import Login from '../containers/account/login.jsx';
import Admin from '../containers/admin/admin.jsx';
import Teacher from '../containers/teacher/teacher.jsx';



export default class Routing extends React.Component {

    render() {
        return (
            <main className="main">
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/home" component={Home} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/teacher" component={Teacher} />
                </Switch>
            </main>
        );
    }
};