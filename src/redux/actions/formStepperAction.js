
export const SET_INFORMATION = "SET_INFORMATION";
export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_IS_CHECKING_SERIAL = "SET_IS_CHECKING_SERIAL";
export const SET_INSERT_NEW_ITEM = 'SET_INSERT_NEW_ITEM';
export const SET_IS_CHECKING_EMAIL = "SET_IS_CHECKING_EMAIL";
export const SET_INSERT_NEW_CUSTOMER_EMAIL = 'SET_INSERT_NEW_CUSTOMER_EMAIL';

export const SET_IS_CHECKING_PHONE = "SET_IS_CHECKING_PHONE";
export const SET_INSERT_NEW_CUSTOMER_PHONE = 'SET_INSERT_NEW_CUSTOMER_PHONE';

export const setInformation = (information = {
    serialNumber: undefined,
    name: undefined,
    emi1: undefined,
    emi2: undefined,
    equipment: undefined,
    problem: undefined,
    note: undefined,
}) => {
    return {
        type: SET_INFORMATION,
        payload: {
            information: information,
        },
    };
};

export const setAccount = (account = {
    customerId: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    phone: undefined,
    address: undefined
}) => {
    return {
        type: SET_ACCOUNT,
        payload: {
            account: account,
        },
    };
};


export const setIsCheckingSerial = (isCheckingSerial = true) => {
    return {
        type: SET_IS_CHECKING_SERIAL,
        payload: {
            isCheckingSerial: isCheckingSerial,
        },
    };
};

export const setInsertNewItem = (insertNewItem = true) => {
    return {
        type: SET_INSERT_NEW_ITEM,
        payload: {
            insertNewItem: insertNewItem,
        },
    };
};

export const setIsCheckingEmail = (isCheckingEmail = true) => {
    return {
        type: SET_IS_CHECKING_EMAIL,
        payload: {
            isCheckingEmail: isCheckingEmail,
        },
    };
};

export const setInsertNewCustomerEmail = (insertNewCustomerEmail = true) => {
    return {
        type: SET_INSERT_NEW_CUSTOMER_EMAIL,
        payload: {
            insertNewCustomerEmail: insertNewCustomerEmail,
        },
    };
};

export const setIsCheckingPhone = (isCheckingPhone = true) => {
    return {
        type: SET_IS_CHECKING_PHONE,
        payload: {
            isCheckingPhone: isCheckingPhone,
        },
    };
};

export const setInsertNewCustomerPhone = (insertNewCustomerPhone = true) => {
    return {
        type: SET_INSERT_NEW_CUSTOMER_PHONE,
        payload: {
            insertNewCustomerPhone: insertNewCustomerPhone,
        },
    };
};