import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { NFTContext } from "../context/NFTContext";

import images from "../assets";
import { shortenAddress } from "../utils/shortenAddress";
const NFTCard = ({ nft, onProfilePage }) => {
  const { nftCurrency } = useContext(NFTContext);
  return (
    <Link href={{ pathname: "/nft-details", query: nft }}>
      <div className="ease-in-out duration-300 transition-transform transform-gpu hover:-translate-y-1 hover:shadow-2xl flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 rounded-3xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
        <div className="relative w-full h-52 sm:h-36 minmd:h-60 minlg:h-300 rounded-3xl overflow-hidden">
          <Image
            src={nft.image || images[`nft${nft.i}`]}
            alt={`nft${nft.i}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <p className="font-poppins text-white font-semibold text-sm minlg:text-xl lowercase">
            {nft.name}
          </p>
          <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
            <p className="font-poppins text-white font-semibold text-xs minlg:text-lg">
              {nftCurrency}
              {nft.price}
            </p>
            <p className="font-poppins text-white font-semibold text-xs minlg:text-lg">
              {shortenAddress(onProfilePage ? nft.owner : nft.seller)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
