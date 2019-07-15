let processResponse = function(response){
    if(response.status==200) return Promise.resolve(response);
    else  return Promise.reject(response.statusText);
}



let jsonResponse = function (response){
    return response.json();
}

let errorResponse = function (error) {
    return new Error(error);
}

export {
    processResponse,
    jsonResponse,
    errorResponse
}