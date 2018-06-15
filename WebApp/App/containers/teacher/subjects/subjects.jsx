import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const SUBJECTS = [
    {
        id: 1,
        title: "Алгебра и теория чисел",
        groups: [
            {
                id: 1,
                number: 11
            }
        ]
    },
    {
        id: 2,
        title: "Шаблоны проектирования",
        groups: [
            {
                id: 2,
                number: 22
            },
            {
                id: 2,
                number: 91
            }
        ]
    },
    {
        id: 3,
        title: "Математическая статистика",
        groups: [
            {
                id: 2,
                number: 22
            },
            {
                id: 2,
                number: 91
            }
        ]
    },

];


export default class SubjectsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subjects: SUBJECTS
        }
    }

    getGroupsFromGroup(groups) {
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

    createId(id) {
        return "#" + id;
    }

    createSubjectsControl() {
        let subjects = this.state.subjects;

        return (
            subjects.map((subject) => {
                return (
                    <div key={subject.id} className="accordion" id="accordionExample">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h5 className="mb-0">
                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target={this.createId(subject.id)} aria-expanded="true" aria-controls="collapseOne">
                                        {subject.title}
                                    </button>
                                </h5>
                            </div>
                            <div id={subject.id} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card-body">
                                    <ul>
                                        {this.getGroupsFromGroup(subject.groups)}
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
