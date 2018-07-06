import { USER, NETWORK_STATUS } from '../constants/action-types.js'
import { TOKEN_KEY } from '../constants/global-variables';

const userReducer = (state={}, action) => {
    switch (action.type) {
        case `${USER.SIGNIN}_${NETWORK_STATUS.FULFILLED}`:
            const { data } = action.payload;
            if(data.isRememberMe){
                localStorage.setItem(TOKEN_KEY, data.token);
            } else {
                localStorage.removeItem(TOKEN_KEY);
            }
            return {
                token: data.token,
                email: data.user.email,
                id: data.user.id
            };
        case `${USER.SIGNIN}_${NETWORK_STATUS.REJECTED}`:
        case USER.SIGNOUT:
            localStorage.removeItem(TOKEN_KEY);
            return {};
        case `${USER.GET}_${NETWORK_STATUS.FULFILLED}`:
            return {
                token: localStorage.getItem(TOKEN_KEY),
                email: action.payload.data.email,
                id: action.payload.data.id
            };
    }
    return state;
}

export default userReducer;