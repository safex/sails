import { BrowserRouter, Route, Switch} from "react-router-dom"
import React from 'react';

import {InitWallet,Open, Restore,LegacyWizard, LegacyLogin, CreateWizard} from '../components/init';
import Wallet from '../components/layout/Wallet';
const routes = (
<BrowserRouter>
    <div> 
        <Route path="/" exact component={InitWallet}/>
        <Route path="/login"  component={LegacyLogin}/>
        <Route path="/create"  component={CreateWizard}/>
        <Route path="/open"  component={Open}/>
        <Route path="/restore"  component={Restore}/>
        <Route path="/legacy/:type"  component={LegacyWizard}/>
        <Route path="/w/:page"  component={Wallet}/>
    </div>
</BrowserRouter>
);


export default routes;