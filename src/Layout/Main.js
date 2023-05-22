import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponent/NavBar/Navbar";
import Footer from "../SharedComponent/Footer/Footer";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
