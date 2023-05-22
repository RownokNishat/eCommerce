import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../SharedComponent/Authprovider/Authprovider";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../../Component/Loading/Loading";

const AddProduct = ({
  modalData,
  setModalData,
  products,
  change,
  setChange,
}) => {
  const { toggle, settoggle } = useContext(AuthContext);
  const [state, setState] = useState({
    isLoading: false,
    formData: {
      title: modalData ? modalData?.title : "",
      price: modalData ? modalData?.price : "",
      description: modalData ? modalData?.description : "",
      image: modalData ? modalData?.image : "",
      category: modalData ? modalData?.category : "",
      rating: {
        rate: modalData?.rating?.rate ? modalData?.rating?.rate : 3.9,
        count: modalData?.rating?.count ? modalData?.rating?.count : 120,
      },
    },
  });

  const handleAddProductInput = (e) => {
    e.preventDefault();
    const formData = state.formData;
    const value = e.target.value;
    const inputname = e.target.name;

    setState({ ...state, formData: { ...formData, [inputname]: value } });
  };

  console.log(modalData);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!modalData?.id) {
      let data = state.formData;
      data.id = products.length + 1;
      products.push(data);
      setState({ ...state, isLoading: true });
      axios
        .post(`https://fakestoreapi.com/products`, state.formData)
        .then(function (response) {
          setState({ ...state, isLoading: false });
          toast.success("Product added successfully");
          console.log(response);
          localStorage.setItem("products", JSON.stringify(products));
          setChange(!change);
          settoggle(!toggle);
        })
        .catch(function (error) {
          setState({ ...state, isLoading: false });
          toast.error("Fail to add product");
          console.log(error);
        });
    } else {
      let data = state.formData;
      products?.map((p, i) => {
        if (p.id == modalData.id) {
          products[i] = data;
        }
      });

      setState({ ...state, isLoading: true });
      axios
        .put(
          `https://fakestoreapi.com/products/${modalData?.id}`,
          state.formData
        )
        .then(function (response) {
          setState({ ...state, isLoading: false });
          toast.success("Product updated successfully");
          console.log(response);
          localStorage.setItem("products", JSON.stringify(products));
          setChange(!change);
          settoggle(!toggle);
          setModalData([]);
        })
        .catch(function (error) {
          setState({ ...state, isLoading: false });
          toast.error("Fail to update product");
          console.log(error);
        });
    }
  };
  return (
    <>
      {state?.isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="card-body mt-0">
          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-white">title</span>
              </label>
              <input
                onChange={(e) => handleAddProductInput(e)}
                name="title"
                type="text"
                value={state?.formdata?.title}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-white">price</span>
              </label>
              <input
                onChange={(e) => handleAddProductInput(e)}
                name="price"
                type="text"
                placeholder={state?.formdata?.price}
                className="input input-bordered"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-1 md:grid-cols-1 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-white">
                  description
                </span>
              </label>
              <input
                onChange={(e) => handleAddProductInput(e)}
                name="description"
                type="description"
                value={state?.formdata?.description}
                className="input input-bordered"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-white">
                  category
                </span>
              </label>
              <input
                onChange={(e) => handleAddProductInput(e)}
                name="category"
                type="text"
                value={state?.formdata?.category}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-white">Image</span>
              </label>
              <input
                onChange={(e) => handleAddProductInput(e)}
                name="image"
                type="text"
                value={state?.formdata?.image}
                className="input input-bordered"
              />
            </div>
          </div>

          <div className="form-control mt-2">
            <button
              onClick={handleAddProduct}
              className="btn border-0 bg-gradient-to-r from-violet-500 to-fuchsia-500"
            >
              {modalData ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;
