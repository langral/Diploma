import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../containers/home/home.jsx';
import Login from '../containers/account/login.jsx';



export default class Routing extends React.Component {

    render() {
        return (
            <main className="main">
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </main>
        );
    }
};