import { validateMnemonic, validateKeys } from './validators';
export const setError = function (prop, value) {
    this.setState({ errors: { ...this.state.errors, [prop]: value } });
}
export const setTouched = function (prop, value) {
    this.setState({ touched: { ...this.state.touched, [prop]: value } });
}
export const setValidation = function (value) {
    this.setState({ validated: value });
}

export const resetData = function () {
    this.setState(this.initialState);
}
export const handleChange = function (event) {

    const { name, value } = event.target;
    let rules = [];
    if ((event.target.dataset.rules) !== undefined && (event.target.dataset.rules != "")) rules = event.target.dataset.rules.split(",");
    this.setState({ data: { ...this.state.data, [name]: value } });
    this.setState({ touched: { ...this.state.touched, [name]: true } });
    rules.forEach(rule => {
        switch (rule.trim()) {
            case "required":
                (value.trim() !== "") ? this.setState({ errors: { ...this.state.errors, [name]: false } }) : this.setState({ errors: { ...this.state.errors, [name]: true } });
                break;
            case "25_words":
                validateMnemonic(value.trim()) ? this.setState({ errors: { ...this.state.errors, [name]: false } }) : this.setState({ errors: { ...this.state.errors, [name]: true } });
                break;
            default:
                break;
        }
    });




}
export const handleSelectTab = function (val) {
    this.setState({
        data: { ...this.state.data, restore_type: val }
    })
}

