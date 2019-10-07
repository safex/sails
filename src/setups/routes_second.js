import { Route } from "react-router-dom"
import React from 'react';

import Home from '../components/home/Home';
import SFX from '../components/sfx/SFX';
import SFT from '../components/sft/SFT';
import Contacts from '../components/contacts/Contacts';
import Settings from '../components/settings/Settings';
import Migration from '../components/migration/Migration';
import Bitcoin from '../components/bitcoin/Bitcoin';

const routes_second = (
    <div>
        <Route exact path="/w/home" component={Home} />
        <Route exact path="/w/sfx/:address?" component={SFX} />
        <Route exact path="/w/sft/:address?" component={SFT} />
        <Route exact path="/w/contacts" component={Contacts} />
        <Route exact path="/w/settings" component={Settings} />
        <Route exact path="/w/migrations" component={Migration} />
        <Route exact path="/w/bitcoin" component={Bitcoin} />
    </div>
);


export default routes_second;