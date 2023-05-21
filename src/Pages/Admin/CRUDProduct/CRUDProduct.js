import React, { useEffect, useState } from "react";
import { deleteSVG } from "../../../SharedComponent/SVGicons/delete";
import { update } from "../../../SharedComponent/SVGicons/update";
import Modal from "../../../Component/Modal/Modal";
import AddProduct from "../AddProduct/AddProduct";
import { toast } from "react-toastify";
const CRUDProduct = () => {
  const [products, setProducts] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("products")));
  }, [change]);

  const handleDeleteProduct = (id) => {
    let result = window.confirm("Are you sure want to delete?");
    if (result) {
      products?.map((p, i) => {
        if (p.id == id) {
          products?.splice(i, 1);
        }
      });
      localStorage.setItem("products", JSON.stringify(products));
      setChange(!change);
      toast.error("Product deleted");
    }
  };
  return (
    <div>
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          <AddProduct
            setModalData={setModalData}
            modalData={modalData}
            products={products}
            change={change}
            setChange={setChange}
          ></AddProduct>{" "}
        </Modal>
      )}
      <div className="flex justify-end w-4/5 mx-auto mt-2 mb-2">
        <button
          className="btn single-card-button me-6 bg-gradient-to-r from-cyan-500 to-blue-500"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add Products
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-4/5 mx-auto">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>

              <th>Price</th>
              <th>Category</th>
              <th>{update}</th>
              <th>{deleteSVG}</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((d, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    {d?.title.length > 30 ? d?.title.slice(0, 30) : d?.title}
                  </td>
                  <td>{d?.price}</td>
                  <td>{d?.category}</td>

                  <td>
                    <button
                      className="addToCartButtonDecrease"
                      onClick={() => {
                        setIsOpen(true);
                        setModalData(d);
                      }}
                    >
                      {update}
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button
                      className="addToCartButtonIncrease"
                      onClick={() => handleDeleteProduct(d.id)}
                    >
                      {deleteSVG}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <hr></hr>
      </div>
    </div>
  );
};

export default CRUDProduct;
