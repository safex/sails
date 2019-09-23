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
    this.setState({ data: { ...this.state.data, [name]: value } });
}
export const handleSelectTab = function (val) {
    console.log(val)
    // const { name, value } = event.target
    // this.setState({
    //     [name]: value
    // })
}

