import React from "react";
import { Outlet } from "react-router-dom";
import Products from "../../Component/Products/Products";
import SearchProducts from "../../Component/SearchProducts/SearchProducts";

const Landing = () => {
  return (
    <div>
      <SearchProducts></SearchProducts>
      <Products></Products>
    </div>
  );
};

export default Landing;
