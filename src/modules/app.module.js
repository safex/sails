let actions=require('../redux/actions/response.action')

module.exports.getIndex= function (that){
  fetch('http://localhost:2905/helloworld',{method:'POST'})
  .then(
    function(response) {
      if(response.status===200){
        response.json().then(function(data) {
          // that.props.dispatch(actions.addResponse(data.result.msg));
          });
      }
    }
  )
  .catch(function(err) {
    // that.props.dispatch(actions.addResponse(err));
  });

}