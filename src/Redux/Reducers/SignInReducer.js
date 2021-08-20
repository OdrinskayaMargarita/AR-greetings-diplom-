import {SAVE_TOKEN, CHANGE_STATE_MODAL_RESET_PASSW, SAVE_NAME} from '../Actions/Constants';

const initialState = {
  dataUser: null,
  token: undefined,
  stateModalSuccessRestorePass: false,
  name: '',
}

export const SignInReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN: {
      return {...state, token: action.payload.token}
    }
    case SAVE_NAME: {
      return {...state, name: action.payload.name}
    }
    case CHANGE_STATE_MODAL_RESET_PASSW: {
      return {...state, stateModalSuccessRestorePass: action.payload.stateModalSuccessRestorePass}
    }
    default:
      return state;
  }
}