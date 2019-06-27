import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
// import { FilePond, registerPlugin } from 'react-filepond';
// import 'filepond/dist/filepond.min.css';

let initM = require('../../modules/init.module');


const mapStateToProps = (state) => {
  return {
    wallet_exists: state.wallet_exists
  };
};


class Open extends Component {
  constructor(props){
    super(props);
  }
  render() {
   return   <div>
               {/* <FilePond allowMultiple={false} name="open_file" onupdatefiles={(fileItems) => {
                              console.log(fileItems[0].file.path);
                              console.log(this.state);
                          }} /> */}
                          <input type="file" id="open_file"  onChange={()=>{}}/>
                <input type="password" id="open_password"  onChange={()=>{}}/>
                <button onClick={()=>{initM.open(this, document.getElementById("open_file").files[0].path, document.getElementById("open_password").value )}}> {this.props.t("open.form.button")}</button>
            
            <Link to='/'><button>{this.props.t('back_button')}</button></Link></div>
  }
}
export default withTranslation('init')(connect(mapStateToProps)(Open));