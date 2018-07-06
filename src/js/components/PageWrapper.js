import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './Home';
import Powermeter from './Powermeter';
import AirConditioning2 from './AirConditioning2';
import BrineSystem from './BrineSystem';
import Cooling from './Cooling';
import AirSchedule from './AirSchedule';
import SystemFour from './SystemFour';
import SystemOne from './SystemOne';
import SystemTwo from './SystemTwo';
import SystemThree from './SystemThree';
import SystemSix from './SystemSix';
import SystemSeven from './SystemSeven';
import ClassImg from './ClassImg';
import TemporaryClass from './TemporaryClass';
import Temperature from './Temperature';
import AllSupply from './AllSupply';
import Power from './Power';
import EventLog from './EventLog';
import AirConditioning from './AirConditioning';

import { ROOT_NAME } from '../constants/global-variables';

const PageWrapper = () => (
    <div id="page-wrapper">
        <Switch>
            <Route exact path={`${ROOT_NAME}`} component={Home}/>
            <Route exact path="/" render={() => (<Redirect to={`${ROOT_NAME}`} />)} /> 
            <Route path={`${ROOT_NAME}/powermeter`} component={Powermeter}/>
            <Route path={`${ROOT_NAME}/airconditioning2`} component={AirConditioning2}/>
            <Route path={`${ROOT_NAME}/brinesystem`} component={BrineSystem}/>
            <Route path={`${ROOT_NAME}/cooling`} component={Cooling}/>
            <Route path={`${ROOT_NAME}/airschedule`} component={AirSchedule}/>
            <Route path={`${ROOT_NAME}/system4`} component={SystemFour}/>
            <Route path={`${ROOT_NAME}/system1`} component={SystemOne}/>
            <Route path={`${ROOT_NAME}/system2`} component={SystemTwo}/>
            <Route path={`${ROOT_NAME}/system3`} component={SystemThree}/>
            <Route path={`${ROOT_NAME}/system6`} component={SystemSix}/>
            <Route path={`${ROOT_NAME}/system7`} component={SystemSeven}/>
            <Route path={`${ROOT_NAME}/classimg`} component={ClassImg}/>
            <Route path={`${ROOT_NAME}/temporaryclass`} component={TemporaryClass}/>
            <Route path={`${ROOT_NAME}/temperature`} component={Temperature}/>
            <Route path={`${ROOT_NAME}/allsupply`} component={AllSupply}/>
            <Route path={`${ROOT_NAME}/power`} component={Power}/>
            <Route path={`${ROOT_NAME}/eventlog`} component={EventLog}/>
            <Route path={`${ROOT_NAME}/airconditioning`} component={AirConditioning}/>
            <Route path={`${ROOT_NAME}/:page`} render={({ match }) => <div><p>{match.params.page} 未建立 ...QQ...</p></div>}/>
        </Switch>
    </div>
);

export default PageWrapper;