import { BrowserRouter, Route} from "react-router-dom"
import React from 'react';
import { createBrowserHistory } from 'history';

import {InitWallet,OpenWizard, Restore,LegacyWizard, LegacyLogin, CreateWizard, Wizard} from '../components/init';
import Wallet from '../components/layout/Wallet';

var history=createBrowserHistory();
const routes = (
<BrowserRouter>
    <div> 
        <Route path="/" exact component={InitWallet}/>
        <Route path="/login"  component={LegacyLogin}/>
        <Route path="/create"  component={CreateWizard}/>
        <Route path="/open"  component={OpenWizard}/>
        <Route path="/restore"   render = {(props)=>(<Wizard {...props} component="restore" maxStep="4" minStep="1" />)} />
        <Route path="/legacy/:type"  component={LegacyWizard}/>
        <Route path="/w/:page"  component={Wallet}/>
    </div>
</BrowserRouter>
);


export default routes;