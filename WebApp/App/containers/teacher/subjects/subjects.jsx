import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Pagination from '../../utils/pagination.jsx'
import { getSubjectsForTeacherId } from './subjectAPI.jsx'

export default class SubjectsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            records: [],
            currentPage: 1,
            totalElements: "",
            pageSize: 5,
            numberGroups: []
        }

        this.getAllSubjects = this.getAllSubjects.bind(this);
    }

    getGroupsFromSubject(groups) {
        if (groups && groups.length > 0) {
            return (
                groups.map((group) => {
                    return (
                        <li>{group.number}</li>
                    );
                })
            );
        }
    }

    getAllSubjects(page) {
        let p = this.state.currentPage;
        if (page)
            p = page;
        getSubjectsForTeacherId({ page: p, idTeacher: 1 },
            (pageInfo) => {
                this.setState(pageInfo);
            },
            () => {
                console.log('Error');
            }
        );
    }

    componentWillMount() {
        this.getAllSubjects();
    }

    createId(id) {
        return "#" + id;
    }

    createSubjectsControl() {
        let subjects = this.state.records;

        return (
            subjects.map((subject) => {
                console.log(subject);
                return (
                    <div key={subject.name} className="accordion" id="accordionExample">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h5 className="mb-0">
                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target={this.createId(subject.name)} aria-expanded="true" aria-controls="collapseOne">
                                        {subject.name}
                                    </button>
                                </h5>
                            </div>
                            <div id={subject.name} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card-body">
                                    <ul>
                                        {this.getGroupsFromSubject(subject.group)}
                                    </ul>
                                </div>
                             </div>
                            
                        </div>
                    </div>
                );
            })
        );
    }


    render() {


        return (
            <div>
                <div className="top-bar">
                    <div className="header">
                        <h3>Предметы</h3>
                    </div>
                    <div className="actions">
                        <div className="action">
                            
                        </div>
                    </div>
                </div>
                <hr />

                {this.createSubjectsControl()}

                <br />

            </div>
        );
    }
};
