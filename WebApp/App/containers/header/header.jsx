import React from 'react';
import { Link } from 'react-router-dom';



export default class Header extends React.Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-default" role="navigation">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">Library</Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                        <ul className="nav navbar-nav">

                            <li>
                                <Link to="/">Home</Link>
                            </li>

                            <li>
                                <Link to="/about">About</Link>
                            </li>

                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Dropdown <b className="caret"></b></a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/sign-up">Sign up</Link>
                                    </li>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </nav>
            </header>
        );
    }
};