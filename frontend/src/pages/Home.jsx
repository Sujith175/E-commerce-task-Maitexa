import React from "react";
import {
  FaShoppingCart,
  FaRegBookmark,
  FaStar,
  FaFireAlt,
} from "react-icons/fa";
import "./Home.css";
const Home = () => {
  return (
    <div className="product-container">
      <div className="productList">
        <div className="productCard">
          <img src="" alt="product-img" className="productImage"></img>

          <FaShoppingCart className={"productCard__cart"} />
          <FaRegBookmark className={"productCard__wishlist"} />
          <FaFireAlt className={"productCard__fastSelling"} />

          <div className="productCard__content">
            <h3 className="productName">name</h3>
            <div className="displayStack__1">
              <div className="productPrice">price</div>
            </div>
            <div className="displayStack__2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
