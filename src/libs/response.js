let processResponse = function (response) {
    if (response.status === 200) return Promise.resolve(response);
    else return Promise.reject(response.statusText);
}



let jsonResponse = function (response) {
    return new Promise((resolve) => {
        if (response) {
            response.json()
                .then(json => resolve(json))
                .catch(() => {
                    response.text()
                        .then(text => resolve(text))
                        .catch(() => resolve(''))

                })
        } else {
            resolve('');
        }
    })

}

let errorResponse = function (error) {
    return new Error(error);
}

export {
    processResponse,
    jsonResponse,
    errorResponse
}