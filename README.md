# sails
sails wallet 
#install info
- use --recursive flag when cloning the rep
- npm i 
- go to ./bc_node/gosafex/pkg/json_rpc and run command go build ( you will need go tool, latest version)
- npm run electron-dev
#project structure
sails - main folder
1. bc_node - blockchain part written in golang
2. public - static documents
    1. css - folder for css
    2. img - images
    3. js - simple js and json files
3. setups - files thar are used for diferent kind of setups ( routers, env ...)
4. src
    1. actions - folder reserved for redux actions
    2. components - folder for react components
    3. libs - additional libs and hellpers that are used in modules
    4. modules - folder for components logic
    5. reducers - folder reserved for redux reducers
    6. store - folder reserved for redux store wich contains only one file - store.js

#dev guildelines
- if its possible use one component per file
- Use PascalCase for component classes and camelCase for component instances and function names
- Use the filename as the component name
- every component that is used in more than one place should be in src/componets/shared folder
- every page should have folder inside src/components
- module files have extension .module.js and its module per page (ex. Home components should have home.module.js module that have functions for each component inside src/components/home folder)
- tests have .test.js extension 
- actions for redux should have action.js extension
- reducers should have reducer.js extension
- reducers and actions shoud be broken down on state propery level (ex. for wallet property of the state there will be wallet.reducer.js and wallet.action.js that will have all logic for manipulation of the wallet propery inside the state)
- root.reducer.js combines all reducer
- there should be only one redux store