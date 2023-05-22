import React, { useContext, useEffect, useState } from "react";
import navlogo from "../../Assests/Images/navlogo.png";
import userprofile from "../../Assests/Images/userprofile.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Authprovider/Authprovider";
import { home } from "../SVGicons/home";
import { cart } from "../SVGicons/cart";
import { search } from "../SVGicons/search";

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
          <Link to="/">{home}</Link>
          <Link to="/search">{search}</Link>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator ">
                {cart}
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

              {LocalStorageuser?.role == "admin" ? (
                <li>
                  <Link to="/adminPage">Admin</Link>
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
