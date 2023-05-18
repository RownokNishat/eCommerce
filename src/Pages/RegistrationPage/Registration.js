import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import signupImage from "../../Assests/Images/signup.png";

const Registration = () => {
  const [state, setState] = useState({
    isLoading: false,
    formData: {
      email: "",
      username: "",
      password: "",
      name: {
        firstname: "",
        lastname: "",
      },
      address: {
        city: "",
        street: "",
        number: "",
        zipcode: "",
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
      },
      phone: "",
    },
  });

  const handleRegistrationInput = (e) => {
    e.preventDefault();
    const formData = state.formData;
    const value = e.target.value;
    const inputname = e.target.name;
    const name = state.formData.name;
    const address = state.formData.address;
    if (inputname == "firstname" || inputname == "lastname") {
      setState({
        ...state,
        formData: { ...formData, name: { ...name, [inputname]: value } },
      });
    } else if (
      inputname == "city" ||
      inputname == "street" ||
      inputname == "number" ||
      inputname == "zipcode"
    ) {
      setState({
        ...state,
        formData: { ...formData, address: { ...address, [inputname]: value } },
      });
    } else {
      setState({ ...state, formData: { ...formData, [inputname]: value } });
    }
    console.log(state);
  };
  const handleRegistration = (e) => {
    e.preventDefault();
    axios
      .post("https://fakestoreapi.com/users", state.formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <img style={{ height: "520px" }} src={signupImage} alt="" />
          </div>

          <div className="card flex-shrink-1 w-full max-w-lg shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Email</span>
                  </label>
                  <input
                    onChange={(e) => handleRegistrationInput(e)}
                    name="email"
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">UserName</span>
                  </label>
                  <input
                    onChange={(e) => handleRegistrationInput(e)}
                    name="username"
                    type="text"
                    placeholder="user name"
                    className="input input-bordered"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">FirstName</span>
                  </label>
                  <input
                    onChange={(e) => handleRegistrationInput(e)}
                    name="firstname"
                    type="text"
                    placeholder="firstName"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">LastName</span>
                  </label>
                  <input
                    onChange={(e) => handleRegistrationInput(e)}
                    name="lastname"
                    type="text"
                    placeholder="lastName"
                    className="input input-bordered"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Password</span>
                  </label>
                  <input
                    onChange={(e) => handleRegistrationInput(e)}
                    name="password"
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Phone Number</span>
                  </label>
                  <input
                    onChange={(e) => handleRegistrationInput(e)}
                    name="phone"
                    type="text"
                    placeholder="phone number"
                    className="input input-bordered"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">City</span>
                  </label>
                  <input
                    onChange={(e) => handleRegistrationInput(e)}
                    name="city"
                    type="text"
                    placeholder="city"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Street</span>
                  </label>
                  <input
                    onChange={(e) => handleRegistrationInput(e)}
                    name="street"
                    type="text"
                    placeholder="street"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Number</span>
                  </label>
                  <input
                    onChange={(e) => handleRegistrationInput(e)}
                    name="number"
                    type="text"
                    placeholder="number"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Zip Code</span>
                  </label>
                  <input
                    onChange={(e) => handleRegistrationInput(e)}
                    name="zipcode"
                    type="text"
                    placeholder="zip code"
                    className="input input-bordered"
                  />
                </div>
              </div>

              <div className="form-control mt-6">
                <button
                  onClick={handleRegistration}
                  className="btn bg-gradient-to-r from-violet-500 to-fuchsia-500"
                >
                  Sign Up
                </button>
              </div>
              <div className="flex justify-center">
                <button>
                  Already Have An Account?
                  <Link to="/loginPage">
                    <span className="text-blue-900 font-bold">Login</span>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Registration;
