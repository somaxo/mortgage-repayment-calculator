import React from "react";
import empty from "../assets/images/empty.svg";

const ResultCard = () => {
  return (
    <div className="bg-[hsl(202,55%,16%)] md:rounded-bl-[60px] md:rounded-br-xl md:rounded-tr-xl  md:min-h-[30.1rem] ">
      <div className="result-box flex flex-col justify-center items-center ">
        <img src={empty} alt="Result calculator" />
        <h2 className="font-semibold text-lg text-white w-[50%] text-center md:w-[100%]">Results shown here</h2>
        <p className="text-[hsl(200,26%,54%)] w-[80%] text-center md:w-[100%] ">
          Complete the form and click "calculate repayments" to see what your
          monthly repayments would be.
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
