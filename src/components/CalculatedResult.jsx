import React from "react";

const CalculatedResult = ({result}) => {
  return (
    <div className=" flex flex-col justify-center items-center calc-result bg-[hsl(202,55%,16%)] text-white md:rounded-bl-[60px] md:rounded-br-xl md:rounded-tr-xl md:h-[28.1rem] w- ">
      <div>
        <h3 className="font-bold text-2xl">Your results</h3>
        <p className="calc-result-sub-p text-[hsl(200,26%,54%)] ">
          Your results are shown below based on the information you provided. To
          adjust the results, edit the form and click "calculate repayments"
          again.
        </p>
      </div>
      <div className="small-calc-result bg-[hsl(202,55%,8%)] w-[100%] rounded-md border-t-3 border-t-[hsl(61,70%,52%)]">
        <p className="small-calc-result-text text-[hsl(200,26%,54%)]">
          Your monthly repayments
        </p>
        <p className="font-bold text-4xl text-[hsl(61,70%,52%,0.9)]">
          {result?.monthlyPayment}
        </p>
        <hr />
        <p className="small-calc-result-text text-[hsl(200,26%,54%)]">
          Total you'll repay over the term
        </p>
        <p className="font-bold text-2xl">
          {result?.totalRepayment}
        </p>
      </div>
    </div>
  );
};

export default CalculatedResult;
