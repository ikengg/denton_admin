
import {
    SET_INFORMATION,
    SET_ACCOUNT,
    SET_IS_CHECKING_SERIAL,
    SET_INSERT_NEW_ITEM,
    SET_IS_CHECKING_EMAIL,
    SET_INSERT_NEW_CUSTOMER_EMAIL,
    SET_IS_CHECKING_PHONE,
    SET_INSERT_NEW_CUSTOMER_PHONE
} from "../actions/formStepperAction";


const initState = {
    information: {
        serialNumber: undefined,
        name: undefined,
        emi1: undefined,
        emi2: undefined,
        equipment: undefined,
        problem: undefined,
        note: undefined,
    },
    isCheckingSerial: true,
    insertNewItem: true,
    account: {
        customerId: undefined,
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        phone: undefined,
        address: undefined
    },
    isCheckingEmail: true,
    insertNewCustomerEmail: true,
    isCheckingPhone: true,
    insertNewCustomerPhone: true,

};

const formStepperReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_INFORMATION:
            console.log(action.payload.information);
            return {
                ...state,
                information: action.payload.information,
            };
        case SET_ACCOUNT:
            console.log(action.payload.account);
            return {
                ...state,
                account: action.payload.account,
            };
        case SET_IS_CHECKING_SERIAL:
            return {
                ...state,
                isCheckingSerial: action.payload.isCheckingSerial,
            };
        case SET_INSERT_NEW_ITEM:
            return {
                ...state,
                insertNewItem: action.payload.insertNewItem,
            };
        case SET_INSERT_NEW_CUSTOMER_EMAIL:
            return {
                ...state,
                insertNewCustomerEmail: action.payload.insertNewCustomerEmail,
            };
        case SET_IS_CHECKING_EMAIL:
            return {
                ...state,
                isCheckingEmail: action.payload.isCheckingEmail,
            };
        case SET_IS_CHECKING_PHONE:
            return {
                ...state,
                isCheckingPhone: action.payload.isCheckingPhone,
            };
        case SET_INSERT_NEW_CUSTOMER_PHONE:
            return {
                ...state,
                insertNewCustomerPhone: action.payload.insertNewCustomerPhone,
            };
        default:
            return state;
    }
};

export default formStepperReducer;
