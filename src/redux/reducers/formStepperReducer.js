
import { SET_INFORMATION, SET_ACCOUNT } from "../actions/formStepperAction";


const initState = {
    information: { serial: undefined, name: undefined, emi1: undefined, emi2: undefined },
    account: { email: undefined, name: undefined, phone: undefined, address: undefined },
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
        default:
            return state;
    }
};

export default formStepperReducer;
