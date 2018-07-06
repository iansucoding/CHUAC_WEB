import { METER } from '../constants/action-types';

export const updateMeter = (data)=> ({
    type: METER.UPDATE_METER,
    payload: data
}); 
