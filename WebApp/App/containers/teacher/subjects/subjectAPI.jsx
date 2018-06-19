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

export function getSubjectsForTeacherId(params, onSuccess, onError) {
    return fetch(constants.subjects + `/${params.page}/${params.idTeacher}`,
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
