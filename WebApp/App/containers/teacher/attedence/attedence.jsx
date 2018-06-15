import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AttedenceForm from './attedenceForm.jsx';
import AttedenceTable from './attedenceTable.jsx';

const ATTEDENCE = [
    {
        id: 1,
        group: "11",
        subject: "Алгебра и теория чисел",

    },
    {
        id: 2,
        group: "22",
        subject: "Шаблоны проектирования",
    },
    {
        id: 3,
        group: "91",
        subject: "Шаблоны проектирования",

    }
];


class AttedenceList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            attedence: ATTEDENCE
        }
    }

    createAttedenceTable() {
        let attedence = this.state.attedence;

        return (
            attedence.map((atd) => {
                return (
                    <tr key="{atd.id}">
                        <td>{atd.subject}</td>
                        <td>{atd.group}</td>
                        <td>
                            <Link to="/teacher/attedence/open"
                                className="btn btn-primary btn-sm">Открыть
                            </Link>
                            &nbsp;
                            <Link to="/teacher/attedence/delete"
                                className="btn btn-danger btn-sm">Удалить
                             </Link>
                        </td>
                    </tr>
                );
            })
        );
    }


    render() {


        return (
            <div>
                <div className="top-bar">
                    <div className="header">
                        <h3>Ваши учеты посещаемости</h3>
                    </div>
                    <div className="actions">
                        <div className="action">
                            <Link to="/teacher/attedence/create"
                                className="btn btn-success">Создать новый
                            </Link>
                        </div>
                    </div>
                </div>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Предмет
                            </th>
                            <th>
                                Группа
                            </th>
                            <th>
                                <form className="form-inline form">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Поиск</span>
                                        </div>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="введите предмет..."
                                            aria-label="Username"
                                            aria-describedby="basic-addon1" />
                                    </div>
                                </form>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.createAttedenceTable()}
                    </tbody>
                </table>

            </div>
        );
    }
};

export default class Attedence extends React.Component {
    constructor(props) {
        super(props);

 
    }




    render() {


        return (
            <div>
                <Switch>
                    <Route path="/teacher/attedence/create" component={AttedenceForm} />
                    <Route path="/teacher/attedence/open" component={AttedenceTable} />
                    <Route exact path='/teacher/attedence/' component={AttedenceList} />
                </Switch>
            </div>
        );
    }
};