import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";

const Modal = ({ setIsOpen, data }) => {
  console.log(data);
  const { id, title, price, description, category, image, rating } = data;
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            X
          </button>
          <div className={styles.modalContent}>
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
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Submit
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
