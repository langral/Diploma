import { getItem } from '../../../utils/localStorageTools.jsx'
import { AUTH_KEY } from '../../../settings/settings.jsx'

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response.json())
    }

    return response.json().then(json => {
        const error = new Error(json.message || response.statusText)
        error.errors = json.errors;
        return Promise.reject(Object.assign(error, { response }))
    })
}


export function register(user, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.register,
        {
            method: "POST",
            headers,
            body: JSON.stringify(user)
        })
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            onError && onError(error);
        });
}

export function getTeachers(page, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.teachers + `/?page=${page}`,
        {
            method: "GET",
            headers
        })
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            onError && onError(error);
        });
}

export function deleteTeacher(id, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;

    headers['Authorization'] = auth.Authorization;
    return fetch(constants.teachers + `/?id=${id}`,
        {
            method: "DELETE",
            headers
        })
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            console.log(error);
            onError && onError(error);
        });
}

export function createGroupTeacher(gt, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;

    return fetch(constants.teachersAssingToGroups,
        {
            method: "POST",
            headers,
            body: JSON.stringify(gt)
        })
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            onError && onError(error);
        });
}

export function createSubjectTeacher(st, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;

    return fetch(constants.teachersAssingToSubject,
        {
            method: "POST",
            headers,
            body: JSON.stringify(st)
        })
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            onError && onError(error);
        });
}


export function getGroupsBySubject(data, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.groupsBySubjects,
        {
            method: "POST",
            headers,
            body: JSON.stringify(data)
        })
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            onError && onError(error);
        });
}