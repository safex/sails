let getStore= function(key,sucess,error){
    fetch('http://localhost:2905/store?key='+key,{method:'GET'}).then(sucess(response)).catch(error(error));

}

let setStore= function(obj,sucess,error){
    fetch('http://localhost:2905/store'+key,{method:'PUT',data:JSON.stringify(obj)}).then(sucess(response)).catch(error(error));
}