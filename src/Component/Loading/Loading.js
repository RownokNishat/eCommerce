import React from "react";
import { BallTriangle } from "react-loader-spinner";

const Loading = () => {
  return (
    <div>
      <div className="w-full min-h-screen flex justify-center align-middle">
        <BallTriangle color="#00BFFF" height={100} width={100} />
      </div>
    </div>
  );
};

export default Loading;
