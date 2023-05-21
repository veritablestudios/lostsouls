import React from "react";
const Button = ({ classStyles, btnName, handleClick }) => {
  return (
    <button
      className={`shadow-sm hvr-box-shadow-inset nft-gradient-button text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white ${classStyles}`}
      onClick={handleClick}
    >
      {btnName}
    </button>
  );
};

export default Button;
