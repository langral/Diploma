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

export function createStudent(student, onSuccess, onError) {
    return fetch(constants.students,
        {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(student)
        })
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            onError && onError(error);
        });
}

export function getStudents(page, onSuccess, onError) {
    return fetch(constants.students + `/?page=${page}`,
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

export function deleteStudent(id, onSuccess, onError) {
    return fetch(constants.students + `/?id=${id}`,
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

export function editStudent(student, onSuccess, onError) {
    return fetch(constants.students,
        {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(student)
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

export function getStudent(id, onSuccess, onError) {
    return fetch(constants.students + `/${id}`,
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