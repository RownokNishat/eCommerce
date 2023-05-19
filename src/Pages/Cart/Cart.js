import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PurchaseHistory from "../PurchaseHistory/PurchaseHistory";
const Cart = () => {
  const [nodata, setNodata] = useState(true);
  const [data, setdata] = useState([]);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));

    if (localCart !== null) {
      setdata(localCart);
      setNodata(false);
    }
  }, [toggle]);
  console.log(data);

  const handleminus = (id) => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    console.log("minus");

    localCart.map((singleCart, i) => {
      if (id === singleCart.id) {
        if (singleCart.quantity > 1) {
          console.log(singleCart.quantity);
          localCart[i] = {
            ...singleCart,
            quantity: singleCart.quantity - 1,
            payableprice: singleCart.price * (singleCart.quantity - 1),
          };
          localStorage.setItem("cart", JSON.stringify(localCart));
          setToggle(!toggle);
        } else if (singleCart.quantity === 1) {
          let result = window.confirm("Are you sure want to delete?");
          if (result) {
            localCart.splice(i, 1);
            localStorage.setItem("cart", JSON.stringify(localCart));
            setToggle(!toggle);
          }
        }
      }
    });
  };
  const handleplus = (id) => {
    const localCart = JSON.parse(localStorage.getItem("cart"));

    localCart.map((singleCart, i) => {
      if (id === singleCart.id) {
        console.log(singleCart.quantity);
        localCart[i] = {
          ...singleCart,
          quantity: singleCart.quantity + 1,
          payableprice: singleCart.price * (singleCart.quantity + 1),
        };
        localStorage.setItem("cart", JSON.stringify(localCart));
        setToggle(!toggle);
      }
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <h2
        style={{
          textAlign: "center",
          fontSize: "25px",
          fontWeight: "700",
        }}
      >
        Cart Items
      </h2>
      {data?.length > 0 ? (
        <h1
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: "700",
          }}
        >
          Total Items Found : {data?.length}
        </h1>
      ) : (
        <h1
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: "700",
          }}
        >
          no data in cart
        </h1>
      )}

      <div className="mt-5">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((d, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{d.title}</td>
                    <td>{d.payableprice}</td>
                    <td>{d.quantity}</td>
                    <td>
                      <button
                        className="addToCartButtonDecrease"
                        onClick={() => handleminus(d.id)}
                      >
                        Less -
                      </button>
                    </td>
                    <td>
                      {" "}
                      <button
                        className="addToCartButtonIncrease"
                        onClick={() => handleplus(d.id)}
                      >
                        Add +
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="checkoutDiv">
          <Link to="/checkout">
            {" "}
            <button
              disabled={data?.length === 0 ? true : false}
              className={
                data?.length === 0 ? "disabledButton" : "checkoutButton"
              }
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
      <PurchaseHistory></PurchaseHistory>
    </div>
  );
};

export default Cart;
