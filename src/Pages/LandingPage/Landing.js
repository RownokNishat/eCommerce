import React from "react";
import Banner from "../../Component/Banner/Banner";
import Static from "../../Component/Static/Static";
import Products from "../../Component/Products/Products";
import SearchProducts from "../../Component/SearchProducts/SearchProducts";
import CategoryWiseProduct from "../../Component/CategoryWiseProduct/CategoryWiseProduct";

const Landing = () => {
  return (
    <div>
      <Banner></Banner>
      <Static></Static>
      <SearchProducts></SearchProducts>
      <Products></Products>
      <CategoryWiseProduct></CategoryWiseProduct>
    </div>
  );
};

export default Landing;
