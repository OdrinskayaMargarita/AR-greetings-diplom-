import {CHANGE_STATE_MODAL_RESET_PASSW, SAVE_TOKEN,SAVE_NAME} from "./Constants";
import { api } from "../../api/api";
import { changeStateModalRestorePass, changeStateModalSignIn, changeStateModalSignUp } from "./HeaderActions";
import { SaveToLocalStorage } from "../../Components/SaveToLocalStorage/SaveToLocalStorage";
import { asyncGetProductList, asyncGetProductListUser } from "./ProductsActions";

export const saveToken = (token) => ({
    type: SAVE_TOKEN,
    payload: {
        token
    }
})

export const saveName = (name) => ({
    type: SAVE_NAME,
    payload: {
        name
    }
})

export const changeStateResetPassword = (stateModalSuccessRestorePass) => ({
    type: CHANGE_STATE_MODAL_RESET_PASSW,
    payload: {
        stateModalSuccessRestorePass
    }
})

export const asyncGetSignInGoogleFacebook = (loginData) => async(dispatch, getState) => {
    let data = await api.loginGoogleFacebook(loginData).then(res => {
        dispatch(changeStateModalSignUp(false))
        dispatch(changeStateModalSignIn(false))
        dispatch(saveName(res.data.name))
        SaveToLocalStorage("NAME",res.data.name)
        dispatch(saveToken(res.data.accessToken))
        SaveToLocalStorage("token", res.data.accessToken)
        dispatch(asyncGetProductListUser())
    }).catch(err => {
        return false
    });
};

export const asyncGetSignUpNative = (loginData) => async(dispatch, getState) => {
    let data = await api.signUp(loginData).then(res => {
        dispatch(changeStateModalSignUp(false))
        dispatch(changeStateModalSignIn(false))
        dispatch(saveToken(res.data.accessToken))
        dispatch(saveName(res.data.name))
        SaveToLocalStorage("NAME",res.data.name)
        SaveToLocalStorage("token", res.data.accessToken)
        dispatch(asyncGetProductListUser())
    }).catch(err => {
        return false
    });
};

export const asyncGetSignInNative = (loginData) => async(dispatch, getState) => {
    let data = await api.signIn(loginData).then(res => {
        dispatch(changeStateModalSignUp(false))
        dispatch(changeStateModalSignIn(false))
        dispatch(saveToken(res.data.accessToken))
        dispatch(saveName(res.data.name))
        SaveToLocalStorage("NAME",res.data.name)
        SaveToLocalStorage("token", res.data.accessToken)
        dispatch(asyncGetProductListUser())
    }).catch(err => {
        return false
    });
};

export const asyncForgotPass = (emailData) => async(dispatch, getState) => {
    let data = await api.forgotPass(emailData).then(res => {
        dispatch(changeStateModalSignUp(false))
        dispatch(changeStateModalSignIn(false))
        dispatch(changeStateModalRestorePass(false))
        console.log(res)
    }).catch(err => {
        return false
    });
};

export const asyncNewPass = (passData) => async(dispatch, getState) => {
    let data = await api.newPass(passData).then(res => {
        dispatch(changeStateResetPassword(true))
    }).catch(err => {
        return false
    });
};

export const asyncLogout = () => async(dispatch, getState) => {
    let token = getState().SignInReducer.token
    const objToken = { tokenforcheck: token }
    let data = await api.logout(objToken).then(res => {
        dispatch(saveToken(res.data.accessToken))
        SaveToLocalStorage("token", res.data.accessToken)
        SaveToLocalStorage("NAME",'')
        dispatch(saveName(''))
        dispatch(asyncGetProductList())
    }).catch(err => {
        return false
    });
};