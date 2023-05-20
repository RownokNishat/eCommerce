import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../SharedComponent/Authprovider/Authprovider";
import axios from "axios";
import profilePic from "../../Assests/Images/userprofilepic.webp";

import "./Profile.css";
import Modal from "../../Component/Modal/Modal";
import UpdateProfile from "../../Component/UpdateProfile/UpdateProfile";
const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/users/2`)
      .then(function (response) {
        setUserData(response.data);
      })
      .then(function (error) {
        console.log(error);
      });
    // axios
    //   .get(`https://fakestoreapi.com/users/${user?.sub}`)
    //   .then(function (response) {
    //     setUserData(response.data);
    //   })
    //   .then(function (error) {
    //     console.log(error);
    //   });
  }, [user]);

  const handleModal = (d) => {
    setIsOpen(true);
  };

  return (
    <div>
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          {" "}
          <UpdateProfile userData={userData}></UpdateProfile>
        </Modal>
      )}
      <div className="mx-auto lg:w-2/5 md:w-4/5 sm:w-100">
        <div className="profilePicture mt-2">
          <img src={profilePic} alt="profile picture"></img>
        </div>
        <table className="table w-full">
          <tbody>
            <tr>
              <td>
                <h1 className="text-start mt-1 font-bold  lg:text-base sm:text-sm">
                  User Name
                </h1>
              </td>
              <td>
                {" "}
                <p>{userData?.username}</p>{" "}
              </td>
            </tr>

            <tr>
              <td>
                {" "}
                <h1 className="text-start mt-1 font-bold  lg:text-base sm:text-sm">
                  Email
                </h1>
              </td>
              <td>
                {" "}
                <p>{userData?.email}</p>
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <h1 className="text-start mt-1 font-bold  lg:text-base sm:text-sm">
                  User FullName
                </h1>
              </td>
              <td>
                {" "}
                <p>
                  {userData?.name?.firstname}
                  {userData?.name?.lastname}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <h1 className="text-start mt-1 font-bold  lg:text-base sm:text-sm">
                  Address
                </h1>
              </td>
              <td>
                {" "}
                <p>
                  {userData?.address?.city}
                  {userData?.address?.street}
                  {userData?.address?.number}
                  {userData?.address?.zipcode}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <h1 className="text-start  mt-1 font-bold  lg:text-base sm:text-sm">
                  Phone Number
                </h1>
              </td>
              <td>
                {" "}
                <p>{userData?.phone}</p>
              </td>
            </tr>
          </tbody>
        </table>

        <button
          onClick={() => {
            handleModal(userData);
          }}
          className="btn single-card-button me-6 bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
