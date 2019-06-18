
.PHONY: all
all: deps
	node_modules/.bin/node-pre-gyp configure build
	rm bc_node/gosafex/pkg/json_rpc/Makefile
deps:
	cp Makefile_go bc_node/gosafex/pkg/json_rpc/Makefile


