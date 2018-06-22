export function setItem(key, value) {
    if (!key) throw new Error("Key is not defined!");
    if (!value) throw new Errro("Value is not defined!");

    let jsonValue = JSON.stringify(value);

    localStorage.setItem(key, jsonValue);
}

export function getItem(key) {
    if (!key) throw new Error("Key is not defined!");

    let jsonValue = localStorage.getItem(key);

    if (jsonValue)
        jsonValue = JSON.parse(jsonValue);

    return jsonValue;
}