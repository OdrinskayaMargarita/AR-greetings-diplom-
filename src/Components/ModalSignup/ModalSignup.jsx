import React from "react";
import {connect} from "react-redux";

//Language
import Language from "./Language";

//google facebook sigh-up
import {GoogleLogin} from "react-google-login";
import FacebookLogin from "react-facebook-login";

//Final form
import {Field, Form} from "react-final-form";

//Redux
import {
    changeStateModalRestorePass,
    changeStateModalSignIn,
    changeStateModalSignUp,
} from "../../Redux/Actions/HeaderActions";
import {
    asyncForgotPass,
    asyncGetSignInGoogleFacebook,
    asyncGetSignInNative,
    asyncGetSignUpNative,
} from "../../Redux/Actions/SignInActions";

import {createMuiTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";

//Modal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

//Button
import Button from "@material-ui/core/Button";
import {orange} from "@material-ui/core/colors";

//Style
import "./ModalSignup.css";

import TextField from "@material-ui/core/TextField";

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

const ModalSignup = ({dispatch, stateLanguage, stateModalSignIn, stateModalSignUp, stateModalRestorePass}) => {

    const classes = useStyles();

    //destructuring language file
    const [languages] = Language;

    const responseGoogle = (response) => {
        const loginData = {
            InputToken: response.accessToken,
            Provider: "Google",
        };
        dispatch(asyncGetSignInGoogleFacebook(loginData));
    };

    const responseFacebook = (response) => {
        const loginData = {
            InputToken: response.accessToken,
            Provider: "FB",
        };
        dispatch(asyncGetSignInGoogleFacebook(loginData));
    };

    return (
        <>
            <Modal
                className={classes.modal}
                open={stateModalSignUp}
                onClose={() => dispatch(changeStateModalSignUp(false))}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={stateModalSignUp}>
                    <div className={classes.paper}>
                        <h2 className="sign-title">
                            {stateLanguage ? languages[stateLanguage].title : null}
                        </h2>
                        <Form
                            onSubmit={(formObj) => {
                                dispatch(asyncGetSignInNative(formObj));
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.EmailMy) {
                                    errors.EmailMy = stateLanguage ? languages[stateLanguage].required : null
                                }
                                if (!values.Password) {
                                    errors.Password = stateLanguage ? languages[stateLanguage].required : null;
                                } else if (values.Password?.length < 6) {
                                    errors.Password = stateLanguage ? languages[stateLanguage].shortPass : null;
                                }
                                return errors;
                            }}
                            render={({handleSubmit, invalid}) => (
                                <form onSubmit={handleSubmit} className="pop-up__form-style">
                                    <Field name="EmailMy">
                                        {({input, meta}) => (
                                            <div className="block-form block-form__registration">
                                                <TextField
                                                    required
                                                    id="standard-email-required"
                                                    label={stateLanguage ? languages[stateLanguage].email : null}
                                                    type="email"
                                                    {...input}
                                                />
                                                {meta.error && meta.touched && (
                                                    <span className="error-form">{meta.error}</span>
                                                )}
                                            </div>
                                        )}
                                    </Field>

                                    <Field name="Password">
                                        {({input, meta}) => (
                                            <div className="block-form block-form__registration">
                                                <TextField
                                                    required
                                                    id="standard-password-input"
                                                    label={stateLanguage ? languages[stateLanguage].password : null}
                                                    type="password"
                                                    autoComplete="current-password"
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
                                            {stateLanguage ? languages[stateLanguage].signIn : null}
                                        </Button>
                                    </ThemeProvider>
                                </form>
                            )}
                        />
                        <div className="body__sign-in">
                            <div className="sign-in__button">
                                <FacebookLogin
                                    appId="329819821838423" //host
                                    // appId="4183008758426102" //localhost
                                    fields="name,email,picture"
                                    textButton={stateLanguage ? languages[stateLanguage].signIn : null}
                                    callback={responseFacebook}
                                    icon="fa-facebook"
                                />
                            </div>
                            <div className="sign-in__button">
                                <GoogleLogin
                                    clientId="330259824119-duf2aprdokn1hm796301df624a9hlpub.apps.googleusercontent.com" //host
                                    // clientId="615240012966-3cvads2eiov7f1m8hrohuu0c5h2ss3kl.apps.googleusercontent.com" //local host
                                    buttonText={stateLanguage ? languages[stateLanguage].signIn : null}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={"single_host_origin"}
                                />
                            </div>
                        </div>
                        <p className="go-to-registr">
                            {stateLanguage ? languages[stateLanguage].noAccount : null}
                            <span
                                onClick={() => {
                                    dispatch(changeStateModalSignUp(false));
                                    dispatch(changeStateModalSignIn(true));
                                }}
                            >
                {stateLanguage ? languages[stateLanguage].signUp : null}
              </span>
                        </p>
                        <p className="go-to-registr">
                            {stateLanguage ? languages[stateLanguage].forgotPass : null}
                            <span
                                onClick={() => {
                                    dispatch(changeStateModalSignUp(false));
                                    dispatch(changeStateModalRestorePass(true));
                                }}
                            >
                {stateLanguage ? languages[stateLanguage].restorePass : null}
              </span>
                        </p>
                    </div>
                </Fade>
            </Modal>

            <Modal
                className={classes.modal}
                open={stateModalSignIn}
                onClose={() => dispatch(changeStateModalSignIn(false))}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={stateModalSignIn}>
                    <div className={classes.paper}>
                        <h2 className="sign-title">
                            {stateLanguage ? languages[stateLanguage].title : null}
                        </h2>
                        <Form
                            onSubmit={(formObj) => {
                                dispatch(asyncGetSignUpNative(formObj));
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.UserName) {
                                    errors.UserName = stateLanguage ? languages[stateLanguage].required : null;
                                }
                                if (!values.EmailMy) {
                                    errors.EmailMy = stateLanguage ? languages[stateLanguage].required : null;
                                }
                                if (!values.Password) {
                                    errors.Password = stateLanguage ? languages[stateLanguage].required : null;
                                } else if (values.Password?.length < 6) {
                                    errors.Password = stateLanguage ? languages[stateLanguage].shortPass : null;
                                }
                                return errors;
                            }}
                            render={({handleSubmit, invalid}) => (
                                <form onSubmit={handleSubmit} className="pop-up__form-style">
                                    <Field name="UserName">
                                        {({input, meta}) => (
                                            <div className="block-form block-form__registration">
                                                <TextField
                                                    required
                                                    id="standard-user-name-required"
                                                    label={stateLanguage ? languages[stateLanguage].firstName : null}
                                                    type="text"
                                                    {...input}
                                                />
                                                {meta.error && meta.touched && (
                                                    <span className="error-form">{meta.error}</span>
                                                )}
                                            </div>
                                        )}
                                    </Field>

                                    <Field name="EmailMy">
                                        {({input, meta}) => (
                                            <div className="block-form block-form__registration">
                                                <TextField
                                                    required
                                                    id="standard-email-required"
                                                    label={stateLanguage ? languages[stateLanguage].email : null}
                                                    type="email"
                                                    {...input}
                                                />
                                                {meta.error && meta.touched && (
                                                    <span className="error-form">{meta.error}</span>
                                                )}
                                            </div>
                                        )}
                                    </Field>

                                    <Field name="Password">
                                        {({input, meta}) => (
                                            <div className="block-form block-form__registration">
                                                <TextField
                                                    required
                                                    id="standard-password-input"
                                                    label={stateLanguage ? languages[stateLanguage].password : null}
                                                    type="password"
                                                    autoComplete="current-password"
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
                                            className="header__sign-out"
                                            disabled={invalid}
                                            type="submit"
                                        >
                                            {stateLanguage ? languages[stateLanguage].signUp : null}
                                        </Button>
                                    </ThemeProvider>
                                </form>
                            )}
                        />
                        <div className="body__sign-in">
                            <div className="sign-in__button">
                                <FacebookLogin
                                    appId="329819821838423" //host
                                    // appId="4183008758426102" //localhost
                                    fields="name,email,picture"
                                    textButton={stateLanguage ? languages[stateLanguage].signIn : null}
                                    callback={responseFacebook}
                                    icon="fa-facebook"
                                />
                            </div>
                            <div className="sign-in__button">
                                <GoogleLogin
                                    clientId="330259824119-duf2aprdokn1hm796301df624a9hlpub.apps.googleusercontent.com" //host
                                    // clientId="615240012966-3cvads2eiov7f1m8hrohuu0c5h2ss3kl.apps.googleusercontent.com" //local host
                                    buttonText={stateLanguage ? languages[stateLanguage].signIn : null}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={"single_host_origin"}
                                />
                            </div>
                        </div>
                        <p className="go-to-registr">
                            {stateLanguage ? languages[stateLanguage].withAccount : null}
                            <span
                                onClick={() => {
                                    dispatch(changeStateModalSignUp(true));
                                    dispatch(changeStateModalSignIn(false));
                                }}
                            >
                {stateLanguage ? languages[stateLanguage].signIn : null}
              </span>
                        </p>
                    </div>
                </Fade>
            </Modal>

            <Modal
                className={classes.modal}
                open={stateModalRestorePass}
                onClose={() => dispatch(changeStateModalRestorePass(false))}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={stateModalRestorePass}>
                    <div className={classes.paper}>
                        <h2 className="sign-title">
                            {stateLanguage ? languages[stateLanguage].forgotPass : null}
                        </h2>
                        <Form
                            onSubmit={(formObj) => {
                                formObj.LocalMy = stateLanguage
                                dispatch(asyncForgotPass(formObj));
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.EmailMy) {
                                    errors.EmailMy = stateLanguage ? languages[stateLanguage].required : null;
                                }
                                return errors;
                            }}
                            render={({handleSubmit, invalid}) => (
                                <form onSubmit={handleSubmit} className="pop-up__form-style">
                                    <Field name="EmailMy">
                                        {({input, meta}) => (
                                            <div className="block-form block-form__registration">
                                                <TextField
                                                    required
                                                    id="standard-email-required"
                                                    label={stateLanguage ? languages[stateLanguage].email : null}
                                                    type="email"
                                                    {...input}
                                                />
                                                {meta.error && meta.touched && (
                                                    <span className="error-form">{meta.error}</span>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                    <p className='text-reset'>{stateLanguage ? languages[stateLanguage].reset : null}</p>
                                    <ThemeProvider theme={theme}>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            className="header__sign-out"
                                            disabled={invalid}
                                            type="submit"
                                        >
                                            {stateLanguage ? languages[stateLanguage].restorePass : null}
                                        </Button>
                                    </ThemeProvider>
                                </form>
                            )}
                        />
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

const mapStateToProps = ({HeaderReducer}) => {
    return {
        stateModalSignUp: HeaderReducer.stateModalSignUp,
        stateModalSignIn: HeaderReducer.stateModalSignIn,
        stateModalRestorePass: HeaderReducer.stateModalRestorePass,
    }
}

export default connect(mapStateToProps)(ModalSignup);
