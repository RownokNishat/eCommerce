import axios from "axios";
import React, { useEffect } from "react";

const PurchaseHistory = () => {
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/carts/user/2")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return <div></div>;
};

export default PurchaseHistory;
