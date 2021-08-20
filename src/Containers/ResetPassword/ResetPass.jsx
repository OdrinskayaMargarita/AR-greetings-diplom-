import React, {useEffect} from 'react'

//Final form
import {Field, Form} from "react-final-form";
import TextField from "@material-ui/core/TextField";

//Router
import {Link} from "react-router-dom";

//Language
import Language from "./Language";

//Style
import "./ResetPass.css";

import HomeIcon from '@material-ui/icons/Home';

//style
import './ResetPass';
import {asyncForgotPass, asyncNewPass} from "../../Redux/Actions/SignInActions";
import {createMuiTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {orange} from "@material-ui/core/colors";
import {connect} from "react-redux";
import {changeStateModalRestorePass} from "../../Redux/Actions/HeaderActions";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import {SignInReducer} from "../../Redux/Reducers/SignInReducer";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #FF9800",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: orange,
    },
});

const ResetPass = ({dispatch,stateLanguage,stateModalSuccessRestorePass}) => {

    const classes = useStyles();
    //destructuring language file
    const [languages] = Language;

    return (
        <main className="main">
            <p className='titlePass'>{stateLanguage ? languages[stateLanguage].title : null}</p>
            <Form
                onSubmit={(formObj) => {
                    formObj.adress = window.location.href
                    dispatch(asyncNewPass(formObj));
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.passw) {
                        errors.passw = 'requared';
                    } else if(values.passw.length < 6) {
                        errors.passw = 'minimum password length 6 characters';
                    }
                    if(values.newPass !== values.passw){
                        errors.newPass = 'password not much';
                    }
                    return errors;
                }}
                render={({handleSubmit, invalid}) => (
                    <form onSubmit={handleSubmit} className="pop-up__form-style">
                        <Field name="passw">
                            {({input, meta}) => (
                                <div className="new-pass">
                                    <TextField
                                        required
                                        id="password"
                                        label='new password'
                                        type="password"
                                        {...input}
                                    />
                                    {meta.error && meta.touched && (
                                        <span className="error-form">{meta.error}</span>
                                    )}
                                </div>
                            )}
                        </Field>
                        <Field name="newPass">
                            {({input, meta}) => (
                                <div className="new-pass">
                                    <TextField
                                        required
                                        id="password-2"
                                        label='confirm new password'
                                        type="password"
                                        {...input}
                                    />
                                    {meta.error && meta.touched && (
                                        <span className="error-form">{meta.error}</span>
                                    )}
                                </div>
                            )}
                        </Field>
                        <ThemeProvider theme={theme}>
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                className="block-form__main-button purple-button"
                                disabled={invalid}
                                type="submit"
                            >
                                {stateLanguage ? languages[stateLanguage].button : null}
                            </Button>
                        </ThemeProvider>
                    </form>
                )}
            />
            <Modal
                className={classes.modal}
                open={stateModalSuccessRestorePass}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={stateModalSuccessRestorePass}>
                    <div className={classes.paper}>
                        <p> {stateLanguage ? languages[stateLanguage].saved : null} <Link to='/'><HomeIcon/></Link></p>
                    </div>
                </Fade>
            </Modal>
        </main>
    );
}


const mapStateToProps = ({HeaderReducer,SignInReducer}) => {
    return {
        stateModalSignUp: HeaderReducer.stateModalSignUp,
        stateModalSignIn: HeaderReducer.stateModalSignIn,
        stateModalRestorePass: HeaderReducer.stateModalRestorePass,
        stateModalSuccessRestorePass: SignInReducer.stateModalSuccessRestorePass,
    }
}

export default connect(mapStateToProps)(ResetPass);