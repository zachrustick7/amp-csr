import { 
    SET_SIZE,
    SET_RETURN_ADDRESS,
    SET_ADDRESS_LIST,
    SET_USERS
} from './config.types';

import userData from '../../userData.json';

const INITIAL_STATE = {
    users: userData
};

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case SET_SIZE: {

            let size = action.size;

            return {
                ...state, size: size
            }
        }

        case SET_RETURN_ADDRESS: {

            let returnAddress = action.returnAddress;

            return {
                ...state, returnAddress: returnAddress
            }
        }

        case SET_ADDRESS_LIST: {

            let addressList = action.addressList;

            return {
                ...state, addressList: addressList
            }
        }

        case SET_USERS: {

            let users = action.users;

            return {
                ...state, users: users
            }
        }

        default: return state;

    }

};

export default reducer;