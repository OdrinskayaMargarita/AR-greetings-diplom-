import {Switch,Route} from "react-router-dom";
import React from "react";
import CardOfProduct from "../../Containers/CardOfProduct/CardOfProduct";
import MainPage from "../../Containers/MainPage/MainPage";
import PrivacyPolicy from "../../Containers/PrivacyPolicy/PrivacyPolicy";
import Help from "../../Containers/Help/Help";
import ResetPass from "../../Containers/ResetPassword/ResetPass";



const RootRouter = ({stateLanguage}) => {
    return (
        <Switch>
            <Route  path="/card-of-product">
                <CardOfProduct stateLanguage={stateLanguage}/>
            </Route>
            <Route  path="/privacy-police">
                <PrivacyPolicy stateLanguage={stateLanguage}/>
            </Route>
            <Route  path="/delete-user-data">
                <Help stateLanguage={stateLanguage}/>
            </Route>
            <Route  path="/ResetPassword">
                <ResetPass stateLanguage={stateLanguage}/>
            </Route>
            <Route   path="/">
                <MainPage stateLanguage={stateLanguage}/>
            </Route>
        </Switch>
    );
};

export default RootRouter;