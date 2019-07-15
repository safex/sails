import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import {open, chooseWalletFile, addOpenFData} from '../../modules/init.module';

const mapStateToProps = (state)=>{
  return {
    open:state.open
  }
}

class Open extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let options = {
      title: this.props.t("open.form.choose_filepath"),
      filters: [
        { name: 'v8 Wallet', extensions: ['*'] },
      ]
    };
    let file_location = this.props.open.hasOwnProperty("filepath") ? this.props.open.filepath : "";
   return   <div>
                <p>{file_location}</p>
                <button onClick={() => { chooseWalletFile(this.props.dispatch, options, "default") }}>{this.props.t("browse_button")}</button>
                <input type="password" id="open_password"  onChange={(event)=>{addOpenFData(this.props.dispatch, {password:event.target.value})}}/>
                <button onClick={()=>{open(this.props.history,this.props.open)}}> {this.props.t("open.form.button")}</button>
            
                <Link to='/'><button>{this.props.t('back_button')}</button></Link></div>
  }
}
export default withTranslation('init')(connect(mapStateToProps)(Open));