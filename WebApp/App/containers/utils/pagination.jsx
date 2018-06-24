import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.pageHandler = this.pageHandler.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    createPages() {
        if (this.props.currentPage && this.props.totalElements) {
            return (
                [...Array(this.props.totalElements).keys()].map((i) => { 
                    let index = ++i;
                    if (index === this.props.currentPage) 
                        return (
                            <li key={index} className="page-item active"><span className="page-link" onClick={this.pageHandler} >{index}</span></li>
                        );
                    else
                        return (
                            <li key={index}  className="page-item"><span className="page-link" onClick={this.pageHandler} >{index}</span></li>
                        );
                })
            )
        }
    }

    pageHandler(e) {
        if (this.props.update) {
            let page = parseInt(e.target.innerText, 10);
            this.props.update(page);
        }
    }

    nextPage() {
        let currentPage = this.props.currentPage,
            totalElements = this.props.totalElements,
            newPage = (currentPage < totalElements) ? ++currentPage : currentPage;
        this.props.update(newPage);
    }

    prevPage() {
        let currentPage = this.props.currentPage,
            totalElements = this.props.totalElements,
            newPage = (currentPage > 1) ? --currentPage : currentPage;
        this.props.update(newPage);
    }

    render() {
        return (
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                    <li className="page-item"><span className="page-link" onClick={this.prevPage}>&#60;&#60;</span></li>
                        { this.createPages() }
                    <li className="page-item"><span className="page-link" onClick={this.nextPage}>&#62;&#62;</span></li>
                    </ul>
                </nav>
            );
    }

};