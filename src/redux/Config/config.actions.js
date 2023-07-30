import { 
    SET_SIZE,
    SET_RETURN_ADDRESS,
    SET_ADDRESS_LIST,
    SET_USERS
} from './config.types';

export const setOrderSize = (size) => {

    return {

        type: SET_SIZE,
        size: size

    };

};

export const setOrderReturnAddress = (returnAddress) => {

    return {

        type: SET_RETURN_ADDRESS,
        returnAddress: returnAddress

    };

};

export const setOrderAddressList = (addressList) => {

    return {

        type: SET_ADDRESS_LIST,
        addressList: addressList

    };

};

export const setUsers = (users) => {

    return {

        type: SET_USERS,
        users: users

    };

};
