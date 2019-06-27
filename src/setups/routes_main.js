import { BrowserRouter, Route, Switch} from "react-router-dom"
import React from 'react';

import {InitWallet, Login, Create, Open, Restore} from '../components/init';
import Wallet from '../components/layout/Wallet';
const routes = (
<BrowserRouter>
    <div> 
        <Route path="/" exact component={InitWallet}/>
        <Route path="/login"  component={Login}/>
        <Route path="/create"  component={Create}/>
        <Route path="/open"  component={Open}/>
        <Route path="/restore"  component={Restore}/>
        <Route path="/w/:page"  component={Wallet}/>
    </div>
</BrowserRouter>
);


export default routes;