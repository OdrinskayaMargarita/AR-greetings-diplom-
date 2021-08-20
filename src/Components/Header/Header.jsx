import React, {useEffect} from "react";
import { connect } from "react-redux";

//Language
import Language from "./Language";

//Router
import { Link } from "react-router-dom";

//Redux
import { changeStateModalSignUp } from "../../Redux/Actions/HeaderActions";

//Images
import logoMob from "../../images/logoAR.png";
import logo from "../../images/logo.png";
import gplay from "../../images/gplay.png";

//Buttons
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { orange } from "@material-ui/core/colors";

//Select
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

//Icons
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import "./Header.css";
import {asyncLogout} from "../../Redux/Actions/SignInActions";

const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});

const Header = ({ dispatch, changeLanguage, stateLanguage, token, name }) => {
  console.log(name)
  //destructuring language file
  const [languages] = Language;
  return (
    <header className="header-body">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="header-logo">
            <img src={logoMob} className="header__logo-mob" alt="Logo"></img>
            <img src={logo} className="header__logo-desc" alt="logo"></img>
          </Link>
          <div className="header-buttons">
            <Link to="/" className="lnk-gplay">
              <img src={gplay} alt="google play"></img>
            </Link>
            <p className='name-header'>{name ? name : null}</p>
            <ThemeProvider theme={theme}>
              {Boolean(token) ? (
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  endIcon={<ExitToAppIcon />}
                  className="header__sign-out"
                  onClick={() => dispatch(asyncLogout())}
                >
                  {stateLanguage ? languages[stateLanguage].buttonLogout : null}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => dispatch(changeStateModalSignUp(true))}
                  variant="contained"
                  color="primary"
                  startIcon={<PersonIcon />}
                  className="header__sign-in"
                >
                  {stateLanguage ? languages[stateLanguage].buttonLogin : null}
                </Button>
              )}
            </ThemeProvider>
            <FormControl>
              <NativeSelect
                inputProps={{
                  name: "name",
                  id: "lang",
                }}
                onChange={(e) => changeLanguage(e.target.value)}
                value={stateLanguage}
              >
                <option value="EN">En</option>
                <option value="DE">De</option>
                <option value="FR">Fr</option>
                <option value="UA">Ua</option>
              </NativeSelect>
            </FormControl>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = ({SignInReducer}) => {
  return {
    token: SignInReducer.token,
    name: SignInReducer.name
  }
}

export default connect(mapStateToProps)(Header);
