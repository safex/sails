import {
    ADD_LEGACY_WIZARD_STEP,
    REMOVE_LEGACY_WIZARD_STEP,
    RESET_LEGACY_WIZARD_STEP,
    ADD_LEGACY_WIZARD_DATA,
    REMOVE_LEGACY_WIZARD_DATA,
    RESET_LEGACY_WIZARD_DATA,
    ADD_LEGACY_WIZARD_ERRORS,
    REMOVE_LEGACY_WIZARD_ERRORS,
    RESET_LEGACY_WIZARD_ERRORS,
    ADD_LEGACY_WIZARD_TOUCHED,
    REMOVE_LEGACY_WIZARD_TOUCHED,
    RESET_LEGACY_WIZARD_TOUCHED
} from './action.types';

let addLegacyWizardStep = function(){
    return {
        type:ADD_LEGACY_WIZARD_STEP
    };
}
let removeLegacyWizardStep = function(){
    return {
        type:REMOVE_LEGACY_WIZARD_STEP
    };
}
let resetLegacyWizardStep = function(){
    return {
        type:RESET_LEGACY_WIZARD_STEP
    };
}
let addLegacyWizardData = function(data){
    return {
        type:ADD_LEGACY_WIZARD_DATA,
        item:data
    };
}
let removeLegacyWizardData = function(data){
    return {
        type:REMOVE_LEGACY_WIZARD_DATA,
        item:data
    };
}
let resetLegacyWizardData = function(){
    return {
        type:RESET_LEGACY_WIZARD_DATA
    };
}
let addLegacyWizardErrors = function(error){
    return {
        type:ADD_LEGACY_WIZARD_ERRORS,
        item:error
    };
}
let removeLegacyWizardErrors = function(error){
    return {
        type:REMOVE_LEGACY_WIZARD_ERRORS,
        item:error
    };
}
let resetLegacyWizardErrors = function(){
    return {
        type:RESET_LEGACY_WIZARD_ERRORS
    };
}
let addLegacyWizardTouched= function(touched){
    return {
        type:ADD_LEGACY_WIZARD_TOUCHED,
        item:touched
    };
}
let removeLegacyWizardTouched = function(touched){
    return {
        type:REMOVE_LEGACY_WIZARD_TOUCHED,
        item:touched
    };
}
let resetLegacyWizardTouched = function(){
    return {
        type:RESET_LEGACY_WIZARD_TOUCHED
    };
}

export {
    addLegacyWizardStep,
    addLegacyWizardData,
    addLegacyWizardErrors,
    addLegacyWizardTouched,
    removeLegacyWizardStep,
    removeLegacyWizardData,
    removeLegacyWizardErrors,
    removeLegacyWizardTouched,
    resetLegacyWizardStep,
    resetLegacyWizardData,
    resetLegacyWizardErrors,
    resetLegacyWizardTouched

}

