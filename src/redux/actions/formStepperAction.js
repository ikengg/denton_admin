
export const SET_INFORMATION = "SET_INFORMATION";
export const SET_ACCOUNT = "SET_ACCOUNT";

export const setInformation = (information = { serial: undefined, name: undefined, emi1: undefined, emi2: undefined }) => {
    return {
        type: SET_INFORMATION,
        payload: {
            information: information,
        },
    };
};

export const setAccount = (account = { email: undefined, name: undefined, phone: undefined, address: undefined }) => {
    return {
        type: SET_ACCOUNT,
        payload: {
            account: account,
        },
    };
};
