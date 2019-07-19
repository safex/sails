import {
    ADD_RESTORE_WIZARD_STEP,
    REMOVE_RESTORE_WIZARD_STEP,
    RESET_RESTORE_WIZARD_STEP,
    ADD_RESTORE_WIZARD_DATA,
    REMOVE_RESTORE_WIZARD_DATA,
    RESET_RESTORE_WIZARD_DATA,
    ADD_RESTORE_WIZARD_ERRORS,
    REMOVE_RESTORE_WIZARD_ERRORS,
    RESET_RESTORE_WIZARD_ERRORS,
    ADD_RESTORE_WIZARD_TOUCHED,
    REMOVE_RESTORE_WIZARD_TOUCHED,
    RESET_RESTORE_WIZARD_TOUCHED,
    INIT_RESTORE_WIZARD_DATA,
    INIT_RESTORE_WIZARD_ERRORS,
    INIT_RESTORE_WIZARD_TOUCHED
} from './action.types';

let addRestoreWizardStep = function(){
    return {
        type:ADD_RESTORE_WIZARD_STEP
    };
}
let removeRestoreWizardStep = function(){
    return {
        type:REMOVE_RESTORE_WIZARD_STEP
    };
}
let resetRestoreWizardStep = function(){
    return {
        type:RESET_RESTORE_WIZARD_STEP
    };
}
let addRestoreWizardData = function(data){
    return {
        type:ADD_RESTORE_WIZARD_DATA,
        item:data
    };
}
let removeRestoreWizardData = function(data){
    return {
        type:REMOVE_RESTORE_WIZARD_DATA,
        item:data
    };
}
let resetRestoreWizardData = function(){
    return {
        type:RESET_RESTORE_WIZARD_DATA
    };
}
let addRestoreWizardErrors = function(error){
    return {
        type:ADD_RESTORE_WIZARD_ERRORS,
        item:error
    };
}
let removeRestoreWizardErrors = function(error){
    return {
        type:REMOVE_RESTORE_WIZARD_ERRORS,
        item:error
    };
}
let resetRestoreWizardErrors = function(){
    return {
        type:RESET_RESTORE_WIZARD_ERRORS
    };
}
let addRestoreWizardTouched= function(touched){
    return {
        type:ADD_RESTORE_WIZARD_TOUCHED,
        item:touched
    };
}
let removeRestoreWizardTouched = function(touched){
    return {
        type:REMOVE_RESTORE_WIZARD_TOUCHED,
        item:touched
    };
}
let resetRestoreWizardTouched = function(){
    return {
        type:RESET_RESTORE_WIZARD_TOUCHED
    };
}
let initRestoreWizardData = function (data){
    return {
        type: INIT_RESTORE_WIZARD_DATA,
        item: data
    }
}
let initRestoreWizardErrors = function (data){
    return {
        type:INIT_RESTORE_WIZARD_ERRORS,
        item:data
    }
}
let initRestoreWizardTouched = function (data){
    return {
        type: INIT_RESTORE_WIZARD_TOUCHED,
        item:data
    }
}
export {
    addRestoreWizardStep,
    addRestoreWizardData,
    addRestoreWizardErrors,
    addRestoreWizardTouched,
    removeRestoreWizardStep,
    removeRestoreWizardData,
    removeRestoreWizardErrors,
    removeRestoreWizardTouched,
    resetRestoreWizardStep,
    resetRestoreWizardData,
    resetRestoreWizardErrors,
    resetRestoreWizardTouched,
    initRestoreWizardData,
    initRestoreWizardErrors,
    initRestoreWizardTouched

}

