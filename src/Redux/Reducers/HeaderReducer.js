import { STATE_MODAL_SIGNUP, STATE_MODAL_SIGNIN, STATE_MODAL_RESTOREPASS } from '../Actions/Constants';

const initialState = {
    stateModalSignUp: false,
    stateModalSignIn: false,
    stateModalRestorePass: false,
}

export const HeaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case STATE_MODAL_SIGNUP:
            {
                return {...state, stateModalSignUp: action.stateModal }
            }
        case STATE_MODAL_SIGNIN:
            {
                return {...state, stateModalSignIn: action.stateModal }
            }
        case STATE_MODAL_RESTOREPASS:
            {
                return {...state, stateModalRestorePass: action.stateModal }
            }
        default:
            return state;
    }
}