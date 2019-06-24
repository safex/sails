{
      "targets":[
        {
          "target_name": "build_rpc",
          "type": "none",
          'conditions': [
            ['OS=="win"', {
               "actions": [
            {
              "action_name": "build_golang_rpc_win",
              "inputs": ["bc_node/gosafex/pkg/json_rpc/json_rpc.go"],
              "outputs": [
                "bc_node/gosafex/pkg/json_rpc/json_rpc",
              ],
              "action": [
                "cd ..\\bc_node\gosafex\pkg\json_rpc\ && go build && move json_rpc.exe ..\..\..\..\\bin\\"
              ],
              "message": "Building safex libraries windows"
            }
          ]
           }],
           
           ['OS!="win"',{ 
             "actions": [
            {
              "action_name": "build_golang_rpc_lin_mac",
              "inputs": ["bc_node/gosafex/pkg/json_rpc/json_rpc.go"],
              "outputs": [
                "./json_rpc",
              ],
              "action": [
                "make", "--directory=./"
              ],
              "message": "Building safex libraries linux"
            }
          ]
          }],
          ],
        }
    ]
}