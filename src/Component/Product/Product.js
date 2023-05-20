import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./Product.css";

const Product = ({ data, handleModal }) => {
  const { id, title, price, description, category, image, rating } = data;
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
        {/* <p>
          {description.length > 50
            ? description.slice(0, 50) + "..."
            : description}
        </p> */}
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
        <button className="btn single-card-button me-6 bg-gradient-to-r from-cyan-500 to-blue-500">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Product;
