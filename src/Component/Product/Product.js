import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import "./Product.css";
import { AuthContext } from "../../SharedComponent/Authprovider/Authprovider";
import { toast } from "react-toastify";

const Product = ({ data, handleModal }) => {
  const { id, title, price, description, category, image, rating } = data;
  const [cart, setCart] = useState([]);
  const [disable, setDisable] = useState(false);
  const { toggle, settoggle } = useContext(AuthContext);

  const setAddToCart = (data) => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    data.quantity = 1;
    data.payableprice = data.price;
    toast.success("Product has added to cart");
    if (localCart === null) {
      var arr = [];
      arr.push(data);
      console.log("nocart");
      localStorage.setItem("cart", JSON.stringify(arr));
      setCart(data);
      setDisable(true);
    } else {
      var count = 0;
      localCart?.map((singleObj) => {
        if (singleObj.id === data.id) {
          count = count + 1;
        }
      });
      if (count > 0) {
        alert("Data already in cart");
      } else {
        localCart.push(data);
        localStorage.setItem("cart", JSON.stringify(localCart));
        setDisable(true);
      }
    }
  };
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    var count = 0;
    localCart?.map((singleObj) => {
      if (singleObj.id === data.id) {
        count = count + 1;
        setDisable(true);
      }
    });
  }, []);
  return (
    <div className="single-card bg-base-100 shadow-2xl">
      <div className="single-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="single-card-body">
        <p className="single-card-title">{title}</p>
        <p className="single-card-text font-bold text-red-700">
          {price} <span className="text-xm font-extrabold"> TK</span>
        </p>
        <p className="single-card-text">{category}</p>
      </div>
      <div className="single-card-footer">
        <button
          onClick={() => {
            handleModal(data);
          }}
          className="btn single-card-button me-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 "
        >
          Show Details
        </button>

        <button
          className={
            disable
              ? "btn single-card-button me-6 bg-gray-500"
              : "addToCartButton btn single-card-button me-6 bg-gradient-to-r from-cyan-500 to-blue-500"
          }
          disabled={disable}
          onClick={() => {
            setAddToCart(data);
            settoggle(!toggle);
          }}
        >
          {disable ? "Already Added" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default Product;
