import { AUTH_SUCCESS, AUTH_ERROR } from './loginConstants.jsx'
import { request } from '../../api/api.jsx';

export function success(data) {
    return {
        type: AUTH_SUCCESS,
        data: data
    }
}

export function error(err) {
    return {
        type: AUTH_ERROR,
        error: err
    }
}

export function login(data) {
    return (dispatch) => {

        if (!constants.login) throw new Error("Can't resolve URI");

        let route = constants.login;

        request("POST", route, data,
            (data) => { dispatch(success(data)); },
            (ex) => { dispatch(error(ex)); }
        );
    }
}