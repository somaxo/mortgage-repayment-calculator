import React from "react";


const ResetButton = ({ onReset }) => {
  return (
    <button
      type="button"
      onClick={onReset}
      className="text-sm reset-btn text-[hsl(200,24%,40%)] underline cursor-pointer "
    >
      Clear All
    </button>
  );
};

export default ResetButton;
