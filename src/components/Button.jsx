import React from 'react'
import calculatorIcon from '../assets/images/calculator.svg'

const Button = () => {
  return (
    <button
      type="submit"
      className="flex flex-row justify-center gap-2 h-10 w-[100%] bg-[hsl(61,70%,52%)] rounded-full cursor-pointer hover:bg-[hsl(61,70%,75%)] md:w-[70%]"
    >
      <img src={calculatorIcon} className="w-6" alt="calculator icon" />
      <span className="text-sm ">Calculate Repayments</span>
    </button>
  );
}

export default Button