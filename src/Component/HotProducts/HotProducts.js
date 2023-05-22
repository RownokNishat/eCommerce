import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import ShowDetails from "../ShowDetails/ShowDetails";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";
import { firesvg } from "../../SharedComponent/SVGicons/fire";

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
          //   setDatas(response?.data);
          localStorage.setItem("products", JSON.stringify(response?.data));
          setDatas(
            response?.data?.sort((a, b) => {
              return (
                b?.rating?.rate * b?.rating.count -
                a?.rating?.rate * a?.rating.count
              );
            })
          );
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      setDatas(products);
    }
  }, []);

  console.log(datas);

  //   console.log(datas);
  return (
    <div className="mt-10 mb-10">
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          {" "}
          <ShowDetails data={data}></ShowDetails>
        </Modal>
      )}

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className=" flex justify-center text-center  font-bold text-2xl mb-10">
            <span>{firesvg}</span>
            <span className="mt-2">Most Popular Products</span>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 w-4/5 mx-auto mb-3">
            {datas?.slice(0, 3).map((data) => {
              return (
                <Product
                  key={data?.id}
                  data={data}
                  handleModal={handleModal}
                ></Product>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default HotProducts;
