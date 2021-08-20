import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import Language from "./Language";

//components
import ProductItem from "./ProductItem/ProductItem";

//material
import Pagination from '@material-ui/lab/Pagination';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

//Button
import Button from "@material-ui/core/Button";
import {orange} from "@material-ui/core/colors";

//style
import "./ProductsList.css";
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {
    asyncGetProductList,
    asyncGetProductListFilter,
    asyncGetProductListUser
} from "../../Redux/Actions/ProductsActions";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center'
    },
}));

const sortItems = [
    {
        value: 1,
        UA: 'Новинки',
        EN: 'New items',
        DE: 'Neue Dinge',
        FR: 'Nouveaux articles',
    },
    {
        value: 2,
        UA: 'Популярні',
        EN: 'Popular',
        DE: 'Beliebt',
        FR: 'Populaire',
    },
    {
        value: 4,
        UA: 'Безкоштовно',
        EN: 'Is free',
        DE: 'Ist gratis',
        FR: 'Est libre',
    },
    {
        value: 5,
        UA: 'Спочатку дорожче',
        EN: 'More expensive at first',
        DE: 'Zuerst teurer expensive',
        FR: 'Plus cher au début',
    },
    {
        value: 3,
        UA: 'Спочатку дешевше',
        EN: 'Cheaper at first',
        DE: 'Zuerst billiger',
        FR: 'Moins cher au début',
    },
]


const theme = createMuiTheme({
    palette: {
        primary: orange,
    },
});

const ProductsList = ({dispatch, stateLanguage, productsList, categoryList}) => {
    const classes = useStyles();
    const [languages] = Language;

    const [countPages, setCountPages] = useState(null)
    const [currentStatePageStart, setCurrentStatePageStart] = useState(1)
    const [currentStatePageEnd, setCurrentStatePageEnd] = useState(12)

    const [sortState, setSortState] = useState({
        sorttype: 0,
        filtrtype: 0,
    })

    const handleStandartProducts = () => {
        setSortState({sorttype: 0, filtrtype: 0})
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(asyncGetProductListUser())
        } else {
            dispatch(asyncGetProductList())
        }
    }

    useEffect(() => {
        setCountPages(Math.ceil(productsList?.length / 12))
    }, [productsList])

    useEffect(() => {
        if (sortState.sorttype !== 0 || sortState.filtrtype !== 0) {
            dispatch(asyncGetProductListFilter(sortState))
        }
    }, [sortState])

    const handleChangePagination = (e, p) => {
        const currentPageStart = (12 * p) - 11
        const currentPageEnd = 12 * p
        setCurrentStatePageStart(currentPageStart)
        setCurrentStatePageEnd(currentPageEnd > productsList.length ? productsList.length : currentPageEnd)
    }

    return (
        <section className="body_section-product">
            <div className="container">
                <div className="body__product-filter">
                    <div className="body__filter">
                        <h2 className="body__filter-h2">
                            {stateLanguage ? languages[stateLanguage].titleCatalog : null}
                        </h2>
                        <FormControl>
                            <NativeSelect onChange={(e) => setSortState({...sortState, sorttype: +e.target.value})} value={sortState.sorttype}>
                                {sortItems.map((item, key) => (
                                    <option value={item.value} key={key}>{item[stateLanguage]}</option>
                                ))
                                }
                            </NativeSelect>
                        </FormControl>
                    </div>
                    <div className="body__prod-left-filter">
                        <div className="radio-filter">
                            <RadioGroup
                                row
                                aria-label="position"
                                name="position"
                                defaultValue="top"
                            >
                                <FormControlLabel
                                    value={0}
                                    control={<Radio color="primary"/>}
                                    label={stateLanguage ? languages[stateLanguage].titleButton : null}
                                    key={0}
                                    onChange={handleStandartProducts}
                                    className='all-show'
                                />
                                {categoryList?.length &&
                                categoryList.map((categoryItem, key) => {
                                    return (
                                        <FormControlLabel
                                            value={categoryItem.categoryName}
                                            control={<Radio color="primary"/>}
                                            label={stateLanguage === 'EN' ? categoryItem.categoryName : stateLanguage === 'FR' ? categoryItem.categoryNameFR : stateLanguage === 'UA' ? categoryItem.categoryNameUkr : categoryItem.categoryNameDE}
                                            key={key}
                                            onChange={() => setSortState({...sortState, filtrtype: categoryItem.id})}
                                        />
                                    );
                                })}
                            </RadioGroup>
                        </div>

                        <div className="body__product-list">
                            {productsList?.length &&
                            (productsList?.map((productItem, key) => {
                                return (<>
                                        {(key + 1) >= currentStatePageStart && (key + 1) <= currentStatePageEnd ?
                                            <ProductItem className={classes.root} stateLanguage={stateLanguage}
                                                         productItem={productItem}
                                                         key={key}/> : null}
                                    </>
                                )
                            }))}
                        </div>
                    </div>
                </div>
                {productsList && productsList.length > 12 ?
                    <Pagination count={countPages} variant="outlined" color="primary"
                                onChange={handleChangePagination}/> : null}
            </div>
        </section>
    );
};

const mapStateToProps = ({ProductsReducer}) => {
    return {
        productsList: ProductsReducer.productsList,
        categoryList: ProductsReducer.categoryList,
    };
};

export default connect(mapStateToProps)(ProductsList);
