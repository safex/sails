{
      "targets":[
        {
          "target_name": "build_rpc",
          "type": "none",
          "actions": [
            {
              "action_name": "build_golang_rpc",
              "inputs": ["bc_node/gosafex/pkg/json_rpc/json_rpc.go"],
              "outputs": [
                "bc_node/gosafex/pkg/json_rpc/json_rpc",
              ],
              "action": [
                "make", "--directory=bc_node/gosafex/pkg/json_rpc/"
              ],
              "message": "Building safex libraries"
            }
          ]
        }
    ]
}