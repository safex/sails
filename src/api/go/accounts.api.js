let openAccountsApi = function(name){
    return fetch('http://localhost:2905/account/open',{method:'POST',body:JSON.stringify({name:name})});
}
let infoAccountsApi = function(name){
    return fetch('http://localhost:2905/account/info',{method:'POST',body:JSON.stringify({name:name})});
}
let getAccountsApi = function(){
    return fetch('http://localhost:2905/accounts/get',{method:'POST',data:{}});
}
let createAccountApi = function(){
    return fetch('http://localhost:2905/accounts/create',{method:'POST',data:{}});
}
let deleteAccountApi = function(address){
    return fetch('http://localhost:2905/accounts/delete',{method:'POST',data:{address:address}});
}
let recoverAccountKeysApi = function(spendkey,viewkey){
    return fetch('http://localhost:2905/accounts/recover',{method:'POST',data:{spendkey:spendkey, viewkey:viewkey}});
}
let recoverAccountSeedsApi = function(seed){
    return fetch('http://localhost:2905/accounts/recover',{method:'POST',data:{seed:seed}});
}
let historyAccountApi = function(address){
    return fetch('http://localhost:2905/accounts/history',{method:'POST',data:{address:address}});
}
let statusAccountApi = function(address){
    return fetch('http://localhost:2905/accounts/status',{method:'POST',data:{address:address}});
}
export {
    openAccountsApi,
    infoAccountsApi,
    getAccountsApi,
    createAccountApi,
    deleteAccountApi,
    recoverAccountKeysApi,
    recoverAccountSeedsApi,
    historyAccountApi,
    statusAccountApi
}