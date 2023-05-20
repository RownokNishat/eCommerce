import React from "react";
import { Outlet } from "react-router-dom";
import Products from "../../Component/Products/Products";

const Landing = () => {
  return (
    <div>
      <Products></Products>
    </div>
  );
};

export default Landing;
