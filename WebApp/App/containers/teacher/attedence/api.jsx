﻿import { getItem } from '../../../utils/localStorageTools.jsx'
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


export function getCourses(onSuccess, onError) {

    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };

    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.courses + `/?page=${null}`,
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


export function getGroupss(courseId, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.groupsForTeacher + `/${courseId}`,
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

export function getAttendence(page, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;
    return fetch(constants.magazine + `/?page=${page}`,
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


export function getSubjects(groupId, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.subjectsForTeacherByGroup + `/${groupId}`,
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


export function createMagazine(magazine, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.magazineCreate,
        {
            method: "POST",
            headers,
            body: JSON.stringify(magazine)
        })
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            onError && onError(error);
        });
}


export function getMagazine(id, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.getMagazineById + `/${id}`,
        {
            method: "GET",
            headers,
        })
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            onError && onError(error);
        });
}

export function magazineCreateRecords(data, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.magazineCreateRecord,
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

export function magazineCreateComments(data, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.magazineCreateComments,
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

export function getMagazineAsJson(id, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.getMagazineAsJson + `/${id}`,
        {
            method: "GET",
            headers,
        })
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            onError && onError(error);
        });
}


export function deleteMagazine(id, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;

    headers['Authorization'] = auth.Authorization;
    return fetch(constants.deleteMagazine +`/${id}`,
        {
            method: "DELETE",
            headers,
        })
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            onError && onError(error);
        });
}



function checkServiceStatus(response) {
    if (response.ok) {
        try {
            return Promise.resolve(response.arrayBuffer())
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


export function sendJsonToService(magazine, onSuccess, onError) {
    let headers = {
        'content-type': 'application/json',
    }
    return fetch(constants.getMagazineDocx,
        {
            method: "POST",
            headers,
            body: JSON.stringify(magazine)
        })
        .then((response) => {
            return checkServiceStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            onError && onError(error);
        });
}

