import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


export default class SubjectsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name
        };
    }

    render() {
        let subjects = this.state.subjects;

        return (
            <div>


            </div>
        );
    }
};