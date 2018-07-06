import classnames from 'classnames';

export const col = size => (classnames({
    [`col-sm-${size}`]:true,
    [`col-md-${size}`]:true,
    [`col-lg-${size}`]:true,
    [`col-xl-${size}`]:true
}));

export const lableDt = d => {
    console.log(d);
    return d.substring(0,19).replace('T',' ').replace(/-/g,'/');
}

export const TOKEN_KEY = 'chuacsystem-token';


export const ROOT_NAME = '/CHUACSystemWeb';

export const HOST = {
    CLOUD: '113.196.59.103/CHUACSystemAPI',
    LOCAL: 'localhost/CHUACSystemApi',
    DEBUG: 'localhost:60523'
};
export const CURRENT_HOST = HOST.CLOUD; 

export const API_URL = `http://${CURRENT_HOST}/api`;
export const IMAGE_URL = `http://${CURRENT_HOST}/images`;

