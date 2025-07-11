import React, { useState } from "react";
import Button from "../components/Button";
import ResultCard from "../components/ResultCard";
import ResetButton from "../components/ResetButton";
import CalculatedResult from "./CalculatedResult";


const MortgageForm = () => {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [mortgageType, setMortgageType] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const [errors, setErrors] = useState({
    amount: "",
    term: "",
    rate: "",
    mortgageType: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { amount: "", term: "", rate: "", mortgageType: "" };

    if (!amount) newErrors.amount = "This field is required";
    if (!term) newErrors.term = "This field is required";
    if (!rate) newErrors.rate = "This field is required";
    if (!mortgageType) newErrors.mortgageType = "This field is required";

    setErrors(newErrors);

    // Only proceed if no errors
    const noErrors = Object.values(newErrors).every((error) => error === "");
    if (!noErrors) return;

    const numericAmount = parseFloat(amount);
    const numericRate = parseFloat(rate);
    const numericTerm = parseFloat(term);

    if (numericAmount <= 0 || numericTerm <= 0 || numericRate <= 0) {
      setErrors({
        ...newErrors,
        amount: numericAmount <= 0 ? "Enter a valid amount" : "",
        term: numericTerm <= 0 ? "Enter a valid term" : "",
        rate: numericRate <= 0 ? "Enter a valid rate" : "",
      });
      return;
    }

    // calculation for mortgage repayment
    const monthlyRate = numericRate / 100 / 12;
    const totalPayments = numericTerm * 12;

    let monthlyPayment;

    if (mortgageType === "repayment") {
      // standard amortized loan formula
      const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalPayments);
      const denominator = Math.pow(1 + monthlyRate, totalPayments) - 1;
      monthlyPayment = numericAmount * (numerator / denominator);
    } else if (mortgageType === "interest-only") {
      // only interest paid monthly
      monthlyPayment = numericAmount * monthlyRate;
    }

    // code to round to 2 decimal places
    monthlyPayment = parseFloat(monthlyPayment.toFixed(2));

    console.log("Monthly Payment:", monthlyPayment);

    console.log({ numericAmount, numericTerm, numericRate });

    setShowResult(true);

    let totalRepayment;

    if (mortgageType === "repayment") {
      totalRepayment = monthlyPayment * totalPayments;
    } else if (mortgageType === "interest-only") {
      totalRepayment = monthlyPayment * totalPayments + numericAmount;
    }

    // Round total repayment
    totalRepayment = parseFloat(totalRepayment.toFixed(2));

    // Set both results
    setResult({
      monthlyPayment,
      totalRepayment,
    });
  };

  const handleReset = () => {
    setAmount("");
    setTerm("");
    setRate("");
    setMortgageType("");
    setErrors({
      amount: "",
      term: "",
      rate: "",
      mortgageType: "",
    });
    setShowResult(false); // hide calculated resut
    setResult(null);
  };

  return (
    <div className="  ">
      <form
        onSubmit={handleSubmit}
        className=" md:rounded-xl md:gap-5 md:bg-white"
      >
        <div className="form-content">
          {/* Heading */}
          <div className="heading md:grid md:grid-cols-2 ">
            <h1 className="font-bold text-[hsl(202,55%,16%)]">
              Mortgage Calculator
            </h1>
            <ResetButton onReset={handleReset} />
          </div>
          {/* Mortgage Amount */}
          <div className="flex flex-col input-field ">
            <label htmlFor="amount" className="title">
              Mortgage Amount
            </label>
            <div className="flex relative  focus-within:[&>span]:bg-[hsl(61,70%,75%)] focus-within:[&>span]:text-black">
              <input
                type="number"
                id="amount"
                value={amount}
                onFocus={() => setFocusedInput("amount")}
                onBlur={() => setFocusedInput(null)}
                onChange={(e) => setAmount(e.target.value)}
                className={`mortgage-amount border-[1.5px] ${
                  errors.amount ? "border-red-500" : "border-gray-300"
                } focus:border-[hsl(61,70%,75%)] outline-none cursor-pointer hover:border-[hsl(61,70%,75%)] rounded-sm z-10 h-10 w-[100%]`}
              />
              <span
                className={`absolute left-0 ${
                  errors.amount
                    ? "bg-red-500 text-white"
                    : "bg-[hsl(202,86%,94%)] text-gray-500"
                } bg-[hsl(202,86%,94%)]  w-[12%] text-center text-sm text-gray-500 font-semibold inset-0 z-0 rounded-tl-sm rounded-bl-sm`}
              >
                $
              </span>
            </div>
            {errors.amount && (
              <p className="text-red-500 text-sm ">{errors.amount}</p>
            )}
          </div>
          {/* Mortgage Term Mobile*/}
          <div className="title-mt-ir md:hidden">
            <label htmlFor="term-mobile" className="">
              Mortgage Term
            </label>
            <div className="flex relative input-field focus-within:[&>span]:bg-[hsl(61,70%,75%)] focus-within:[&>span]:text-black">
              <input
                type="number"
                id="term-mobile"
                value={term}
                onFocus={() => setFocusedInput("term")}
                onBlur={() => setFocusedInput(null)}
                onChange={(e) => setTerm(e.target.value)}
                className={`border-[1.5px] ${
                  errors.term ? "border-red-500" : "border-gray-300"
                } border-gray-300 focus:border-[hsl(61,70%,75%)] outline-none cursor-pointer hover:border-[hsl(61,70%,75%)] z-10 rounded-sm h-10 w-[100%]`}
              />
              <span
                className={`absolute left-[82%]  bg-[hsl(202,86%,94%)] h-10 w-[17.6%] text-center font-semibold text-gray-500 text-sm z-0 rounded-tr-sm rounded-br-sm ${
                  errors.term
                    ? "bg-red-500 text-white"
                    : "bg-[hsl(202,86%,94%)] text-gray-500"
                } `}
              >
                years
              </span>
            </div>
            {errors.term && (
              <p className="term-error text-red-500 text-sm ">{errors.term}</p>
            )}

            <label htmlFor="rate-mobile" className="">
              Interest Rate
            </label>
            <div className="flex relative input-field focus-within:[&>span]:bg-[hsl(61,70%,75%)] focus-within:[&>span]:text-black">
              <input
                type="number"
                id="rate-mobile"
                value={rate}
                onFocus={() => setFocusedInput("rate")}
                onBlur={() => setFocusedInput(null)}
                onChange={(e) => setRate(e.target.value)}
                className={`border-[1.5px] ${
                  errors.rate ? "border-red-500" : "border-gray-300"
                } border-gray-300 focus:border-[hsl(61,70%,75%)] outline-none cursor-pointer  hover:border-[hsl(61,70%,75%)] rounded-sm w-[100%] h-10 z-10`}
              />
              <span
                className={`absolute left-[88%] bg-[hsl(202,86%,94%)] h-10 w-[12%] z-0 text-sm font-semibold text-gray-500 text-center rounded-tr-sm rounded-br-sm ${
                  errors.rate
                    ? "bg-red-500 text-white"
                    : "bg-[hsl(202,86%,94%)] text-gray-500"
                }`}
              >
                %
              </span>
            </div>
            {errors.rate && (
              <p className="rate-error text-red-500 text-sm ">{errors.rate}</p>
            )}
          </div>

          {/* Mortgage Term Desktop */}
          <div className="title-mt-ir hidden md:grid md:grid-cols-2 md:gap-5">
            <div>
              <div className=" flex flex-col relative input-field z-10 focus-within:[&>span]:bg-[hsl(61,70%,75%)] focus-within:[&>span]:text-black">
                <label htmlFor="term-desktop" className="">
                  Mortgage Term
                </label>
                <input
                  type="number"
                  id="term-desktop"
                  value={term}
                  onFocus={() => setFocusedInput("term")}
                  onBlur={() => setFocusedInput(null)}
                  onChange={(e) => setTerm(e.target.value)}
                  className={`border-[1.5px] ${
                    errors.term ? "border-red-500" : "border-gray-300"
                  } border-gray-300 focus:border-[hsl(61,70%,75%)] outline-none cursor-pointer hover:border-[hsl(61,70%,75%)] z-10 rounded-sm h-10 w-[100%]`}
                />
                <span
                  className={`absolute left-[65%] top-[42%] bg-[hsl(202,86%,94%)] w-[35%] text-center font-semibold text-gray-500 text-sm inset-0 z-0 rounded-tr-sm rounded-br-sm ${
                    errors.rate
                      ? "bg-red-500 text-white"
                      : "bg-[hsl(202,86%,94%)] text-gray-500"
                  }`}
                >
                  years
                </span>
              </div>

              {errors.term && (
                <p className="desktop-term-error text-red-500 text-sm ">
                  {errors.term}
                </p>
              )}
            </div>

            <div>
              <div className="flex flex-col relative input-field z-10 focus-within:[&>span]:bg-[hsl(61,70%,75%)] focus-within:[&>span]:text-black">
                <label htmlFor="rate-desktop" className="">
                  Interest Rate
                </label>
                <input
                  type="number"
                  id="rate-desktop"
                  value={rate}
                  onFocus={() => setFocusedInput("rate")}
                  onBlur={() => setFocusedInput(null)}
                  onChange={(e) => setRate(e.target.value)}
                  className={`border-[1.5px] ${
                    errors.rate ? "border-red-500" : "border-gray-300"
                  } border-gray-300 focus:border-[hsl(61,70%,75%)] outline-none cursor-pointer hover:border-[hsl(61,70%,75%)] rounded-sm w-[100%] h-10 z-10`}
                />
                <span
                  className={`absolute left-[73.5%] top-[42%] bg-[hsl(202,86%,94%)] w-[26%] text-sm font-semibold text-gray-500 text-center inset-0 z-0 rounded-tr-sm rounded-br-sm ${
                    errors.rate
                      ? "bg-red-500 text-white"
                      : "bg-[hsl(202,86%,94%)] text-gray-500"
                  }`}
                >
                  %
                </span>
              </div>

              {errors.rate && (
                <p className="desktop-rate-error text-red-500 text-sm ">
                  {errors.rate}
                </p>
              )}
            </div>
          </div>
          {/* Mortgage Type*/}
          <div>
            <p className="title">Mortgage Type</p>
            <div className="flex flex-col">
              <label
                htmlFor="repayment"
                className="input-field mortgage-type border-[1.5px] border-gray-300 cursor-pointer hover:border-[hsl(61,70%,75%)] h-10 rounded-sm"
              >
                <input
                  type="radio"
                  id="repayment"
                  value="repayment"
                  checked={mortgageType === "repayment"}
                  onChange={(e) => setMortgageType(e.target.value)}
                  name="paymentType"
                />
                Repayment
              </label>
              <label
                htmlFor="interest-only"
                className="input-field mortgage-type border-[1.5px] border-gray-300 cursor-pointer hover:border-[hsl(61,70%,75%)] h-10 rounded-sm justify-center"
              >
                <input
                  type="radio"
                  id="interest-only"
                  value="interest-only"
                  checked={mortgageType === "interest-only"}
                  onChange={(e) => setMortgageType(e.target.value)}
                  name="paymentType"
                />
                Interest Only
              </label>
            </div>
            {errors.mortgageType && (
              <p className="type-error text-red-500 text-sm ">
                {errors.mortgageType}
              </p>
            )}
          </div>
          {/* Button */}
          <Button />
        </div>
        {/* Desktop result card(s) */}
        <div className="hidden md:block ">
          {showResult ? <CalculatedResult result={result} /> : <ResultCard />}
        </div>
      </form>
      {/* Mobile result card(s) */}
      <div className="md:hidden">
        {showResult ? <CalculatedResult result={result} /> : <ResultCard />}
      </div>
    </div>
  );
};

export default MortgageForm;
