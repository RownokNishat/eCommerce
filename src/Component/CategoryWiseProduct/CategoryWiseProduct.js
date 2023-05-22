import axios from "axios";
import React, { useEffect, useState } from "react";
import "./CategoryWiseProducts.css";
import { func } from "prop-types";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";
import Modal from "../Modal/Modal";
import ShowDetails from "../ShowDetails/ShowDetails";
import { cart } from "../../SharedComponent/SVGicons/cart";

const CategoryWiseProduct = () => {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then(function (res) {
        setCategories(res?.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  const handleCategory = (c) => {
    setIsLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/category/${c}`)
      .then(function (res) {
        setCategoryProducts(res.data);
        console.log(res);
        setIsLoading(false);
      })
      .catch(function (err) {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleModal = (d) => {
    setIsOpen(true);
    setData(d);
  };

  return (
    <>
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          {" "}
          <ShowDetails data={data}></ShowDetails>
        </Modal>
      )}
      <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4 lg:gap-14 md:gap-2 sm:gap-2  lg:w-4/5 lg:h-20 md:w-4/5 md:h-20 sm:w-full sm:h-20 mx-auto mt-5 mb-16 category-wise-parent-div">
        {categories?.map((c, i) => {
          return (
            <div
              key={i}
              className="category-wise-child-div flex justify-center align-middle border-2 border-solid rounded-full  bg-gradient-to-r from-violet-500 to-fuchsia-500 text-md font-bold text-white"
            >
              {" "}
              <span className="mt-6 me-2 text-red-800git">{cart}</span>
              <button onClick={() => handleCategory(c)} className="pt-1">
                {c}
              </button>
            </div>
          );
        })}
      </div>

      {isLoading ? (
        <Loading></Loading>
      ) : categoryProducts?.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 w-4/5 mx-auto mb-3">
          {categoryProducts?.map((data, i) => {
            return (
              <Product key={i} data={data} handleModal={handleModal}></Product>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default CategoryWiseProduct;
