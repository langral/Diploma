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

export function getAttestation(page, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;
    return fetch(constants.getAttestation + `/?page=${page}`,
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

export function getAllAttestationRecordsApi(id, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.getAllAttestationRecords + `/${id}`,
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


export function getSubjectsGroupsBySubject(subject, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.getGroupsBySubject + `/${subject}`,
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


export function getSubjects(onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.subjectsForTeacher ,
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

export function getAttestationById(id, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.getAttestationById + `/${id}`,
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

export function createAttestation(attestation, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.createAttestation,
        {
            method: "POST",
            headers,
            body: JSON.stringify(attestation)
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


export function createAttestationRecords(data, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.createAttestationRecord,
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

export function getAttestationAsJson(id, onSuccess, onError) {
    let auth = { Authorization: `Bearer ${getItem(AUTH_KEY).authToken}` };
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;

    return fetch(constants.getAttestationAsJson + `/${id}`,
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
    return fetch(constants.getAttestationDocx,
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