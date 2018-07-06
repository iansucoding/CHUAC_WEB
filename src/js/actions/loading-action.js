import { SET_LOADING } from '../constants/action-types';

export const setLoadingStart = {
    type: SET_LOADING,
    payload: true
};

export const setLoadingEnd = {
    type: SET_LOADING,
    payload: false
};
