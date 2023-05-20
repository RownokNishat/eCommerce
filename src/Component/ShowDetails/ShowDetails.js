import React from "react";
import styles from "../Modal/Modal.module.css";

const ShowDetails = ({ data }) => {
  const { id, title, price, description, category, image, rating } = data;
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <div className={styles.modalImage}>
        <img src={image} alt={title} />
      </div>
      <div className="card-body text-start">
        <h2 className="card-title">{title}</h2>
        <h3 className="font-bold text-red-800">{price} TK</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ShowDetails;
