import React from "react";

import { blue, red, pink } from "@material-ui/core/colors";

//Language
import Language from "./Language";

//Router
import { Link } from "react-router-dom";

//Images
import logoMob from "../../images/logoAR.png";
import logo from "../../images/logo.png";
import gplayBig from "../../images/GooglePlay.png";

//Icons
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";

//Styles
import "./Footer.css";

const Footer = ({ stateLanguage, ...props }) => {
  //destructuring language file
  const [languages] = Language;

  return (
    <footer className="footer-body">
      <div className="container footer-content">
        <div className="footerlogo">
          <Link to="/" className="footer-logo">
            <img src={logoMob} className="footer__logo-mob" alt="Logo"></img>
            <img src={logo} className="footer__logo-desc" alt="logo"></img>
          </Link>
        </div>

        <div className="footer-right">
          <div className="footer-right__top">
            <div className="footer-right__links">
              <Link to="/" className="social-link facebook-logo">
                <FacebookIcon style={{ color: blue[900] }}> </FacebookIcon>
              </Link>
              <Link to="/" className="social-link">
                <YouTubeIcon style={{ color: red[700] }}> </YouTubeIcon>
              </Link>
              <Link to="/" className="social-link">
                <InstagramIcon style={{ color: pink[400] }}> </InstagramIcon>
              </Link>
            </div>
            <div className='gplay-block'>
              <Link to="/" className="lnk-gplay">
                <img src={gplayBig} alt="google play"></img>
              </Link>
            </div>
          </div>

          <div className="footer-right__bottom">
            <ul className="links-footer__body">
              <li>
                <Link
                  to="/"
                  data-content={stateLanguage && languages[stateLanguage].link1}
                >
                  {stateLanguage && languages[stateLanguage].link1}
                </Link>
              </li>
              <li>
                <Link
                  to="/delete-user-data"
                  data-content={stateLanguage && languages[stateLanguage].link2}
                >
                  {stateLanguage && languages[stateLanguage].link2}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  data-content={stateLanguage && languages[stateLanguage].link3}
                >
                  {stateLanguage && languages[stateLanguage].link3}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  data-content={stateLanguage && languages[stateLanguage].link4}
                >
                  {stateLanguage && languages[stateLanguage].link4}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-police"
                  data-content={stateLanguage && languages[stateLanguage].link5}
                >
                  {stateLanguage && languages[stateLanguage].link5}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  data-content={stateLanguage && languages[stateLanguage].link6}
                >
                  {stateLanguage && languages[stateLanguage].link6}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
