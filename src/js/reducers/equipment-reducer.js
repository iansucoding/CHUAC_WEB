import { NETWORK_STATUS, EQUIPMENT } from '../constants/action-types';

const equipmentReducer = (state = [], action) => {
    switch (action.type) {
        case `${EQUIPMENT.FETCH_ALL}_${NETWORK_STATUS.FULFILLED}`:
            return action.payload.data;
        case EQUIPMENT.UPDATE_EQUIPMENT:
            //console.log('try to update equipment', action.payload);
            const newState = state.map(equipmentGroup=>({
                ...equipmentGroup,
                equipments: equipmentGroup.equipments.map(equip=>{
                    let newEquip = {...equip};
                    if(equip.equipmentName === action.payload.name) {
                        newEquip.value = action.payload.value;
                        newEquip.modifiedOn = action.payload.createdAt
                    };
                    return newEquip;
                })
            }));
            return newState;
    }
    return state;
};

export default equipmentReducer;
