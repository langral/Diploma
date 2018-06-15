import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const STUDENTS = [
    {
        id: 1,
        name: "Безрядина Виктория",
        note: "",
        records: [
            {
                date: "15.04.18",
                note: "+"
            },
            {
                date: "16.04.18",
                note: "+"
            },
            {
                date: "20.04.18",
                note: "+"
            },
            {
                date: "26.04.18",
                note: "-"
            }
        ]
    },
    {
        id: 2,
        name: "Ерина Наталья",
        note: ""
        ,
        records: [
            {
                date: "15.04.18",
                note: "+"
            },
            {
                date: "16.04.18",
                note: "+"
            },
            {
                date: "20.04.18",
                note: "+"
            },
            {
                date: "26.04.18",
                note: "+"
            }
        ]
    },
    {
        id: 3,
        name: "Зинченко Михаил",
        note: "",
        records: [
            {
                date: "15.04.18",
                note: "+"
            },
            {
                date: "16.04.18",
                note: "-"
            },
            {
                date: "20.04.18",
                note: "+"
            },
            {
                date: "26.04.18",
                note: "-"
            }
        ]
    },
    {
        id: 4,
        name: "Костельнюк Артем",
        note: "",
        records: [
            {
                date: "15.04.18",
                note: "+"
            },
            {
                date: "16.04.18",
                note: "+"
            },
            {
                date: "20.04.18",
                note: "+"
            },
            {
                date: "26.04.18",
                note: "-"
            }
        ]
    },
    {
        id: 5,
        name: "Кудашева Надежда",
        note: "",
        records: [
            {
                date: "15.04.18",
                note: "+"
            },
            {
                date: "16.04.18",
                note: "+"
            },
            {
                date: "20.04.18",
                note: "+"
            },
            {
                date: "26.04.18",
                note: "-"
            }
        ]
    },
    {
        id: 6,
        name: "Маньшин Илья",
        note: "",
        records: [
            {
                date: "15.04.18",
                note: "+"
            },
            {
                date: "16.04.18",
                note: "+"
            },
            {
                date: "20.04.18",
                note: "+"
            },
            {
                date: "26.04.18",
                note: "-"
            }
        ]
    },
    {
        id: 7,
        name: "Меджидов Руслан",
        note: "",
        records: [
            {
                date: "15.04.18",
                note: "+"
            },
            {
                date: "16.04.18",
                note: "+"
            },
            {
                date: "20.04.18",
                note: "+"
            },
            {
                date: "26.04.18",
                note: "-"
            }
        ]
    },
    {
        id: 8,
        name: "Нехороших Анна",
        note: "",
        records: [
            {
                date: "15.04.18",
                note: "+"
            },
            {
                date: "16.04.18",
                note: "+"
            },
            {
                date: "20.04.18",
                note: "+"
            },
            {
                date: "26.04.18",
                note: "-"
            }
        ]
    },
    {
        id: 9,
        name: "Польшаков Дмитрий",
        note: "",
        records: [
            {
                date: "15.04.18",
                note: "+"
            },
            {
                date: "16.04.18",
                note: "+"
            },
            {
                date: "20.04.18",
                note: "+"
            },
            {
                date: "26.04.18",
                note: "-"
            }
        ]
    },
    {
        id: 10,
        name: "Яцун Никита",
        note: "",
        records: [
            {
                date: "15.04.18",
                note: "+"
            },
            {
                date: "16.04.18",
                note: "+"
            },
            {
                date: "20.04.18",
                note: "+"
            },
            {
                date: "26.04.18",
                note: "-"
            }
        ]
    }
]


export default class AttedenceTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            students: STUDENTS,
            records: []
        }


        this.goBack = this.goBack.bind(this);
        this.getTable = this.getTable.bind(this);
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

        //сортировка
        this.setState({
            students: students,
            records: records
        });

    }

    getRecordsFromStudent(student) {
        return (
           student.records.map((record) => {
                return (
                        <td>{record.note}</td>
                    );
           })
        );
    }

    getTable() {
        let students = this.state.students;

        return (
            students.map((student) => {
                return (
                    <tr>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        {this.getRecordsFromStudent(student)}
                        <td>{student.note}</td>
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
                        <h3>Учет посещаемости 91 группы</h3>
                        <h5>Шаблоны проектирования</h5>
                    </div>
                    <div className="actions">
                        <div className="action">
                            <button onClick={this.goBack}
                                className="btn btn-success">Назад
                            </button>
                        </div>
                        <div className="action">
                            <Link to="/admin/teachers/create"
                                className="btn btn-primary">Добавить запись
                             </Link>
                        </div>                      
                    </div>
                </div>
                <hr />
                <table className="table attedence-table">
                    <thead>
                        <tr>
                            <th>
                                №
                            </th>
                            <th>
                                ФИО
                            </th>
                            <th>
                                16.04.18
                            </th>
                            <th>
                                23.04.18
                            </th>
                            <th>
                                26.04.18
                            </th>
                            <th>
                                5.05.18
                            </th>
                            <th>
                                Примечание
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getTable()}
                    </tbody>
                </table>

                
            </div>
        );
    }
};