import React, { useContext, useEffect, useState } from "react";
import navlogo from "../../Assests/Images/navlogo.png";
import userprofile from "../../Assests/Images/userprofile.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Authprovider/Authprovider";

const Navbar = () => {
  const [cartdata, setCartdata] = useState([]);
  const [LocalStorageuser, setLocalStroageuser] = useState([]);
  const [totalPayablePrice, settotalPayablePrice] = useState(0);
  const { user, toggle, settoggle } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartdata(cart);
    const userid = JSON.parse(localStorage.getItem("userid"));
    setLocalStroageuser(userid);

    let totalPayAblePrice = 0;
    cart?.map((singleCart) => {
      totalPayAblePrice += singleCart?.payableprice;
    });
    settotalPayablePrice(totalPayAblePrice);
  }, [toggle, user]);
  return (
    <div>
      <div className="navbar bg-gradient-to-r from-violet-500 to-fuchsia-500 ps-24 pe-24">
        <div className="flex-1 h-14 w-14">
          <img className="h-48 w-48" src={navlogo} alt="" />
        </div>

        <div className="flex-none">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              // className="w-14 h-14 font-bold pe-6"
              className="h-8 w-8 text-5xl "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-5xl"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item text-white">
                  {cartdata?.length}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {cartdata?.length} items
                </span>
                <span className="text-info">
                  Subtotal: {totalPayablePrice}TK
                </span>
                <div className="card-actions">
                  <Link to="/cart" className="btn btn-primary btn-block">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={userprofile} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {LocalStorageuser ? (
                <li>
                  <Link to="/userProfile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
              ) : null}
              {LocalStorageuser ? (
                <li>
                  <Link to="/purchaseHistory">Purchase History</Link>
                </li>
              ) : null}
              {LocalStorageuser ? (
                <li>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      settoggle(!toggle);
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </li>
              ) : null}

              {LocalStorageuser ? null : (
                <li>
                  <Link to="/loginPage">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
