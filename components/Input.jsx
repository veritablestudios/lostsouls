import { useContext } from "react";
import { NFTContext } from "../context/NFTContext";
const Input = ({ inputType, title, placeholder, handleClick }) => {
  const { nftCurrency } = useContext(NFTContext);
  return (
    <div className="mt-10 w-full">
      <p className="font-poppins text-white font-semibold text-xl">{title}</p>
      {inputType === "number" ? (
        <div className="hvr-box-shadow-inset flexBetween flex-row bg-neutral-800  rounded-lg w-full outline-none font-poppins text-white text-base mt-4 px-4 py-3">
          <input
            type="number"
            className="flex w-full bg-neutral-800 outline-none"
            placeholder={placeholder}
            onChange={handleClick}
            step="0.001"
          />
          <p className="font-poppins text-white font-semibold text-xl">
            {nftCurrency}
          </p>
        </div>
      ) : inputType === "textarea" ? (
        <textarea
          rows={10}
          className="hvr-box-shadow-inset bg-neutral-800 rounded-lg w-full font-poppins text-white text-base mt-4 px-4 py-3 outline-none"
          placeholder={placeholder}
          onChange={handleClick}
        />
      ) : (
        <input
          className="hvr-box-shadow-inset bg-neutral-800 rounded-lg w-full font-poppins text-white text-base mt-4 px-4 py-3 outline-none"
          placeholder={placeholder}
          onChange={handleClick}
        />
      )}
    </div>
  );
};

export default Input;
