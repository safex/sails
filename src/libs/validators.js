export let confirmPassword = function(pwd1, pwd2, dispatch=null) {
    return pwd1==pwd2;
}

export let validateKeys = function (address, view, spend) {
    if ((address === '') || (view === '') || (spend === ''))
        return false;
    else return true;
}

export let validateMnemonic = function (mnemonic) {
    return mnemonic.trim().split(" ").length === 25;
}
