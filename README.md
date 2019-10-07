# sails
sails wallet 
# install info
- clone repo with command git clone -b develop --recursive https://github.com/safex/sails
- checkout develop branch on gosafex submodule (in bc_node folder)
- npm i 
- in src/setups/conf.js set up DAEMON_PORT and DAEMON_HOST variables for blockchain node
- npm run electron-dev
# project structure
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
5. bin - folder for gosafex executable

# dev guildelines
- Use git-flow branching model
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

#possible bugs
- if you are in development environment you need to wait for 5 seconds for application to load
- if you are in development environment and when application load you see only white screen you need to increase timeout time in electron.js in line 81 -> setTimeout(() => { mainWindow.loadURL(startUrl); }, 5000);

#translation
1. in src/setups/translations copy "en" folder and rename it to desired language
2. translate the json files in copied folder
3. in src/setups/i18n.js import translated files and add them into resource object
4. in src/components/shared/LanguageMenu.js add as option new language ( make sure that the option value matches the value of imported translations in resource object from previous step)