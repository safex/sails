let createApi = function (obj){
    return fetch('http://localhost:2905/init/create',{method:'POST',body:JSON.stringify(obj), headers: {'Content-Type': 'application/json'}});
}

let openApi = function (obj){
    return fetch('http://localhost:2905/init/open',{method:'POST',body:JSON.stringify(obj),headers: {'Content-Type': 'application/json'}});
}

let restoreSeedsApi = function (obj){
    return fetch('http://localhost:2905/init/recover-seed',{method:'POST',body:JSON.stringify(obj),headers: {'Content-Type': 'application/json'}});
}

let restoreKeysApi = function (obj){
    return fetch('http://localhost:2905/init/recover-keys',{method:'POST',body:JSON.stringify(obj),headers: {'Content-Type': 'application/json'}});
}

export {
    createApi,
    openApi,
    restoreSeedsApi,
    restoreKeysApi
}