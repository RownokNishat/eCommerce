import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Modal from "../Modal/Modal";
import ShowDetails from "../ShowDetails/ShowDetails";
import { sort } from "semver";

const Products = () => {
  const [datas, setDatas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highSortDatas, setHighSortDatas] = useState(null);
  const [lowSortDatas, setLowSortDatas] = useState(null);

  const handleModal = (d) => {
    setIsOpen(true);
    setData(d);
  };
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then(function (response) {
        setDatas(response?.data);
        localStorage.setItem("products", JSON.stringify(response?.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (sortBy == 0) {
      setDatas(highSortDatas);
    } else if (sortBy == 1) {
      setDatas(lowSortDatas);
    }
  }, [setHighSortDatas, highSortDatas, lowSortDatas, setLowSortDatas]);

  useEffect(() => {
    if (sortBy === "0") {
      setHighSortDatas(datas.sort((a, b) => b.price - a.price));
      setLowSortDatas([]);
    }
    if (sortBy === "1") {
      setLowSortDatas(datas.sort((a, b) => a.price - b.price));
      setHighSortDatas([]);
    }
  }, [sortBy]);

  return (
    <div className="mt-3">
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          {" "}
          <ShowDetails data={data}></ShowDetails>
        </Modal>
      )}
      <div className="w-4/5 mx-auto flex justify-end gap-8 text-xl font-bold mb-4">
        <div className="border-spacing-16 rounded border-solid border-2  border-black ">
          <div className="p-2 flex">
            <input
              type="radio"
              name="price"
              value="0"
              onChange={(e) => setSortBy(e.target.value)}
            />
            <p className="ps-2">High to low</p>
          </div>
        </div>
        <div className="border-spacing-16 rounded border-solid border-2  border-black ">
          <div className="p-2 flex">
            <input
              type="radio"
              name="price"
              value="1"
              onChange={(e) => setSortBy(e.target.value)}
            />
            <p className="ps-2">Low to high</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 w-4/5 mx-auto">
        {datas
          ? datas?.map((data) => {
              return (
                <Product
                  key={data?.id}
                  data={data}
                  handleModal={handleModal}
                ></Product>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Products;
