﻿import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <div>
                <h2>Home2</h2>
                <Link to="/admin" >admin</Link>
             </div>
        );
    }
};