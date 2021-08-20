import React from 'react'
import { connect } from "react-redux";

//components
import Banner from '../../Components/Banner/Banner'
import ProductsList from '../../Components/ProductsList/ProductsList'

//style
import './MainPage';


const MainPage = ({stateLanguage,token}) => {
  return (
    <main className="main">
        {!token && <Banner />}

      <ProductsList stateLanguage={stateLanguage} />
    </main>
  );
}

const mapStateToProps = ({ SignInReducer }) => {
    return {
        token: SignInReducer.token,
    };
};

export default connect(mapStateToProps)(MainPage);