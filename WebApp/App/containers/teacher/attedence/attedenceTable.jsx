﻿import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMagazine, magazineCreateRecords, getMagazineAsJson, sendJsonToService, magazineCreateComments } from './api.jsx'
import fileDownload from 'js-file-download';

export default class AttedenceTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            group: null,
            records: [],
            errors: [],
            success: false
        };

        this.id = this.props.match.params.id;
        this.goBack = this.goBack.bind(this);
        this.getTable = this.getTable.bind(this);
        this.getErrors = this.getErrors.bind(this);
    }


    componentWillMount() {
        if (this.id)
            this.getMagazineById();
    }

    getMagazineById() {
        getMagazine(this.id,
            (data) => { this.setState(data) },
            (er) => { console.log(er) });
    }

    goBack() {
        this.props.history.goBack();
    }

    getRecords() {
        let students = this.state.students;
        let records = this.state.records;

        for (let student of students) {
            if (student.records) {
   
               for (let record of student.records) {
                   if (records.indexOf(record.date) > 0) {
                       records.push(record.date);
                   }
               }
                
            }
        }

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
        return  day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second; 
    }

    format(date) {
       
        let dat = date.toString();
  
        dat = dat.length == 1 ? "0" + dat : dat;

  

        return dat;
    }

    getRecordsToTh(student) {
        if (this.state.group) {
            let student = this.state.group.student;
            let date = [];

            student.map((st) => {
                
                st.record.map(el => {
                    let currentDate = new Date(el.date);

                    currentDate = `${this.format(currentDate.getDate())}.${this.format(currentDate.getMonth())}.${currentDate.getFullYear()}`;
                    if (date.indexOf(currentDate) === -1) {
                        date.push(currentDate);
                    }
                 
                    
                });
                
                
            })
            return (
                date.map((record) => {
                    return (
                        <th style={{ textAlign: "center" }}>{record}</th>
                    );
                })
            );
        }
    }

    getRecordsFromStudent(student) {
      
        return (
           student.record.map((record) => {
                return (
                    <td style={{ textAlign: "center" }}>{record.visit}</td>
                    );
           })
        );
    }

    createId(str) {
        return "#" + str;
    }


    getTable() {
        if (this.state.group) {
            let students = this.state.group.student;

            return (
                students.map((student, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            {this.getRecordsFromStudent(student)}
                            <td>
                                {student.comment[0] ?
                                    ( student.comment[0].note )
                                        :
                                    (
                                        "-"
                                    )}
                            </td>
                        </tr>

                    );
                })
            );
        } 
    }
   
    showGroupNumber() {
        console.log(this.state);
        if (this.state.group) {
            return this.state.group.number;
        }
    }

    showSubject() {
        if (this.state.subject) {
            return this.state.subject.name;
        }
    }

    createRecordsInput(students) {
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
                    students.map((elem, index) => {

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
                </tbody>
            </table>
        )
    }

    createCommentsInput(students) {
        return (
            <table style={
                {
                    width: "100%",

                }}>
                <thead>
                    <tr>
                        <th style={
                            {
                                paddingRight: "20px",
                                textAlign: "left",
                            }}>Студент</th>
                        <th>Примечание</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((elem, index) => {

                            return (
                                <tr key={index}>

                                    <td style={
                                        {
                                            paddingRight: "20px",
                                            textAlign: "left",
                                        }}>{elem.name}
                                    </td>

                                    <td style={
                                        {
                                            width: "200px",

                                        }}>
                                        <textarea
                                            style={
                                                {
                                                    height: "50px",

                                                }}
                                            name={elem.id}
                                            id={elem.name}
                                            required=""
                                            className="form-control"
                                        ></textarea>
                                    </td>

                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        )
    }


    showSuccess(success) {
        if (success) {
            return (
                <div class="alert alert-success" role="alert">
                    {this.state.success}
                </div>
            );
        } else {
            return (
                <div className="hidden" ></div>
            )
        }
    }


    getErrors() {
        if (this.state.errors.length > 0) {
            let errors = this.state.errors.map((error, index) => {
                return (
                    <p key={index}>{error}</p>
                );
            });

            return (
                <div className="alert alert-danger">
                    {errors}
                </div>
            );
        }
    }

 
    submitRecords(e) {
   
        let form = this.refs.sumbitForm;

        if (!form) return;
        let date = form.querySelector("input[type='date']").value;

        date = this.convertDate(date);

       
        if (!date) return;

        let inputs = Array.from(form.querySelectorAll("input[type='text']"))
            .map((el) => {
                return {
                    date: date,
                    studentId: el.name,
                    note: el.value ? el.value : "-"
                }
            });

        if (!inputs) return;

        let data = {
            magazineId: this.id,
            records: inputs
        };

        magazineCreateRecords(data,
            (data) => {
                this.setState({ success: data.success, errors: [] });
                this.getMagazineById()
            },
            (er) => {
                this.setState({ errors: er.errors, success: false });
                this.getMagazineById()
            }
        );
    }

    submitComments(e) {
        let form = this.refs.commentForm;

        if (!form) return;
       

        date = this.convertDate(date);


        if (!date) return;

        let inputs = Array.from(form.querySelectorAll("textarea"))
            .map((el) => {
       
                return {
                    studentId: el.name,
                    note: el.value ? el.value : "н"
                }
            });

        if (!inputs) return;

        let data = {
            magazineId: this.id,
            records: inputs
        };

        magazineCreateComments(data,
            (data) => {
                this.setState({ success: data.success, errors: [] });
                this.getMagazineById()
            },
            (er) => {
                this.setState({ errors: er.errors, success: false });
                this.getMagazineById()
            }
        );

    }

    addRecord(id) {
        let students = this.state.group;
  
        if (students)
            students = students.student;
        else
            return;
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
                                    defaultValue={new Date().toISOString().substr(0, 10)}
                                />
                            </div>

                            {this.createRecordsInput(students)}

                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.submitRecords.bind(this)} className="btn btn-primary" data-dismiss="modal">Сохранить</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }



    addComment(id) {
        let students = this.state.group;

        if (students)
            students = students.student;
        else
            return;

        return (
                <div>
                     <div ref="commentForm"  className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Примечание</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">

                                    {this.createCommentsInput(students)}

                                </div>
                                <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.submitComments.bind(this)}  data-dismiss="modal">Сохранить</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }

    sendMagazineToService(data) {
        console.log(data);
        sendJsonToService(data,
            (data) => {
                let fileName = `AttendanceOfGroup${this.state.group.number}.docx`;
                fileDownload(data, fileName);
                this.setState({ isFileDownloaded: false });
            },
            (er) => { console.log(er) });
    }

    downloadAsJson() {

        this.setState({ isFileDownloaded: true });
        getMagazineAsJson(this.id,
            (data) => { this.sendMagazineToService(data) },
            (er) => { console.log(er) });
    }

    showDownloadButton() {
        if (this.state.isFileDownloaded) {
            return (
                <div className="loader">
                    <img src={loader} />
                </div>
            );
        }

        return (
            <button className="btn btn-primary" onClick={this.downloadAsJson.bind(this)}  >
                Скачать в .docx
                </button>
        );
    }

    render() {
        return (
            <div>
                <div className="top-bar">
                    <div className="header">
                        <h3>Учет посещаемости {this.showGroupNumber()} группы</h3>
                        <h5>по дисциплине {this.showSubject()}</h5>
                    </div>
                    <div className="actions">
                        <div className="action">
                            <button onClick={this.goBack}
                                className="btn btn-success">Назад
                            </button>
                        </div>
                        <div className="action">
                            <button className="btn btn-primary" data-toggle="modal" data-target="#addRecord" >
                                Добавить запись
                            </button>
                            {this.addRecord("addRecord")}
                        </div>

                        <div className="action">
                            {this.showDownloadButton()}
                        </div>
                    </div>
                </div>
                <hr />

                {this.getErrors() && (this.getErrors())}
                {this.showSuccess(this.state.success)}


                <div className= "table-wrap">
                    <table className="table attedence-table" >
                        <thead>
                            <tr>
                                <th>
                                    №
                                </th>
                                <th>
                                    ФИО
                                </th>

                                {this.getRecordsToTh(this.state.group)}

                                <th style={{ textAlign: "right" }}>
                                    <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#addComment" >
                                        Добавить примечание
                                    </button>
                                    {this.addComment("addComment")}
                                </th>
                           
                            </tr>
                        </thead>
                        <tbody>
                            {this.getTable()}
                        </tbody>
                    </table>
                </div>

                
            </div>
        );
    }
};