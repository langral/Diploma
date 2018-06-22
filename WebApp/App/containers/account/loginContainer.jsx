import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Login from './login.jsx'
import { request } from '../../api/api.jsx';
import { login } from './loginActions.jsx'

let mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.auth,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(login(data))
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;