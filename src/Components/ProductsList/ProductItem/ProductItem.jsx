import React from "react";

//Router
import {Link} from "react-router-dom";

//Images
import wPhoto from "../../../images/without-photo.png";

//style
import "./ProductItem.css";

const ProductItem = ({ stateLanguage, productItem}) => {

    return (
        <div className="product-item">
            <Link className='all-item-prod' to={{pathname: '/card-of-product', hash: `#${productItem.id}` }} >
                <div className='product-item__img'>
                    {<img src={productItem?.linkPhoto ? productItem.linkPhoto : wPhoto}/>}
                </div>
                <p className='prod-title-price'>
                    <p className='product-item__title'>
                        {stateLanguage === 'EN' ? productItem.name : stateLanguage === 'FR' ? productItem.nameFR : stateLanguage === 'UA' ? productItem.nameUkr : productItem.nameDE}
                    </p>

                    <span className='prod-price'>{productItem?.cost} ₴</span>
                </p>
                
                <p className="text-author">
                    <span>Author: </span>
                    <span> {productItem?.author}</span>
                </p>
            </Link>
        </div>
    );
};

export default ProductItem;