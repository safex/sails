import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';


class Main extends Component {

  render() {
   return   <div>
                <div><Link to='/create'><button>{this.props.t('create.button')}</button></Link><p>{this.props.t('create.description')}</p></div>
                <div><Link to='/open'><button>{this.props.t('open.button')}</button></Link><p>{this.props.t('open.description')}</p></div>
                <div><Link to='/restore'><button>{this.props.t('restore.button')}</button></Link><p>{this.props.t('restore.description')}</p></div>
                <div><Link to='/legacy/init'><button>{this.props.t('legacy.button')}</button></Link><p>{this.props.t('legacy.description')}</p></div>
            </div>
  }
}
export default  withTranslation('init')(connect()(Main));