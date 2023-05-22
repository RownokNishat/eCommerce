import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Modal from "../Modal/Modal";
import ShowDetails from "../ShowDetails/ShowDetails";
const SearchProducts = () => {
  const [datas, setDatas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const [searchText, setSeacrhText] = useState("");
  const [searchingData, setSearchingData] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const handleModal = (d) => {
    setIsOpen(true);
    setData(d);
  };
  useEffect(() => {
    setDatas(JSON.parse(localStorage.getItem("products")));
  }, [searchText, isSearch]);

  const handleSearch = (e) => {
    setSeacrhText(e.target.value);
    setIsSearch(true);
    let arr = [];
    if (e.target.value === "") {
      setSearchingData([]);
    } else {
      datas?.map((d) => {
        if (
          d?.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          d?.description.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          arr.push(d);
        }
      });
      setSearchingData(arr);
    }
  };

  return (
    <div className="mt-3 min-h-screen ">
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          {" "}
          <ShowDetails data={data}></ShowDetails>
        </Modal>
      )}
      <div className="w-4/5 mx-auto flex justify-start text-xl mb-4">
        <div className="p-3 flex ">
          <input
            type="text"
            name="price"
            className="border-2 border-solid rounded border-black p-1 w-64 "
            onChange={(e) => {
              handleSearch(e);
            }}
          />
          <button
            onClick={handleSearch}
            className="ms-4 btn bg-gradient-to-r from-violet-500 to-fuchsia-500"
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 w-4/5 mx-auto">
        {searchingData?.length > 0 ? (
          searchingData?.map((data) => {
            return (
              <Product
                key={data?.id}
                data={data}
                handleModal={handleModal}
              ></Product>
            );
          })
        ) : searchText && searchingData?.length == 0 ? (
          <h2>No items found</h2>
        ) : isSearch ? (
          <h2 className="font-bold text-red-700">Please Search something</h2>
        ) : null}
      </div>
    </div>
  );
};

export default SearchProducts;
