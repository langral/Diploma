import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGroups } from './groupAPI.jsx'
import Pagination from '../../utils/pagination.jsx'
import { deleteGroup } from './groupAPI.jsx'

export default class GroupsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            records: [],
            currentPage: 1,
            totalElements: "",
            pageSize: 5,
            recordsSubject: []
        }

        this.getAllGroups = this.getAllGroups.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
       // this.searchHandler = this.searchHandler.bind(this);
    }

    getAllGroups(page) {
        let p = this.state.currentPage;
        if (page)
            p = page;
        getGroups(p,
            (pageInfo) => {
                console.log(pageInfo);
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

    deleteHandler(e) {
        let id = e.target.dataset.id;

        deleteSubject(id,
            (data) => {
                this.getAllSubjects();
                console.log("ok");
            },
            (error) => {
                console.log("not");
            }
        );

    }

    createId(str) {
        return "#" + str;
    }

    createGroupsTable() {
        let groups = this.state.records;

        return (
            groups.map((group) => {
                    return (
                        <tr key="{group.id}">
                            <td>{group.number}</td>
                                <td>
                                <Link to={`/admin/groups/edit/${group.id}`}
                                        className="btn btn-primary btn-sm" >Ред.
                                    </Link>
                                    &nbsp;
                                    <button
                                    className="btn btn-danger btn-sm" data-toggle="modal" data-target={this.createId(group.id)} >Удалить
                                    </button>
         
                                <div class="modal fade" id={group.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Удаление</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    Вы уверены что хотите удалить данный предмет?
                                                </div>
                                                <div class="modal-footer">
                                                <button type="button" class="btn btn-primary" onClick={this.deleteHandler} data-id={group.id} data-dismiss="modal">Да</button>
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

   /* searchHandler(e) {
        let value = e.target.value.toLowerCase();
        console.log(value);
        let filter = this.state.records.filter(record => {
            return record.name.toLowerCase().includes(value);
        });

        this.setState({ filterRecords: filter });
    }*/

    render() {
        

        return (
            <div>
                <div className="top-bar">
                    <div className="header">
                        <h3>Группы</h3>
                    </div>
                    <div className="actions">
                        <div className="action">
                            <Link to="/admin/groups/create"
                                className="btn btn-success" onClick={this.createViewHandler}>Добавить новую
                            </Link>
                        </div>
                    </div>
                </div>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
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
                                            placeholder="введите группу..."
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            onChange={this.searchHandler}
                                        />
                                    </div>
                                </form>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.createGroupsTable()}
                    </tbody>
                </table>
                <Pagination currentPage={this.state.currentPage}
                            totalElements={this.state.totalElements}
                    update={this.getAllGroups} />
            </div>
        );
    }
};