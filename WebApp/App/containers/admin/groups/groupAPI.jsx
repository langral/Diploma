﻿function checkStatus(response) {
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

export function createGroup(group, onSuccess, onError) {
    return fetch(constants.groups,
        {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(group)
        })
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            onError && onError(error);
        });
}

export function getGroups(page, onSuccess, onError) {
    return fetch(constants.groups + `/?page=${page}`,
        {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            }
        })
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            onError && onError(error);
        });
}

export function deleteGroup(id, onSuccess, onError) {
    return fetch(constants.groups + `/?id=${id}`,
        {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            }
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

export function editGroup(group, onSuccess, onError) {
    return fetch(constants.groups,
        {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(group)
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

export function getGroup(id, onSuccess, onError) {
    return fetch(constants.groups + `/${id}`,
        {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            }
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