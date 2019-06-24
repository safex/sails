.PHONY: all
all:
	cd bc_node/gosafex/pkg/json_rpc/ && go build && mv json_rpc ../../../../bin/


