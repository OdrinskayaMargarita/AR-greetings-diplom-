import {combineReducers} from 'redux';
import { HeaderReducer } from "./HeaderReducer"
import { ProductsReducer } from "./ProductsReducer"
import { SignInReducer } from "./SignInReducer"

export const rootReducer = combineReducers({ 
    HeaderReducer,
    ProductsReducer,
    SignInReducer,
})