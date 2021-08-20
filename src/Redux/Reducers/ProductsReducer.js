import {
  GET_PRODUCTS_LIST,
  GET_CATEGORY_LIST,
  STATE_MODAL_USE,
  STATE_MODAL_BUY,
} from '../Actions/Constants';

const initialState = {
  productsList: null,
  categoryList: null,
  modalStateUse: false,
  modalStateBuy: false,
}

export const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_LIST: {
      return {...state, productsList: action.data}
    }
    case GET_CATEGORY_LIST: {
      return {...state, categoryList: action.data}
    }
    case STATE_MODAL_USE: {
      return {...state, modalStateUse: action.state}
    }
    case STATE_MODAL_BUY: {
      return {...state, modalStateBuy: action.state}
    }
    default:
      return state;
  }
}