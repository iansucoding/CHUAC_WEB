import { EQUIPMENT } from '../constants/action-types';

import { API_URL } from '../constants/global-variables';

import axios from 'axios';

export const fetchAllEquipments = {
    type: EQUIPMENT.FETCH_ALL,
    payload: axios.get(API_URL + '/equipment/all-equipments')
};

export const updateEquipment = (data)=> ({
    type: EQUIPMENT.UPDATE_EQUIPMENT,
    payload: data
}); 
