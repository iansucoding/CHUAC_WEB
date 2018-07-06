import { USER } from '../constants/action-types';
import { API_URL } from '../constants/global-variables';
import axios from 'axios';

export const signIn = (data)=> ({
    type: USER.SIGNIN,
    payload: axios.post(`${API_URL}/token`, data)
}); 

export const signOut = {
    type: USER.SIGNOUT
}

export const getUser = token => ({
    type: USER.GET,
    payload: axios.get(`${API_URL}/token/get-user`, {headers: { Authorization: `Bearer ${token}` }})
})