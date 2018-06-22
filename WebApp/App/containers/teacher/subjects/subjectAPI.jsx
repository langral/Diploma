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

export function getSubjectsForTeacherId(auth, onSuccess, onError) {
    let headers = {
        'content-type': 'application/json',
    }
    if (!auth) return;
    headers['Authorization'] = auth.Authorization;
    return fetch(constants.subjectsForTeacher,
        {
            method: "GET",
            headers: headers
        })
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            onSuccess && onSuccess(data);
        }).catch((error) => {
            onError && onError(error);
        });
}
