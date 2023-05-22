import axios from "axios";
import React, { useEffect, useState } from "react";

const HotProducts = () => {
  const [datas, setDatas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleModal = (d) => {
    setIsOpen(true);
    setData(d);
  };
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products"));
    if (products === null) {
      setIsLoading(true);
      axios
        .get("https://fakestoreapi.com/products")
        .then(function (response) {
          setDatas(response?.data);
          localStorage.setItem("products", JSON.stringify(response?.data));
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      setDatas(products);
    }
  });

  useEffect(() => {
    datas?.map((d) => {
      console.log(d);
    });
  });
  return <div></div>;
};

export default HotProducts;
