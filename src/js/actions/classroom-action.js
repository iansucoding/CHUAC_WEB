import { CLASSROOM } from '../constants/action-types';

import { API_URL } from '../constants/global-variables';

import axios from 'axios';

export const fetchAllClassrooms = {
    type: CLASSROOM.FETCH_ALL,
    payload: axios.get(API_URL + '/classroom/all-classrooms')
};

export const updateClassroom = (data)=> ({
    type: CLASSROOM.UPDATE_CLASSROOM,
    payload: data
}); 
