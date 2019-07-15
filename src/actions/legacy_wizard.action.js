import {
    ADD_LEGACY_WIZARD_STEP, 
    REMOVE_LEGACY_WIZARD_STEP, 
    RESET_LEGACY_WIZARD_STEP,
    ADD_LEGACY_WIZARD_DATA,
    REMOVE_LEGACY_WIZARD_DATA,
    RESET_LEGACY_WIZARD_DATA
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

export {
    addLegacyWizardStep,
    addLegacyWizardData,
    removeLegacyWizardStep,
    removeLegacyWizardData,
    resetLegacyWizardStep,
    resetLegacyWizardData
}

