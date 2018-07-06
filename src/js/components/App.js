import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Websocket from 'react-websocket';

import store from '../store';
import { 
    fetchAllClassrooms, updateClassroom,
    fetchAllEquipments, updateEquipment, 
    updateMeter,
    signIn, signOut, getUser
   
} from '../actions';
import { CURRENT_HOST, TOKEN_KEY } from '../constants/global-variables';

import LoadingMask from './LoadingMask';
import Navigation from './Navigation';
import PageWrapper from './PageWrapper';

store.dispatch(fetchAllClassrooms);
store.dispatch(fetchAllEquipments);
 
if(localStorage.getItem(TOKEN_KEY)) {
    store.dispatch(getUser(localStorage.getItem(TOKEN_KEY)));
}

const App = () => {
    const protocol = location.protocol === "https:" ? "wss:" : "ws:";
    const wsUri = protocol + "//" + CURRENT_HOST;
    const handleReceiveData = (data) => {
        let result = JSON.parse(data);
        console.log(result);
        if(result.createdAt && result.createdAt.indexOf('T') !== -1) {
            // 接收到的日期格式 : "2018-07-02T09:03:13.731Z"
            result.createdAt = result.createdAt.substring(0,19).replace('T',' ').replace(/-/g,'/');
        }
        if(result.type === 'classroom') { // 教室
            store.dispatch(updateClassroom(result));
        } else if(result.type === 'Meter_data') { // 電錶
            store.dispatch(updateMeter(result));
        } else { // 設備
            store.dispatch(updateEquipment(result));
        }
    }

    const handleSignIn = (email, password, isRememberMe) => {
        console.log('sign in',email, password, isRememberMe);
        store.dispatch(signIn({email, password, isRememberMe}));
    }
    const handleSignOut = () => store.dispatch(signOut);
    
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <LoadingMask />
                    <div id="wrapper">
                        <Websocket 
                            url={wsUri}
                            onMessage={handleReceiveData}
                        />
                        <Navigation
                            onSignIn={handleSignIn}
                            onSignOut={handleSignOut}
                        />
                        <PageWrapper />
                    </div>
                </div>
            </Router>
        </Provider>
    );
};
export default App;
