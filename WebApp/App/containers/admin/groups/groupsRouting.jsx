import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GroupsList from './groupsList.jsx';
import CreateGroup from './createGroup.jsx';
import EditGroup from './editGroup.jsx';

const GroupsRouting = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/groups/create" component={CreateGroup} />
                <Route path="/admin/groups/edit/:id" component={EditGroup} />
                <Route exact path='/admin/groups/' component={GroupsList} />
            </Switch>
        </div>
    );
};

export default GroupsRouting; 