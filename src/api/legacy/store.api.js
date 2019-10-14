
let getStore= function(key){
    return fetch('http://localhost:2905/store/get',{method:'POST',data:{key:key}});

}

let setStore= function(obj){
    return fetch('http://localhost:2905/store/put',{method:'POST',data:JSON.stringify(obj)});
}
export {
    getStore,
    setStore
}