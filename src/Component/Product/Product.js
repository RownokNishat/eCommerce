import React, { useState } from "react";
import Modal from "../Modal/Modal";

const Product = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const { id, title, price, description, category, image, rating } = props.data;

  const handleModal = (d) => {
    setIsOpen(true);
    setData(d);
  };
  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img className="h-48 w-48" src={image} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <h4>{price}TK</h4>
          <h5>{category}</h5>
          <p>
            {description.length > 100
              ? description.slice(0, 100) + "..."
              : description}
          </p>
          <div className="card-actions justify-end">
            <button
              onClick={() => {
                handleModal(props.data);
              }}
              className="btn"
            >
              Show Details
            </button>
            {isOpen && <Modal setIsOpen={setIsOpen} data={data}></Modal>}

            <button className="btn bg-gradient-to-r from-violet-500 to-fuchsia-500">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
