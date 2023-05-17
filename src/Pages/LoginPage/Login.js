import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import Success from "../../Component/Request/Success";
import Error from "../../Component/Request/Error";
import { Link } from "react-router-dom";
import loginImage from "../../Assests/Images/login.webp";

const Login = () => {
  const [state, setState] = useState({
    isLoading: false,
    formData: {
      username: "",
      password: "",
    },
  });

  const handleLoginInput = (e) => {
    e.preventDefault();
    const formData = state.formData;
    const value = e.target.value;
    const name = e.target.name;
    setState({ ...state, formData: { ...formData, [name]: value } });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    // setState({ ...state, isLoading: true });
    axios
      .post("https://fakestoreapi.com/auth/login", state.formData)
      .then(function (response) {
        console.log(response);
        setState({ ...state, isLoading: false });
        if (response.status == 200) {
          //   return <Success message="Login Successfully"></Success>;
        }
        toast("Login Successfull", "Login");
      })
      .catch(function (error) {
        if (error.response.status == 401) {
        }
        toast("🦄 Wow so easy!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(error);
        setState({ ...state, isLoading: false });
      });
  };
  return (
    <div>
      {state.isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
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
                    Need An Account?<Link to="/registrationPage"> SignUp</Link>
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
