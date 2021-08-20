import { STATE_MODAL_SIGNIN, STATE_MODAL_SIGNUP, STATE_MODAL_RESTOREPASS } from "./Constants";

export const changeStateModalSignUp = (stateModal) => ({
    type: STATE_MODAL_SIGNUP,
    stateModal: stateModal
})

export const changeStateModalSignIn = (stateModal) => ({
    type: STATE_MODAL_SIGNIN,
    stateModal: stateModal
})

export const changeStateModalRestorePass = (stateModal) => ({
    type: STATE_MODAL_RESTOREPASS,
    stateModal: stateModal
})