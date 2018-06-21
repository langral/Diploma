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
    return fetch(constants.register,
        {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
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
    return fetch(constants.teachers + `/?page=${page}`,
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

export function deleteTeacher(id, onSuccess, onError) {
    return fetch(constants.teachers + `/?id=${id}`,
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

export function createGroupTeacher(gt, onSuccess, onError) {
    return fetch(constants.teachers,
        {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
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
    return fetch(constants.teachers,
        {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
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

