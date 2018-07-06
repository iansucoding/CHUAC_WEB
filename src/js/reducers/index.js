import { combineReducers } from 'redux';

import classroomReducer from '../reducers/classroom-reducer';
import equipmentReducer from '../reducers/equipment-reducer';
import meterReducer from '../reducers/meter-reducer';
import loadingReducer from '../reducers/loading-reducer';
import userReducer from '../reducers/user-reducer';

export default combineReducers({
    classrooms: classroomReducer,
    equipments: equipmentReducer,
    meters: meterReducer,
    isLoading: loadingReducer,
    user: userReducer
});