
let getStore= function(key){
    return fetch('http://localhost:2905/store/get',{method:'POST',body:JSON.stringify({key:key})});

}

let setStore= function(obj){
    console.log(obj);
    return fetch('http://localhost:2905/store/put',{method:'POST',body:JSON.stringify(obj)});
}
export {
    getStore,
    setStore
}