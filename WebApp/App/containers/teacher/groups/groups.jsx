﻿import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const GROUPS = [
    {
        id: 1,
        number: 11,
        subjects: [
            {
                id: 1,
                title: "Математический анализ"
            },
            {
                id: 2,
                title: "Алгебра и теория чисел"
            }
        ]
    },
    {
        id: 2,
        number: 22,
        subjects: [
            {
                id: 1,
                title: "Шаблоны проектирование"
            },
            {
                id: 1,
                title: "Математическая статистика"
            }
        ]
    },
    {
        id: 4,
        number: 91,
        subjects: [
            {
                id: 1,
                title: "Шаблоны проектирование"
            },
            {
                id: 1,
                title: "Математическая статистика"
            }
        ]
    },

];


export default class GroupsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: GROUPS
        }
    }

    getSubjectsFromGroup(subjects) {
        if (subjects && subjects.length > 0) {
            return (
                subjects.map((subject) => {
                    return (
                        <li key={subject.id}>{subject.title}</li>
                    );
                })
            );
        }
    }

    createId(id) {
        return "#" + id;
    }

    createGroupsControl() {
        let groups = this.state.groups;

        return (
            groups.map((group) => {
                return (
                    <div key={group.id} className="accordion" id="accordionExample">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h5 className="mb-0">
                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target={this.createId(group.id)} aria-expanded="true" aria-controls="collapseOne">
                                        {group.number}
                                    </button>
                                </h5>
                            </div>
                            <div id={group.id} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card-body">
                                    <ul>
                                        {this.getSubjectsFromGroup(group.subjects)}
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

            </div>
        );
    }
};