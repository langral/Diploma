import { getItem } from '../../../utils/localStorageTools.jsx'
import { AUTH_KEY } from '../../../settings/settings.jsx'

function checkStatus(response) {
    if (response.ok) {
        try {
            return Promise.resolve(response.json())
        }
        catch (e) {
            console.log(e);
        }
    }

    return response.json().then(json => {
        const error = new Error(json.message || response.statusText)
        error.errors = json.errors;
        return Promise.reject(Object.assign(error, { response }))
    })
}

export function createSubject(subject, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.subjects,
        {
            method: "POST",
            headers,
            body: JSON.stringify(subject)
        })
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            onError && onError(error);
        });
}

export function getSubjects(page, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.subjects + `/?page=${page}`,
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

export function deleteSubject(id, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.subjects + `/?id=${id}`,
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

export function editSubject(subject, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.subjects,
        {
            method: "PUT",
            headers,
            body: JSON.stringify(subject)
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

export function getSubject(id, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.subjects + `/${id}`,
        {
            method: "GET",
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