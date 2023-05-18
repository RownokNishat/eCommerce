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
    <div className="mt-14">
      {isOpen && <Modal setIsOpen={setIsOpen} data={data}></Modal>}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 w-4/5 mx-auto">
        {datas?.map((data) => {
          return (
            <Product
              key={data?.id}
              data={data}
              handleModal={handleModal}
            ></Product>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
