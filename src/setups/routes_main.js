import { BrowserRouter, Route } from "react-router-dom"
import React from 'react';

import { InitWallet, Wizard } from '../components/init';
import Wallet from '../components/layout/Wallet';
const routes = (
    <BrowserRouter>
        <div>
            <Route path="/" exact component={InitWallet} />
            <Route path="/create" render={(props) => (<Wizard {...props} component="create" maxStep="3" minStep="1" />)} />
            <Route path="/open" render={(props) => (<Wizard {...props} component="open" maxStep="2" minStep="1" />)} />
            <Route path="/restore" render={(props) => (<Wizard {...props} component="restore" maxStep="4" minStep="1" />)} />
            <Route path="/legacy/:legacy_type" render={(props) => (<Wizard {...props} legacy_type={props.match.params.legacy_type} component="legacy" maxStep="3" minStep="1" />)} />
            <Route path="/w/:page" component={Wallet} />
        </div>
    </BrowserRouter>
);


export default routes;