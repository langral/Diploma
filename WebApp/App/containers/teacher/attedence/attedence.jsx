import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AttedenceForm from './attedenceForm.jsx';
import AttedenceTable from './attedenceTable.jsx';
import { getAttendence } from './api.jsx'
import Pagination from '../../utils/pagination.jsx'

class AttedenceList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            records: [],
            currentPage: 1,
            totalElements: "",
            pageSize: 5
        }

        this.getAllAttendences = this.getAllAttendences.bind(this);
    }

    componentWillMount() {
        this.getAllAttendences();
    }

    getAllAttendences(page) {

        let p = this.state.currentPage;

        if (page)
            p = page;
        getAttendence(p,
            (pageInfo) => {
                this.setState(pageInfo);
            },
            () => {
                console.log('Error');
            }
        );
     }

    createAttedenceTable() {
        let attedence = this.state.records;
        console.log(attedence);
        return (
            attedence.map((atd) => {
                return (
                    <tr key="{atd.id}">
                        <td>{atd.subject.name}</td>
                        <td>{atd.group.number}</td>
                        <td>{atd.faculty}</td>
                        <td>{atd.specialty}</td>
                        <td>
                            <Link to={`/teacher/attedence/open/${atd.id}`}
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
                                Факультет
                            </th>
                            <th>
                                Направление
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

                <Pagination currentPage={this.state.currentPage}
                    totalElements={this.state.totalElements}
                    update={this.getAllAttendences} />

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
                    <Route path="/teacher/attedence/open/:id" component={AttedenceTable} />
                    <Route exact path='/teacher/attedence/' component={AttedenceList} />
                </Switch>
            </div>
        );
    }
};