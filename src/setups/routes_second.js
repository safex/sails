import { Route } from "react-router-dom"
import React from 'react';
import * as R from './routes';

import Home from '../components/home/Home';
import SFX from '../components/sfx/SFX';
import SFT from '../components/sft/SFT';
import Contacts from '../components/contacts/Contacts';
import Settings from '../components/settings/Settings';
import Migration from '../components/migration/Migration';
import Bitcoin from '../components/bitcoin/Bitcoin';

const routes_second = (
    <div>
        <Route exact path={R.HOME} component={Home} />
        <Route exact path={R.SFX} component={SFX} />
        <Route exact path={R.SFT} component={SFT} />
        <Route exact path={R.CONTACTS} component={Contacts} />
        <Route exact path={R.SETTINGS} component={Settings} />
        <Route exact path={R.MIGRATIONS} component={Migration} />
        <Route exact path={R.BITCOIN} component={Bitcoin} />
    </div>
);


export default routes_second;