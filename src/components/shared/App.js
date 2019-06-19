import React,{Component} from 'react';
import app from '../../modules/app.module';
import {connect} from 'react-redux';
const mapStateToProps = (state) => {
  return {
    response: state.response
  };
};


class App extends Component {
  componentDidMount() {
    app.getIndex(this);

} 

  render() {
    return <div> <h1>Go Party!!!!</h1> <h2>{this.props.response}</h2></div>;
  }
}
export default connect(mapStateToProps)(App);
