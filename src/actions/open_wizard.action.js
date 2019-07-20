import {
    ADD_OPEN_WIZARD_STEP, 
    REMOVE_OPEN_WIZARD_STEP, 
    RESET_OPEN_WIZARD_STEP,
    ADD_OPEN_WIZARD_DATA,
    REMOVE_OPEN_WIZARD_DATA,
    RESET_OPEN_WIZARD_DATA,
    ADD_OPEN_WIZARD_ERRORS,
    REMOVE_OPEN_WIZARD_ERRORS,
    RESET_OPEN_WIZARD_ERRORS,
    ADD_OPEN_WIZARD_TOUCHED,
    REMOVE_OPEN_WIZARD_TOUCHED,
    RESET_OPEN_WIZARD_TOUCHED
} from './action.types';

let addOpenWizardStep = function(){
    return {
        type:ADD_OPEN_WIZARD_STEP
    };
}
let removeOpenWizardStep = function(){
    return {
        type:REMOVE_OPEN_WIZARD_STEP
    };
}
let resetOpenWizardStep = function(){
    return {
        type:RESET_OPEN_WIZARD_STEP
    };
}
let addOpenWizardData = function(data){
    return {
        type:ADD_OPEN_WIZARD_DATA,
        item:data
    };
}
let removeOpenWizardData = function(data){
    return {
        type:REMOVE_OPEN_WIZARD_DATA,
        item:data
    };
}
let resetOpenWizardData = function(){
    return {
        type:RESET_OPEN_WIZARD_DATA
    };
}
let addOpenWizardErrors = function(error){
    return {
        type:ADD_OPEN_WIZARD_ERRORS,
        item:error
    };
}
let removeOpenWizardErrors = function(error){
    return {
        type:REMOVE_OPEN_WIZARD_ERRORS,
        item:error
    };
}
let resetOpenWizardErrors = function(){
    return {
        type:RESET_OPEN_WIZARD_ERRORS
    };
}
let addOpenWizardTouched= function(touched){
    return {
        type:ADD_OPEN_WIZARD_TOUCHED,
        item:touched
    };
}
let removeOpenWizardTouched = function(touched){
    return {
        type:REMOVE_OPEN_WIZARD_TOUCHED,
        item:touched
    };
}
let resetOpenWizardTouched = function(){
    return {
        type:RESET_OPEN_WIZARD_TOUCHED
    };
}



export {
    addOpenWizardStep,
    addOpenWizardData,
    addOpenWizardErrors,
    addOpenWizardTouched,
    removeOpenWizardStep,
    removeOpenWizardData,
    removeOpenWizardErrors,
    removeOpenWizardTouched,
    resetOpenWizardStep,
    resetOpenWizardData,
    resetOpenWizardErrors,
    resetOpenWizardTouched

}