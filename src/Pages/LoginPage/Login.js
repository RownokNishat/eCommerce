import axios from "axios";
import jwt_decode from "jwt-decode";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useState } from "react";
import Success from "../../Component/Request/Success";
import Error from "../../Component/Request/Error";
import { Link, json, useNavigate } from "react-router-dom";
import loginImage from "../../Assests/Images/login.webp";
import Loader from "react-loader-spinner";
import { BallTriangle } from "react-loader-spinner";
import { AuthContext } from "../../SharedComponent/Authprovider/Authprovider";
import Loading from "../../Component/Loading/Loading";

const Login = () => {
  const [state, setState] = useState({
    isLoading: false,
    formData: {
      username: "",
      password: "",
    },
  });
  const { setUser, toggle, settoggle } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLoginInput = (e) => {
    e.preventDefault();
    const formData = state.formData;
    const value = e.target.value;
    const name = e.target.name;
    setState({ ...state, formData: { ...formData, [name]: value } });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(state.formData);
    setState({ ...state, isLoading: true });
    axios
      .post("https://fakestoreapi.com/auth/login", state.formData)
      .then(function (response) {
        console.log("response", response);
        if (response?.status == 200) {
          toast.success("Login Successful");
          const jwtData = jwt_decode(response.data.token);
          console.log("jwtdata", jwtData);
          if (jwtData.sub === 1) {
            localStorage.setItem(
              "userid",
              JSON.stringify({ id: jwtData.sub, role: "admin" })
            );
          } else {
            localStorage.setItem(
              "userid",
              JSON.stringify({ id: jwtData.sub, role: "user" })
            );
          }
          setUser(jwtData);
          setState({ ...state, isLoading: false });
          settoggle(!toggle);
          navigate("/");
        }
      })
      .catch(function (error) {
        if (error?.response?.status == 401) {
          toast.error(error.response.data);
        }

        console.log(error);
      });
    setState({ ...state, isLoading: false });
  };
  return (
    <div>
      {state?.isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading></Loading>
        </div>
      ) : (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row ">
            <div className="text-center lg:text-left">
              <img className="rounded" src={loginImage} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body">
                <br />

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl font-bold">
                      User Name
                    </span>
                  </label>
                  <input
                    name="username"
                    onChange={(e) => handleLoginInput(e)}
                    type="text"
                    placeholder="user Name"
                    className="input input-bordered"
                  />
                </div>
                <br />
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl font-bold">
                      Password
                    </span>
                  </label>
                  <input
                    name="password"
                    onChange={(e) => handleLoginInput(e)}
                    type="text"
                    placeholder="password"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control mt-6">
                  <button
                    onClick={handleLogin}
                    className="btn bg-gradient-to-r from-violet-500 to-fuchsia-500"
                  >
                    Login
                  </button>
                </div>
                <div className="flex justify-center">
                  <button>
                    Need An Account?
                    <Link to="/registrationPage">
                      <span className="text-blue-900 font-bold">SignUp</span>{" "}
                    </Link>
                  </button>
                </div>
                <br />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
