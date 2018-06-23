import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAttestationById, getSubjectsGroupsBySubject, createAttestationRecords, getAllAttestationRecordsApi } from './api.jsx'


export default class AttestationTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            records: [],
            attestationRecords: [],
            selectedGroup: null,
        }

        this.id = this.props.match.params.id;
        this.goBack = this.goBack.bind(this);
    }


    componentWillMount() {
        if (this.id) {
            this.getMagazineById();
            this.getAllAttestationRecords();
        }
            

    }

    getGroups() {
        let groups = this.state.groups;

        return (
            groups.map((group) => {
                return (
                    <option value={group.id}>{group.number}</option>
                );
            })
        );
    }

    getAllAttestationRecords() {

        if (this.id)
            getAllAttestationRecordsApi(
                this.id,
                (data) => {
                    this.setState({ attestationRecords: data.records })
                },
                (er) => { console.log(er) });
    }

    getAllSubjects() {
     
        if (this.state.subject)
            getSubjectsGroupsBySubject(
                this.state.subjectId,
                (data) => {
                    this.setState({ groups: data.records })
                },
                (er) => { console.log(er) });
    }

    getMagazineById() {
        getAttestationById(this.id,
            (data) => { this.setState(data) },
            (er) => { console.log(er) });
    }

    goBack() {
        this.props.history.goBack();
    }


    showSubject() {
        if (this.state.subject) {
            return this.state.subject;
        }
    }

    format(date) {

        let dat = date.toString();

        dat = dat.length == 1 ? "0" + dat : dat;



        return dat;
    }

    showAttestationRecords() {

        return (
            this.state.attestationRecords.map((el) => {
               
                let currentDate = new Date(el.date);

                currentDate = `${this.format(currentDate.getDate())}.${this.format(currentDate.getMonth())}.${currentDate.getFullYear()}`;
                return (<tr key={el.id}>
                    <td>{el.course}</td>
                    <td>{el.group}</td>
                    <td>{currentDate}</td>
                    <td>
                        <button className="btn btn-primary"  >
                           Редактировать
                        </button>
                    </td>
                </tr>)
            })
        );
    }

    createRecordsInput() {
        if (this.state.selectedGroup)
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Студент</th>
                            <th>Отметка</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.selectedGroup.student.map((elem, index) => {

                                return (
                                    <tr key={index}>

                                        <td style={
                                            {
                                                paddingRight: "20px",
                                                width: "100%"
                                            }}>{elem.name}
                                        </td>

                                        <td style={{ width: "30px" }}>
                                            <input
                                                type="text"
                                                name={elem.id}
                                                id={elem.name}
                                                required=""
                                                className="form-control"
                                            />
                                        </td>

                                    </tr>
                                );
                            })
                        }
                        <tr>
                            <td colSpan="2">
                                <br />
                                <hr />
                                <label
                                    htmlFor="date"
                                    className="control-label">
                                    Контингент студентов
                                </label>
                                <textarea
                                    ref="contingent"
                                    className="form-control"
                                ></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
    }

    onChangeGroup(e) {
        let id = parseInt(e.target.value, 10);
        let selected = null;

        if (this.state.groups) {
            selected = this.state.groups.filter(el => el.id == id)[0];
        }

        if (selected)
            this.setState({ selectedGroup: selected });
    }

    closePopup() {      
        this.setState({ selectedGroup: null, groups: [] });
    }

    attestate() {
        let form = this.refs.sumbitForm;

        if (!form) return;
        let date = form.querySelector("input[type='date']").value;

        date = this.convertDate(date);
        let contingent = this.refs.contingent.value;

        if (!date) return;

        let inputs = Array.from(form.querySelectorAll("input[type='text']"))
            .map((el) => {
                return {
                    studentId: el.name,
                    note: el.value ? el.value : "н"
                }
            });

        if (!inputs) return;

        let data = {
            attestationId: this.id,
            groupId: this.state.selectedGroup.id,
            date: date,
            contingentOfStudents: contingent,
            marks: inputs,
            
        };

        this.setState({ ...this.state, selectedGroup: null, groups: [] });

        createAttestationRecords(data,
            (data) => { this.getAllAttestationRecords(); },
            (er) => { this.getAllAttestationRecords();});
    }

    convertDate(date) {
        var date = new Date(date);
        var day = date.getDate();       // yields date
        var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
        var year = date.getFullYear();  // yields year
        var hour = date.getHours();     // yields hours 
        var minute = date.getMinutes(); // yields minutes
        var second = date.getSeconds(); // yields seconds

        // After this construct a string with the above results as below
        return day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second;
    }

    doAttestation(id) {

        return (
            <form ref="sumbitForm" className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Добавить запись</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="form-group" style={{ textAlign: "left" }} >
                                <label
                                    htmlFor="date"
                                    className="control-label">
                                    Дата
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    required=""
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="group">Группа: </label>
                                <select onChange={this.onChangeGroup.bind(this)} name="groupId" ref="groupList" className="form-control" id="group">
                                    <option defaultValue>Выберите группу...</option>
                                    {this.getGroups()}
                                </select>
                            </div>

                            {this.createRecordsInput()}
                           

                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.attestate.bind(this)}  className="btn btn-primary" data-dismiss="modal">Сохранить</button>
                            <button type="button" onClick={this.closePopup.bind(this)} className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    attOn() {
        this.getAllSubjects();
    }

    render() {
   
        return (
            <div>
                <div className="top-bar">
                    <div className="header">
                        <h3>Итоговая аттестация</h3>
                        <h5>по дисциплине {this.showSubject()}</h5>
                    </div>
                    <div className="actions">
                        <div className="action">
                            <button onClick={this.goBack}
                                className="btn btn-success">Назад
                            </button>
                        </div>
                        <div className="action">
                            <button className="btn btn-primary" onClick={this.attOn.bind(this)} data-toggle="modal" data-target="#doAttestation" >
                                Провести аттестацию
                            </button>
                            {this.doAttestation("doAttestation")}
                        </div>

                        <div className="action">
                            <button className="btn btn-primary" data-toggle="modal" data-target="#addRecord" >
                                Скачать в .docx
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="table-wrap">

                    <table className="table attedence-table" >
                        <thead>
                            <tr>
                                <th>
                                    Курс
                                </th>
                                <th>
                                    Группа
                                </th>
                                <th>
                                    Дата проведения
                                </th>               
                                <th>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showAttestationRecords()}
                        </tbody>
                    </table>

                </div>

                
            </div>
        );
    }
};