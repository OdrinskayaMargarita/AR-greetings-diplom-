import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

//components
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import RootRouter from "./Components/RootRouter/RootRouter";
import { SaveToLocalStorage } from "./Components/SaveToLocalStorage/SaveToLocalStorage"

//Reducers
import { asyncGetProductList,asyncGetProductListUser,asyncGetCategoryList } from './Redux/Actions/ProductsActions'
import { saveToken,saveName } from './Redux/Actions/SignInActions'

//components material UI
import ModalSignup from './Components/ModalSignup/ModalSignup'

//style
import './App.css';


const App = () => {
  const dispatch = useDispatch()

  const [stateLanguage, setStateLanguage] = useState();

  useEffect(() => {
    // token
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(saveToken(token))
      dispatch(asyncGetProductListUser())
    } else {
      dispatch(asyncGetProductList())
    }

    //Name
    const name = localStorage.getItem("NAME");
    if (token) {
      dispatch(saveName(name))
    }

    //get first func
    dispatch(asyncGetCategoryList())

    // language
    const users = localStorage.getItem("LANGUAGE");
    if (users == null) {
      SaveToLocalStorage("LANGUAGE",'EN')
      setStateLanguage('EN')
      return;
    } else {
      setStateLanguage(users)
      return;
    }
  }, [])

  const changeLanguage = (e) => {
    SaveToLocalStorage("LANGUAGE",e)
    setStateLanguage(e)
  }

  return (
    <div className="App">
      <Header changeLanguage={changeLanguage} stateLanguage={stateLanguage}/>

      <RootRouter stateLanguage={stateLanguage}/>

      <Footer stateLanguage={stateLanguage}/>

      <ModalSignup stateLanguage={stateLanguage}/>
    </div>
  );
}

export default App;