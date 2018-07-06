import { SET_LOADING } from '../constants/action-types';

const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case SET_LOADING:
            return action.payload;
    }
    return state;
};

export default loadingReducer;
