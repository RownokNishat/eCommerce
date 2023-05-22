import axios from "axios";
import React, { useEffect, useState } from "react";
import { usersSVG } from "../../SharedComponent/SVGicons/users";
import "./Static.css";
import { reviewsvg } from "../../SharedComponent/SVGicons/review";
import { productsvg } from "../../SharedComponent/SVGicons/products";

const Static = () => {
  const [users, setUsers] = useState([]);
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/users")
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products"));
    if (products === null) {
      axios
        .get("https://fakestoreapi.com/products")
        .then(function (response) {
          setDatas(response?.data);
          localStorage.setItem("products", JSON.stringify(response?.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setDatas(products);
    }
  }, []);
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 lg:gap-14 md:gap-10 sm:gap-10  lg:w-4/5 lg:h-20 md:w-4/5 md:h-20 sm:w-full sm:h-20 mx-auto mt-5 mb-16 static-parent-div">
      <div className="static-child-div flex justify-between border-2 rounded-3xl border-solid   bg-gradient-to-r from-[#f0abfc] to-[#dbe3ec]">
        <div className="flex align-middle flex-col p-4  font-bold ">
          <h2>Products</h2>
          <span className="text-2xl"> {datas?.length}</span>
        </div>
        <div className="p-8">
          <div>{productsvg}</div>
        </div>
      </div>
      <div className=" static-child-div flex justify-between border-2 border-solid rounded-3xl  bg-gradient-to-r from-[#4CA1AF] to-[#C4E0E5]">
        <div className="  flex align-middle text-white flex-col p-4  font-bold ">
          <h2>Users</h2>
          <span className="text-2xl"> {users?.length}</span>
        </div>
        <div className="p-8">
          <div>{usersSVG}</div>
        </div>
      </div>
      <div className="static-child-div flex justify-between border-2 border-solid rounded-3xl bg-gradient-to-r from-[#f0abfc] to-[#dbe3ec]">
        <div className="flex align-middle flex-col p-4  font-bold ">
          <h2>Reviews</h2>
          <span className="text-2xl">7</span>
        </div>
        <div className="p-8">
          <div>{reviewsvg}</div>
        </div>
      </div>
    </div>
  );
};

export default Static;
