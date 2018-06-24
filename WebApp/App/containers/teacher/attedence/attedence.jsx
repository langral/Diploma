import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AttedenceForm from './attedenceForm.jsx';
import AttedenceTable from './attedenceTable.jsx';
import { getAttendence, deleteMagazine } from './api.jsx'
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

    createId(str) {
        return "#" + str;
    }

    deleteHandler(e) {
        let id = e.target.dataset.id;
        deleteMagazine(id,
            (data) => {
                this.getAllAttendences();
            },
            (error) => {
                this.getAllAttendences();
            }
        );
    }


    createAttedenceTable() {
        let attedence = this.state.records;
  
        return (
            attedence.map((atd) => {
                return (
                    <tr key={atd.id}>
                        <td>{atd.subject.name}</td>
                        <td>{atd.group.number}</td>
                        <td>{atd.level}</td>
                        <td>{atd.specialty}</td>
                        <td>
                            <Link to={`/teacher/attedence/open/${atd.id}`}
                                className="btn btn-primary btn-sm">Открыть
                            </Link>
                            &nbsp;
                            <button
                                className="btn btn-danger btn-sm" data-toggle="modal" data-target={this.createId(atd.id)} >Удалить
                             </button>

                            <div class="modal fade" id={atd.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Удаление</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            Вы уверены что хотите удалить данную группу?
                                                </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" onClick={this.deleteHandler.bind(this)} data-id={atd.id} data-dismiss="modal">Да</button>
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Нет</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                Образование
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