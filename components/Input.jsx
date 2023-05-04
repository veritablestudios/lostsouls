import { useContext } from "react";
import { NFTContext } from "../context/NFTContext";
import { motion } from "framer-motion";
const Input = ({ inputType, title, placeholder, handleClick }) => {
  const { nftCurrency } = useContext(NFTContext);
  return (
    <div className="mt-10 w-full">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
        {title}
      </p>
      {inputType === "number" ? (
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.5, type: "tween" }}
          className="flexBetween flex-row dark:bg-nft-black-1 bg-white dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
        >
          <input
            type="number"
            className="flex w-full dark:bg-nft-black-1 bg-white outline-none"
            placeholder={placeholder}
            onChange={handleClick}
          />
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            {nftCurrency}
          </p>
        </motion.div>
      ) : inputType === "textarea" ? (
        <motion.textarea
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.5, type: "tween" }}
          rows={10}
          className="dark:bg-nft-black-1 bg-white dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          placeholder={placeholder}
          onChange={handleClick}
        />
      ) : (
        <motion.input
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.5, type: "tween" }}
          className="dark:bg-nft-black-1 bg-white dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          placeholder={placeholder}
          onChange={handleClick}
        />
      )}
    </div>
  );
};

export default Input;
