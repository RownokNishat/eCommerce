import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import signupImage from "../../Assests/Images/signup.png";
import { AuthContext } from "../../SharedComponent/Authprovider/Authprovider";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

const UpdateProfile = ({ userData }) => {
  const { toggle, settoggle } = useContext(AuthContext);
  const [state, setState] = useState({
    isLoading: false,
    formData: {
      email: userData?.email,
      username: userData?.username,
      password: userData?.password,
      name: {
        firstname: userData?.name?.firstname,
        lastname: userData?.name?.lastname,
      },
      address: {
        city: userData?.address?.city,
        street: userData?.address?.street,
        number: userData?.address?.number,
        zipcode: userData?.address?.zipcode,
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
      },
      phone: userData?.phone,
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
  };

  console.log(state?.formData);
  const handleRegistration = (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("userid"));
    setState({ ...state, isLoading: true });
    axios
      .put(`https://fakestoreapi.com/users/${userId.id}`, state.formData)
      .then(function (response) {
        setState({ ...state, isLoading: false });
        toast.success("User data updated");
        console.log(response);
        localStorage.setItem("userdata", JSON.stringify(response.data));
        settoggle(!toggle);
      })
      .catch(function (error) {
        setState({ ...state, isLoading: false });
        toast.error("Fail to update user data");
        console.log(error);
      });
  };

  return (
    <>
      {state?.isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="card w-full mx-auto max-w-lg shadow-2xl bg-base-100">
          {state?.formData?.username && (
            <div className="card-body">
              <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">UserName</span>
                  </label>
                  <input
                    onChange={(e) => handleRegistrationInput(e)}
                    name="username"
                    type="text"
                    placeholder={state?.formdata?.username}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">FirstName</span>
                  </label>
                  <input
                    onChange={(e) => handleRegistrationInput(e)}
                    name="firstname"
                    type="text"
                    value={state?.formdata?.name?.firstname}
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
                    value={state?.formdata?.name?.lastname}
                    className="input input-bordered"
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Email</span>
                  </label>
                  <input
                    onChange={(e) => handleRegistrationInput(e)}
                    name="email"
                    type="text"
                    value={state?.formdata?.email}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Password</span>
                  </label>
                  <input
                    onChange={(e) => handleRegistrationInput(e)}
                    name="password"
                    type="password"
                    value={state?.formdata?.password}
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
                    value={state?.formdata?.phone}
                    className="input input-bordered"
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-1">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">City</span>
                  </label>
                  <input
                    onChange={(e) => handleRegistrationInput(e)}
                    name="city"
                    type="text"
                    value={state?.formdata?.address?.city}
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
                    value={state?.formdata?.address?.street}
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
                    value={state?.formdata?.address?.number}
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
                    value={state?.formdata?.address?.zipcode}
                    className="input input-bordered"
                  />
                </div>
              </div>

              <div className="form-control mt-2">
                <button
                  onClick={handleRegistration}
                  className="btn bg-gradient-to-r from-violet-500 to-fuchsia-500"
                >
                  Update Profile
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
