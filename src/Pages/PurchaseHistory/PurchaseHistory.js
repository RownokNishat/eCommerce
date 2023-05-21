import axios from "axios";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { toast } from "react-toastify";
import Loading from "../../Component/Loading/Loading";

const PurchaseHistory = () => {
  const [previousDatas, setpreviousDatas] = useState(null);
  const [productData, setProductData] = useState([]);
  const [finalData, setfinalData] = useState([]);
  const [catagoryData, setCatagoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paidbill, setPaidbill] = useState(null);

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
    setCatagoryData(arr);

    let totalPaidbill = 0;
    arr?.map((a) => {
      totalPaidbill += a.price;
    });

    setPaidbill(totalPaidbill);
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
    const userid = JSON.parse(localStorage.getItem("userid"));
    setIsLoading(true);
    axios
      .get(`https://fakestoreapi.com/carts/user/${userid?.id}`)
      .then(function (response) {
        getPurchaseHistory(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        toast.error("Something wrong try again later");
        setIsLoading(false);
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

  return (
    <div>
      <div className="max-w-screen-lg mx-auto mt-5">
        <h2
          style={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "700",
          }}
        >
          Purchase History
        </h2>
        {isLoading ? (
          <Loading></Loading>
        ) : finalData?.length == 0 ? (
          <div className="text-center  text-4xl text-red-700 font-bold mt-32">
            <h2>NO DATA FOUND</h2>
          </div>
        ) : (
          <>
            <div className="mt-5">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Paid Bill</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalData?.map((d, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>
                            {d?.data?.title.length > 30
                              ? d?.data?.title.slice(0, 30)
                              : d?.data?.title}
                          </td>
                          <td>{d?.data?.category}</td>
                          <td>{d?.data?.price}</td>
                          <td>{d?.quantity}</td>
                          <td>{`${d?.data?.price * d?.quantity}`}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Total Paid</td>
                      <td>{paidbill?.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-5">
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "25px",
                  fontWeight: "700",
                }}
              >
                Category Wise Purchase History
              </h2>
              <div className="overflow-x-auto mt-5">
                <table className="table w-full">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>#</th>

                      <th>Category Name</th>

                      <th>Paid Bill</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catagoryData?.map((d, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{d?.category}</td>

                          <td>{d?.price}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td></td>
                      <td>Total Paid</td>
                      <td>{paidbill?.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
