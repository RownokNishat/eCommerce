import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Product from "../Product/Product";
import Modal from "../Modal/Modal";
import ShowDetails from "../ShowDetails/ShowDetails";
import ReactPaginate from "react-paginate";
import { BallTriangle, RotatingLines } from "react-loader-spinner";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../SharedComponent/Authprovider/Authprovider";

const Products = () => {
  const [datas, setDatas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highSortDatas, setHighSortDatas] = useState(null);
  const [lowSortDatas, setLowSortDatas] = useState(null);

  const { toggle } = useContext(AuthContext);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);

  // Number of items per page
  const itemsPerPage = 6;

  const pageCount = Math.ceil(datas?.length / itemsPerPage);

  // Handle page change event
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Get current items based on current page

  const currentItems = datas?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

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
  }, [toggle]);

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

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="w-4/5 mx-auto flex lg:justify-end md:justify-start gap-8 text-xl font-bold mb-4">
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

          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 w-4/5 mx-auto mb-3">
            {currentItems
              ? currentItems?.map((data) => {
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
          <ReactPaginate
            previousLabel={<span className="font-bold">Previous</span>}
            nextLabel={<span className="font-bold">Next</span>}
            breakLabel={<span className="font-bold">...</span>}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="flex justify-center"
            previousLinkClassName="mr-2"
            nextLinkClassName="ml-2"
            pageLinkClassName="px-2 py-1 font-bold"
            activeLinkClassName="bg-blue-500 text-white font-bold"
            disabledClassName="text-gray-400 font-bold"
          />
        </>
      )}
    </div>
  );
};

export default Products;
