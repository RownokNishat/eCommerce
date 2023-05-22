import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PurchaseHistory from "../PurchaseHistory/PurchaseHistory";
import { AuthContext } from "../../SharedComponent/Authprovider/Authprovider";
import { toast } from "react-toastify";
import { minus } from "../../SharedComponent/SVGicons/Minus";
import { plus } from "../../SharedComponent/SVGicons/Plus";
const Cart = () => {
  const [nodata, setNodata] = useState(true);
  const [data, setdata] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [totalPayablePrice, settotalPayablePrice] = useState(0);
  const [userData, setUserData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userid")));
  }, [user]);

  console.log(userData);
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));

    if (localCart !== null) {
      let totalPayAblePrice = 0;
      localCart?.map((singleCart) => {
        totalPayAblePrice += singleCart?.payableprice;
      });
      settotalPayablePrice(totalPayAblePrice);
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
            toast.error("Product is removed from the cart");
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
    <div className="max-w-screen-lg mx-auto mt-5">
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
                <th>Status</th>
                <th>Status</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Payable Price</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((d, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      {d.title.length > 30 ? d.title.slice(0, 30) : d.title}
                    </td>

                    <td>
                      <button
                        className="addToCartButtonDecrease"
                        onClick={() => handleminus(d.id)}
                      >
                        {minus}
                      </button>
                    </td>
                    <td>
                      {" "}
                      <button
                        className="addToCartButtonIncrease"
                        onClick={() => handleplus(d.id)}
                      >
                        {plus}
                      </button>
                    </td>
                    <td>{d.price}</td>
                    <td>{d.quantity}</td>
                    <td>{d.payableprice}</td>
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total Payable Price</td>
                <td>{totalPayablePrice?.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <hr></hr>
        </div>
        <div className="checkoutDiv mt-3 flex justify-start">
          {userData ? (
            <Link to="/purchaseHistory">
              {" "}
              <button
                disabled={data?.length === 0 ? true : false}
                className={
                  data?.length === 0
                    ? "btn single-card-button me-6 bg-gray-500"
                    : "addToCartButton btn single-card-button me-6 bg-gradient-to-r from-cyan-500 to-blue-500"
                }
              >
                Checkout
              </button>
            </Link>
          ) : (
            <Link to="/loginPage">
              {" "}
              <button
                disabled={data?.length === 0 ? true : false}
                className={
                  data?.length === 0
                    ? "btn single-card-button me-6 bg-gray-500"
                    : "addToCartButton btn single-card-button me-6 bg-gradient-to-r from-cyan-500 to-blue-500"
                }
              >
                Checkout
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
