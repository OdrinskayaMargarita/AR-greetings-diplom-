import { GET_CATEGORY_LIST, GET_PRODUCTS_LIST, STATE_MODAL_USE, STATE_MODAL_BUY} from "./Constants";
import {api} from "../../api/api";

export const getProductsList = (data) => ({
    type: GET_PRODUCTS_LIST,
    data: data
})

export const asyncGetProductList = () => async (dispatch, getState) => {
    let data = await api.getProduct().then(res => {
        dispatch(getProductsList(res.data.sortingItems))
    }).catch(err => {
        return false
    });
};

export const asyncGetProductListFilter = (objFilter) => async (dispatch, getState) => {
    const token = getState().SignInReducer.token
    if(token){
        objFilter.tokenforcheck = token
        let data = await api.getProductFilterToken(objFilter).then(res => {
            dispatch(getProductsList(res.data.sortingItems))
        }).catch(err => {
            return false
        });
    }else {
        let data = await api.getProductFilter(objFilter).then(res => {
            dispatch(getProductsList(res.data.sortingItems))
        }).catch(err => {
            return false
        });
    }

};

export const asyncGetProductListUser = () => async (dispatch, getState) => {
    const token = getState().SignInReducer.token
    const objToken = {tokenforcheck: token}
    let data = await api.getProductUser(objToken).then(res => {
        dispatch(getProductsList(res.data.sortingItems))
    }).catch(err => {
        return false
    });
};

export const getCaregoryList = (data) => ({
    type: GET_CATEGORY_LIST,
    data: data
})

export const asyncGetCategoryList = () => async (dispatch, getState) => {
    let data = await api.getCategory().then(res => {
        dispatch(getCaregoryList(res.data))
    }).catch(err => {
        return false
    });
};


export const changeStateModalUse = (state) => ({
    type: STATE_MODAL_USE,
    state: state
})

export const changeStateModalBuy = (state) => ({
    type: STATE_MODAL_BUY,
    state: state
})