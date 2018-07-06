import { METER } from '../constants/action-types';

const meterReducer = (state = [], action) => {
    switch (action.type) {
        case METER.UPDATE_METER:
            let isExisted = false;
            const newState = state.map(meter=>{
                if (meter.name === action.payload.name) {
                    isExisted = true;
                    return {...action.payload};
                } else {
                    return {...meter}
                }
            });
            if(!isExisted) {
                newState.push(action.payload);
            }
            return newState;
    }
    return state;
};

export default meterReducer;
