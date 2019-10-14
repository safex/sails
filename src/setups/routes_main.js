import { BrowserRouter, Route } from "react-router-dom"
import React from 'react';
import * as R from './routes';

import { InitWallet, Wizard } from '../components/init';
import Wallet from '../components/layout/Wallet';
const routes = (
    <BrowserRouter>
        <div>
            <Route path={R.INIT} exact component={InitWallet} />
            <Route path={R.CREATE} render={(props) => (<Wizard {...props} component="create" maxStep="3" minStep="1" />)} />
            <Route path={R.OPEN} render={(props) => (<Wizard {...props} component="open" maxStep="2" minStep="1" />)} />
            <Route path={R.RESTORE} render={(props) => (<Wizard {...props} component="restore" maxStep="4" minStep="1" />)} />
            <Route path={R.LEGACY} render={(props) => (<Wizard {...props} legacy_type={props.match.params.legacy_type} component="legacy" maxStep="3" minStep="1" />)} />
            <Route path={R.WALLET} component={Wallet} />
        </div>
    </BrowserRouter>
);


export default routes;