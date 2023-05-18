import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Modal from "../Modal/Modal";

const Products = () => {
  const [datas, setDatas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const handleModal = (d) => {
    setIsOpen(true);
    setData(d);
  };

  console.log(data);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then(function (response) {
        setDatas(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  console.log(datas);

  return (
    <div>
      {isOpen && <Modal setIsOpen={setIsOpen} data={data}></Modal>}
      <div className="grid grid-cols-3 gap-6 w-4/5 mx-auto">
        {datas?.map((data) => {
          //   return (
          //     <div>
          //       <h1>{d?.title}</h1>
          //     </div>
          //   );

          // return <Product key={data?.id} data={data}></Product>;
          const { id, title, price, description, category, image, rating } =
            data;
          return (
            <div
              key={id}
              className="card card-compact w-96 bg-base-100 shadow-xl"
            >
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
                  <button onClick={() => handleModal(data)} className="btn">
                    {" "}
                    Show Details
                  </button>

                  <button className="btn bg-gradient-to-r from-violet-500 to-fuchsia-500">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
