function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response)
    }

    return response.json().then(json => {
        const error = new Error(json.message || response.statusText)
        error.errors = json.errors;
        return Promise.reject(Object.assign(error, { response }))
    })
}

export function register(user, onSuccess, onError) {
    return fetch(constants.login,
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
            console.log("data");
            console.log(data);
            onSuccess && onSuccess(data);
        }).catch((error) => {
            console.log("error");
            console.log(error);
            onError && onError(error);
        });
}