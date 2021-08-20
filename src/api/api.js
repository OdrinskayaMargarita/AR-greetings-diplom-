import axios from "axios";
import {baseUrl} from "./config";

export const api = {
  getProduct() {
    return axios({
      method: "get",
      url: baseUrl + '/GuestSortNews',
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      },
    }).catch(error => error);
  },

  getProductUser(token) {
    return axios({
      method: "post",
      url: baseUrl + '/UserSortNews',
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      data: token
    }).catch(error => error);
  },

  getProductFilter(obj) {
    return axios({
      method: "post",
      url: baseUrl + '/GuestFiltrSortNews',
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      data: obj
    }).catch(error => error);
  },

  getProductFilterToken(obj) {
    return axios({
      method: "post",
      url: baseUrl + '/UserFilterSortNews',
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      data: obj
    }).catch(error => error);
  },

  getCategory() {
    return axios({
      method: "get",
      url: baseUrl + '/getCategories',
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      },
    }).catch(error => error);
  },

  loginGoogleFacebook(loginData) {
    return axios({
      method: "post",
      url: baseUrl + '/FromClientN',
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    },
      data: loginData
    }).catch(error => error);
  },

  signUp(loginData) {
    return axios({
      method: "post",
      url: baseUrl + '/FromClientMy',
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    },
      data: loginData
    }).catch(error => error);
  },

  signIn(loginData) {
    return axios({
      method: "post",
      url: baseUrl + '/LoginMy',
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    },
      data: loginData
    }).catch(error => error);
  },

  forgotPass(emailData) {
    return axios({
      method: "post",
      url: baseUrl + '/ForgotPassw',
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    },
      data: emailData
    }).catch(error => error);
  },

  newPass(passData) {
    return axios({
      method: "post",
      url: baseUrl + '/ResetPassw',
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    },
      data: passData
    }).catch(error => error);
  },

  logout(token) {
    return axios({
      method: "post",
      url: baseUrl + '/LogOut',
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    },
      data: token
    }).catch(error => error);
  },
};