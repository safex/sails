import {
    ADD_WIZARD_STEP,
    REMOVE_WIZARD_STEP,
    RESET_WIZARD_STEP,
    ADD_WIZARD_DATA,
    REMOVE_WIZARD_DATA,
    RESET_WIZARD_DATA,
    ADD_WIZARD_ERRORS,
    REMOVE_WIZARD_ERRORS,
    RESET_WIZARD_ERRORS,
    ADD_WIZARD_TOUCHED,
    REMOVE_WIZARD_TOUCHED,
    RESET_WIZARD_TOUCHED,
    INIT_WIZARD_DATA,
    INIT_WIZARD_ERRORS,
    INIT_WIZARD_TOUCHED
} from './action.types';

let addWizardStep = function(){
    return {
        type:ADD_WIZARD_STEP
    };
}
let removeWizardStep = function(){
    return {
        type:REMOVE_WIZARD_STEP
    };
}
let resetWizardStep = function(){
    return {
        type:RESET_WIZARD_STEP
    };
}
let addWizardData = function(data){
    return {
        type:ADD_WIZARD_DATA,
        item:data
    };
}
let removeWizardData = function(data){
    return {
        type:REMOVE_WIZARD_DATA,
        item:data
    };
}
let resetWizardData = function(){
    return {
        type:RESET_WIZARD_DATA
    };
}
let addWizardErrors = function(error){
    return {
        type:ADD_WIZARD_ERRORS,
        item:error
    };
}
let removeWizardErrors = function(error){
    return {
        type:REMOVE_WIZARD_ERRORS,
        item:error
    };
}
let resetWizardErrors = function(){
    return {
        type:RESET_WIZARD_ERRORS
    };
}
let addWizardTouched= function(touched){
    return {
        type:ADD_WIZARD_TOUCHED,
        item:touched
    };
}
let removeWizardTouched = function(touched){
    return {
        type:REMOVE_WIZARD_TOUCHED,
        item:touched
    };
}
let resetWizardTouched = function(){
    return {
        type:RESET_WIZARD_TOUCHED
    };
}
let initWizardData = function (data){
    return {
        type: INIT_WIZARD_DATA,
        item: data
    }
}
let initWizardErrors = function (data){
    return {
        type:INIT_WIZARD_ERRORS,
        item:data
    }
}
let initWizardTouched = function (data){
    return {
        type: INIT_WIZARD_TOUCHED,
        item:data
    }
}
export {
    addWizardStep,
    addWizardData,
    addWizardErrors,
    addWizardTouched,
    removeWizardStep,
    removeWizardData,
    removeWizardErrors,
    removeWizardTouched,
    resetWizardStep,
    resetWizardData,
    resetWizardErrors,
    resetWizardTouched,
    initWizardData,
    initWizardErrors,
    initWizardTouched

}

