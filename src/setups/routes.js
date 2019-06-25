import { BrowserRouter, Route} from "react-router-dom"
import React from 'react';

import {InitWallet, Login, Create, Open, Restore} from '../components/init/';
const routes = (
<BrowserRouter>
    <div> 
    <Route path="/" exact component={InitWallet}/>
    <Route path="/login"  component={Login}/>
    <Route path="/create"  component={Create}/>
    <Route path="/open"  component={Open}/>
    <Route path="/restore"  component={Restore}/>
    </div>
</BrowserRouter>
);


export default routes;