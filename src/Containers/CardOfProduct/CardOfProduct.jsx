import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

//Components
import ModalDefault from "../../Components/ModalDefault/ModalDefault";

//Language
import Language from "./Language";

//Images
import wPhoto from "../../images/without-photo.png";
import mobApp from "../../images/mobile-app.jpg"

//router
import {useLocation} from "react-router-dom";

import {changeStateModalBuy, changeStateModalUse} from "../../Redux/Actions/ProductsActions";

//Buttons
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {orange} from "@material-ui/core/colors";

//style
import "./CardOfProduct.css";

const CardOfProduct = ({dispatch, stateLanguage, productsList, modalStateUse, modalStateBuy,token}) => {
    let {hash} = useLocation();

    const [stateProduct, setStateProduct] = useState(null);


    useEffect(() => {
        productsList &&
        productsList.filter((item, key) => {
            if (item.id == hash.replace(/[^0-9]/g, "")) {
                let objProduct = {...item};
                setStateProduct(objProduct);
            }
        });
    }, [productsList]);

    const theme = createMuiTheme({
        palette: {
            primary: orange,
        },
    });

    const handleStateModalOpenUse = () => dispatch(changeStateModalUse(true));

    const handleStateModalCloseUse = () => dispatch(changeStateModalUse(false));

    const handleStateModalOpenBuy = () => dispatch(changeStateModalBuy(true));

    const handleStateModalCloseBuy = () => dispatch(changeStateModalBuy(false));

    //destructuring language file
    const [languages] = Language;
    return (
        <main className="main">
            <div className="container">
                <div className="card-product">
                    <div className="product__banner">
                        <div className="product__banner-text">
                            <h1>
                                {stateLanguage === "EN"
                                    ? stateProduct?.name
                                    : stateLanguage === "FR"
                                        ? stateProduct?.nameFR
                                        : stateLanguage === "UA"
                                            ? stateProduct?.nameUkr
                                            : stateProduct?.nameDE}
                            </h1>
                            <p className="product__banner-text-author">
                               <span>{stateLanguage ? languages[stateLanguage].author : null}: </span>
                               
                               <span> {stateProduct?.author}</span>
                            </p>
                            <p>
                                {stateLanguage
                                    ? languages[stateLanguage].prodDescription
                                    : null}
                            </p>
                            <p>
                                {stateLanguage
                                    ? languages[stateLanguage].prodDescription2
                                    : null}
                            </p>
                        </div>
                        <div className="product-img">

                            <iframe width="800px" height="600px" src={stateProduct?.linkDownload} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loop='1' autoplay='1'></iframe>
                            {/* {
                                <img
                                    className="product__img"
                                    src={
                                        stateProduct?.linkPhoto ? stateProduct.linkPhoto : wPhoto
                                    }
                                />
                            } */}

                            <div className="product-buttons">
                                <ThemeProvider theme={theme}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        className="product-btn"
                                        onClick={handleStateModalOpenUse}
                                    >
                                        Use 1 times from {token ? stateProduct?.remaindeUsing : stateProduct?.possibleUsing} times
                                        {console.log(stateProduct)}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        className="product-btn"
                                        onClick={handleStateModalOpenBuy}
                                    >
                                        Buy {stateProduct?.cost} грн - 10 uses
                                    </Button>
                                </ThemeProvider>
                            </div>
                        </div>
                    </div>
                    <div className="product__instruction">
                        <ol className="instruction-list">
                            {languages[stateLanguage]?.prodInstruction.map(
                                (instructionItem, key) => (
                                    typeof(instructionItem) === 'string' ? 
                                        <li key={key}>
                                            {instructionItem}
                                        </li> :
                                        <li key={key}>
                                           {instructionItem[0]}{<img src={instructionItem[1]} alt='alt'/>}{instructionItem[2]}
                                       </li>
                                )
                            )}
                        </ol>
                    </div>
                </div>
            </div>
            <ModalDefault
                open={modalStateUse}
                onClose={handleStateModalCloseUse}
                textPopUp={
                    {UA: {
                        description1: 'Використати наші AR-листівки можна лише в нашому додатку AR для мобільних пристроїв. Посилання для швидкого переходу для перегляду AR-листівки ',
                        link: '#',
                        description2: 'Посилання на додаток',
                    },
                    EN: {
                        description1: 'You can use our AR-cards only in our AR application for mobile devices. Quick Navigation Link to View AR Leaflet ',
                        link: '#',
                        description2: 'Link to the application',
                    },
                    FR: {
                        description1: 'Vous pouvez utiliser nos cartes AR uniquement dans notre application AR pour appareils mobiles. Lien de navigation rapide pour afficher la brochure AR ',
                        link: '#',
                        description2: 'Lien vers lapplication',
                    },
                    DE: {
                        description1: 'Sie können unsere AR-Karten nur in unserer AR-Anwendung für mobile Geräte verwenden. Schnellnavigationslink zum Anzeigen des AR-Merkblatts ',
                        link: '#',
                        description2: 'Link zur Bewerbung',
                    }}}
                stateLanguage={stateLanguage}
            />
            <ModalDefault
                open={modalStateBuy}
                onClose={handleStateModalCloseBuy}
                textPopUp={
                    {UA: {
                        description1: 'Придбати наші AR-листівки можна лише в нашому додатку AR для мобільних пристроїв. Посилання для швидкого переходу для придбання AR-листівки "Назва"',
                        link: '#',
                        description2: 'Посилання на додаток',
                    },
                    EN: {
                        description1: 'You can buy our AR-cards only in our AR application for mobile devices. Quick Navigation Link to Purchase AR Leaflet "Name"',
                        link: '#',
                        description2: 'Link to the application',
                    },
                    FR: {
                        description1: 'Vous pouvez acheter nos cartes AR uniquement dans notre application AR pour appareils mobiles. Lien de navigation rapide pour acheter la brochure AR "Nom"',
                        link: '#',
                        description2: 'Lien vers lapplication',
                    },
                    DE: {
                        description1: 'Sie können unsere AR-Karten nur in unserer AR-Anwendung für mobile Geräte kaufen. Schnellnavigationslink zum Kauf AR-Broschüre "Name"',
                        link: '#',
                        description2: 'Link zur Bewerbung',
                    }}
                }
                stateLanguage={stateLanguage}
            />
        </main>
    );
};

const mapStateToProps = ({ProductsReducer,SignInReducer}) => {
    return {
        productsList: ProductsReducer.productsList,
        modalStateUse: ProductsReducer.modalStateUse,
        modalStateBuy: ProductsReducer.modalStateBuy,
        token: SignInReducer.token,
    };
};

export default connect(mapStateToProps)(CardOfProduct);
