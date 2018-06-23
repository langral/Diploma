import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Pagination from '../../utils/pagination.jsx'
import AttestationForm from './attestationForm.jsx';
import { getAttestation } from './api.jsx'
import AttestationTable from './attestationTable.jsx';

class AttestationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            records: [],
            currentPage: 1,
            totalElements: "",
            pageSize: 5
        }

        this.getAllAttestation = this.getAllAttestation.bind(this);
    }

    componentWillMount() {
        this.getAllAttestation();
    }

    getAllAttestation(page) {

        let p = null;
        if (page)
            p = page;

        getAttestation(p,
            (pageInfo) => {
                this.setState(pageInfo);
            },
            () => {
                console.log('Error');
            }
        );
        
    }

    createAttestationTable() {
        let attestation = this.state.records;

        return (
            attestation.map((atd) => {
                return (
                    <tr key="{atd.id}">
                        <td>{atd.subject.name}</td>
                        <td>{atd.department}</td>
                        <td>{atd.speciality}</td>
                        <td>
                            <Link to={`/teacher/attestation/open/${atd.id}`}
                                className="btn btn-primary btn-sm">Открыть
                            </Link>
                            &nbsp;
                            <Link to="/teacher/attestation/delete"
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
                        <h3>Ваши аттестации</h3>
                    </div>
                    <div className="actions">
                        <div className="action">
                            <Link to="/teacher/attestation/create"
                                className="btn btn-success">Создать аттестацию
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
                        {this.createAttestationTable()}
                    </tbody>
                </table>

                <Pagination currentPage={this.state.currentPage}
                    totalElements={this.state.totalElements}
                    update={this.getAllAttestation} />

            </div>
        );
    }
};

export default class Attestation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/teacher/attestation/create" component={AttestationForm} />
                    <Route path="/teacher/attestation/open/:id" component={AttestationTable} />
                    <Route exact path='/teacher/attestation/' component={AttestationList} />
                </Switch>
            </div>
        );
    }
};