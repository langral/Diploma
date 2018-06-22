import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Pagination from '../../utils/pagination.jsx'
import { getGroupsForTeacherId } from './groupAPI.jsx'
import { getItem } from '../../../utils/localStorageTools.jsx'
import { AUTH_KEY } from '../../../settings/settings.jsx'

export default class GroupsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            records: [],
            currentPage: 1,
            totalElements: "",
            pageSize: 5,
            numberGroups: []
        }

        this.getAllGroups = this.getAllGroups.bind(this);
    }

    getSubjectsFromGroup(subjects) {
        if (subjects && subjects.length > 0) {
            return (
                subjects.map((subject) => {
                    return (
                        <li>{subject.name}</li>
                    );
                })
            );
        }
    }

    createId(id) {
        return "#" + id;
    }

    //IDTeacher
    getAllGroups(page) {
        let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };

        getGroupsForTeacherId(auth,
            (pageInfo) => {
                this.setState(pageInfo);
            },
            () => {
                console.log('Error');
            }
        );        
    }

    componentWillMount() {
        this.getAllGroups();
    }

    createGroupsControl() {
        let groups = this.state.records;

        return (
            groups.map((group) => {
                return (                   
                    <div key={group.number} className="accordion" id="accordionExample">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h5 className="mb-0">
                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target={this.createId(group.number)} aria-expanded="true" aria-controls="collapseOne">
                                        {group.number}
                                    </button>
                                </h5>
                            </div>
                            <div id={group.number} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card-body">
                                    <ul>
                                        {this.getSubjectsFromGroup(group.subject)}
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
                        <h3>Группы</h3>
                    </div>
                    <div className="actions">
                        <div className="action">
                            
                        </div>
                    </div>
                </div>
                <hr />

                {this.createGroupsControl()}

                <br />
                <Pagination currentPage={this.state.currentPage}
                    totalElements={this.state.totalElements}
                    update={this.getAllGroups} />

            </div>
        );
    }
};
