export let validateConfirmPassword = function (pwd1, pwd2) {
    return pwd1 == pwd2;
}

export let validateKeys = function (address, view, spend) {
    if ((address === '') || (view === '') || (spend === ''))
        return false;
    else return true;
}

export let validateMnemonic = function (mnemonic) {
    return mnemonic.trim().split(" ").length === 25;
}
