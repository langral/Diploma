import React from 'react';
import { Link } from 'react-router-dom';
import { getItem } from '../../utils/localStorageTools.jsx'
import { AUTH_KEY } from '../../settings/settings.jsx'
import PropTypes from 'prop-types';


export default class Header extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);       

        this.state = {
            isAuth: getItem(AUTH_KEY) ? true : false
        }
    }

    createButton() {
        if (getItem(AUTH_KEY))
            return (
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.clearStorage.bind(this)}>Выйти</button>
            );
    }

    clearStorage() {
        localStorage.clear();
        window.location = "/";
       
    }

    render() {
   
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Учет студентов v1.0.0</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                         
                        </ul>
                    </div>

                    <form className="form-inline">
                        {this.createButton()}
                    </form>

                </nav>
            </header>
        );
    }
};