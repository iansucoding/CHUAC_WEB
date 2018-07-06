// 3 types of redux-promise-middleware
export const NETWORK_STATUS = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
};

// classroom
export const CLASSROOM = {
    FETCH_ALL : 'fetch-all-classrooms',
    UPDATE_CLASSROOM: 'update-classroom'
};

// equipment
export const EQUIPMENT = {
    FETCH_ALL : 'fetch-all-equipments',
    UPDATE_EQUIPMENT: 'update-equipment'
}

// equipment
export const METER = {
    UPDATE_METER: 'update-equipment'
}

// dashboard
export const UPDATE_REPORT = 'update-report';

// loading
export const SET_LOADING = 'loading';

// user
export const USER = {
    SIGNIN: 'user-signin',
    SIGNOUT: 'user-signout',
    GET: 'get-user-by-token'
}