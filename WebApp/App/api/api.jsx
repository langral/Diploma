function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response.json());
    }

    return response.json().then(json => {
        const error = new Error(json.message || response.statusText)
        error.errors = json.errors;
        return Promise.reject(Object.assign(error, { response }))
    })
}

export function request(method, route, data, onSuccess, onError) {

    if (!method) throw new Error("Method of request is not defined!");
    if (!route) throw new Error("Soryy, I can't make a request without path. May you can do that?")

    let header = {
        method: method,
        headers: {
            'content-type': 'application/json'
        },
    };

    if (data) header.body = JSON.stringify(data);

     fetch(route, header)
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
             onError && onError(error);
        });
}