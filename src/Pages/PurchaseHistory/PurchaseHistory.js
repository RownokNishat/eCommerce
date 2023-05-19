import axios from "axios";
import React, { useEffect, useState } from "react";

const PurchaseHistory = () => {
  const [previousDatas, setpreviousDatas] = useState(null);
  const [productData, setProductData] = useState([]);
  const [finalData, setfinalData] = useState([]);

  useEffect(() => {
    let arr = [];
    finalData &&
      finalData?.map((f, i) => {
        if (arr.length == 0) {
          let singleObj = {
            category: f?.data?.category,
            price: f?.data?.price * f?.quantity,
          };

          arr.push(singleObj);
        } else {
          let count = 0;
          let findIndex = -1;
          arr?.map((ar, index) => {
            if (ar.category === f?.data?.category) {
              count += 1;
              findIndex = index;
            }
          });
          if (count === 0) {
            let singleObj = {
              category: f?.data?.category,
              price: f?.data?.price * f?.quantity,
            };

            arr.push(singleObj);
          } else {
            let price = arr[findIndex]?.price;
            arr[findIndex].price = price + f?.data?.price * f?.quantity;
          }
        }
      });
    console.log(finalData);
    console.log(arr);
  }, [finalData]);

  useEffect(() => {
    let arr = [];
    productData &&
      productData?.map((p, index) => {
        let mergeObject = {
          ...productData[index],
          ...previousDatas[index],
        };
        arr.push(mergeObject);
      });

    setfinalData(arr);
  }, [productData]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/carts/user/3")
      .then(function (response) {
        getPurchaseHistory(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getPurchaseHistory = async (data) => {
    const array = [];
    data.map((d) => {
      d.products.map((p) => {
        array.push(p);
      });
    });
    setpreviousDatas(array);
    const requestArray = await Promise.all(
      array?.map((arr) => {
        return axios.get(`https://fakestoreapi.com/products/${arr?.productId}`);
      })
    );

    setProductData(requestArray);
  };

  return <div></div>;
};

export default PurchaseHistory;
