import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import {Link} from 'react-router-dom'
import {addRestoreDataF, restore, chooseCreateFilepath} from '../../modules/init.module';

const mapStateToProps = (state) =>{
  return {
    restore:state.restore
  }
}
class Restore extends Component {

  render() {
    let options = {
      title: this.props.t("create.form.choose_filepath")
    };
    let file_location = this.props.restore.hasOwnProperty("create_filepath") ? this.props.restore.create_filepath : this.props.t("create.form.choose_filepath");
   return (
   <div>
      <input id="address" placeholder={this.props.t("restore.form.address")} onClick={(event)=>{addRestoreDataF(this.props.dispatch, {address:event.target.value})}} /> 
      <input id="private_view" placeholder={this.props.t("restore.form.private_view")} onClick={(event)=>{addRestoreDataF(this.props.dispatch, {view_private:event.target.value})}} />
      {/* <input id="public_view" placeholder={this.props.t("restore.form.public_view")} onClick={(event)=>{addRestoreDataF(this.props.dispatch, {view_public:event.target.value})}}/> */}
      <input id="private_spend" placeholder={this.props.t("restore.form.private_spend")}  onClick={(event)=>{addRestoreDataF(this.props.dispatch, {spend_private:event.target.value})}}/>
      {/* <input id="public_spend" placeholder={this.props.t("restore.form.public_spend")} onClick={(event)=>{addRestoreDataF(this.props.dispatch, {spend_public:event.target.value})}}/> */}
      <input id="seeds" placeholder={this.props.t("restore.form.seeds")} onClick={(event)=>{addRestoreDataF(this.props.dispatch, {seeds:event.target.value})}}/>

      <label>{file_location}</label>
      <button onClick={() => { chooseCreateFilepath(this.props.dispatch, options, "restore") }}>{this.props.t("browse_button")}</button>

      <label>{this.props.t("create.form.wallet_name_label")} </label>
      <input value={this.props.restore.hasOwnProperty('create_wallet_name') ? this.props.restore.create_wallet_name : ''} type="text" id="create_name" onChange={(event) => { addRestoreDataF(this.props.dispatch, { create_wallet_name: event.target.value }) }} placeholder={this.props.t("create.form.wallet_name")} />
  
      <label>{this.props.t("create.form.password")}</label>
      <input value={this.props.restore.hasOwnProperty('create_password') ? this.props.restore.create_password : ''} type="password" id="create_password" onChange={(event) => { addRestoreDataF(this.props.dispatch, { create_password: event.target.value }) }} placeholder={this.props.t("create.form.password")} />
  
      <label>{this.props.t("create.form.repeat_password")}</label>
      <input value={this.props.restore.hasOwnProperty('create_repeat_password') ? this.props.restore.create_repeat_password : ''} type="password" id="create_password_repeat" onChange={(event) => { addRestoreDataF(this.props.dispatch, { create_repeat_password: event.target.value }) }} placeholder={this.props.t("create.form.repeat_password")} />
  
      <button onClick={()=>{restore(this.props.dispatch, this.props.history, this.props.restore)}} >{this.props.t("button")}</button>
      <Link to='/'><button>Back</button></Link>
    </div>
    );
  }
}
export default withTranslation('init')(connect(mapStateToProps)(Restore));