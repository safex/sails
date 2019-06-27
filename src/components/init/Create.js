import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
let initM = require('../../modules/init.module');

class Create extends Component {
  constructor(props){
    super(props);
  }
  render() {
      //add pwd validation
   return  <div>
   <input type="file" id="create_file" onChange={()=>{}}/>
   <input type="password" id="create_password"  onChange={()=>{}}/> 
   <input type="password" id="create_password_repeat"  onChange={()=>{}}/>
   <button onClick={()=>{initM.create(this, document.getElementById("create_file").files[0].path, document.getElementById("create_password").val )}}> {this.props.t("create.form.button")}</button>

    <Link to='/'><button>{this.props.t('back_button')}</button></Link></div>;
  }
}
export default  withTranslation('init')(connect()(Create));