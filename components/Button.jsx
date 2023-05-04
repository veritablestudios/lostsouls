import React from "react";
import { motion } from "framer-motion";
const Button = ({ classStyles, btnName, handleClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5, type: "tween" }}
      className={`nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white ${classStyles}`}
      onClick={handleClick}
    >
      {btnName}
    </motion.button>
  );
};

export default Button;
