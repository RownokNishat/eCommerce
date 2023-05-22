import React from "react";
import Banner from "../../Component/Banner/Banner";
import Static from "../../Component/Static/Static";
import Products from "../../Component/Products/Products";
import SearchProducts from "../../Component/SearchProducts/SearchProducts";

const Landing = () => {
  return (
    <div>
      <Banner></Banner>
      <Static></Static>
      <SearchProducts></SearchProducts>
      <Products></Products>
    </div>
  );
};

export default Landing;
