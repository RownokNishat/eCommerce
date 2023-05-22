import React from "react";
import banner from "../../Assests/Images/banner.png";

const Banner = () => {
  return (
    <div className="flex justify-center lg:w-5/6 md:w-full mx-auto">
      <img className="w-full" src={banner} alt="landing page banner" />
    </div>
  );
};

export default Banner;
