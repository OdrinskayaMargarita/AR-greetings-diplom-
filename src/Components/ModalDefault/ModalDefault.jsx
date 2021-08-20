import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

//Modal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

//Button
import Button from "@material-ui/core/Button";
import { orange } from "@material-ui/core/colors";

//Style
import "./ModalDefault.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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
    padding: "40px 60px",
    maxWidth: "800px",
    width: "100%"
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});

const ModalDefault = ({ open,onClose,textPopUp,stateLanguage }) => {
  const classes = useStyles();
  return (
    <>
      <Modal
        className={classes.modal}
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <p>
              {textPopUp[stateLanguage] && textPopUp[stateLanguage].description1}
              <a href={textPopUp[stateLanguage] && textPopUp[stateLanguage].link}>{textPopUp[stateLanguage] && textPopUp[stateLanguage].description2}</a>
            </p>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalDefault;
