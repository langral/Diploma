import React from 'react';
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
                title: "Алгебра и теория числе"
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
        id: 3,
        number: 9
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


class GroupList extends React.Component {
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
                    <li>subject.title</li>
                })
            );
        }
        return (
                <li>Вы не ведете ни у кого данный предмет.</li>
            );
    }

    createGroupsControl() {
        let groups = this.state.groups;

        return (
            groups.map((group) => {
                return (
                    <div key={group.id} className="accordion" id="accordionExample">
                        <div class="card">
                            <div className="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        {group.number}
                                    </button>
                                </h5>
                            </div>
                            <div  id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
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
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Номер группы
                            </th>
                            <th>
                                <form className="form-inline form">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Поиск</span>
                                        </div>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="введите номер..."
                                            aria-label="Username"
                                            aria-describedby="basic-addon1" />
                                    </div>
                                </form>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.createGroupsControl()}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">&#60;&#60;</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">&#62;&#62;</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
};

export default class Teachers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teachers: TEACHERS
        }
    }



    render() {


        return (
            <div>
                <Switch>
                    <Route path="/admin/teachers/create" component={TeacherForm} />
                    <Route path="/admin/teachers/edit" component={TeacherForm} />
                    <Route exact path='/admin/groups/' component={GroupList} />
                </Switch>
            </div>
        );
    }
};