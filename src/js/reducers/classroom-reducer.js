import { NETWORK_STATUS, CLASSROOM } from '../constants/action-types';

const classroomReducer = (state = [], action) => {
    switch (action.type) {
        case `${CLASSROOM.FETCH_ALL}_${NETWORK_STATUS.FULFILLED}`:
            return action.payload.data;
        case CLASSROOM.UPDATE_CLASSROOM:
            console.log('try to update classroom', action.payload);
            const newState = state.map(s=>({
                ...s,
                classrooms: s.classrooms.map(c=>{
                    let newClassroome = {...c};
                    if(c.classroomName === action.payload.name) {
                        const values = action.payload.value.split('_');
                        const isAuto = values[0] === '1' ? true : (values[0] === '0' ? false : undefined);
                        const isAcOn = values[1] === '1' ? true : false;
                        if(isAuto !== undefined) {
                            newClassroome.isAuto = isAuto;
                        } else {
                            delete newClassroome.isAuto; 
                        }
                        newClassroome.isAcOn = isAcOn;
                        newClassroome.modifiedOn = action.payload.createdAt;
                    };
                    return newClassroome;
                })
            }));
            return newState;
    }
    return state;
};

export default classroomReducer;
