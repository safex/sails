import {
    ADD_CREATE_WIZARD_STEP, 
    REMOVE_CREATE_WIZARD_STEP, 
    RESET_CREATE_WIZARD_STEP,
    ADD_CREATE_WIZARD_DATA,
    REMOVE_CREATE_WIZARD_DATA,
    RESET_CREATE_WIZARD_DATA
} from './action.types';

let addCreateWizardStep = function(){
    return {
        type:ADD_CREATE_WIZARD_STEP
    };
}
let removeCreateWizardStep = function(){
    return {
        type:REMOVE_CREATE_WIZARD_STEP
    };
}
let resetCreateWizardStep = function(){
    return {
        type:RESET_CREATE_WIZARD_STEP
    };
}
let addCreateWizardData = function(data){
    return {
        type:ADD_CREATE_WIZARD_DATA,
        item:data
    };
}
let removeCreateWizardData = function(data){
    return {
        type:REMOVE_CREATE_WIZARD_DATA,
        item:data
    };
}
let resetCreateWizardData = function(){
    return {
        type:RESET_CREATE_WIZARD_DATA
    };
}

export {
    addCreateWizardStep,
    addCreateWizardData,
    removeCreateWizardStep,
    removeCreateWizardData,
    resetCreateWizardStep,
    resetCreateWizardData
}