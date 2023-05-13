import { useState, useEffect } from "react";
import Image from "next/image";
import images from "../assets";
const SearchBar = ({
  activeSelect,
  setActiveSelect,
  handleSearch,
  clearSearch,
}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 1000);
    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search]);

  return (
    <>
      <div className="hvr-glow py-3 flex-1 flexCenter bg-nft-black-2 border border-nft-black-2 px-4 rounded-md">
        <Image src={images.search} alt="search" width={20} height={20} />
        <input
          type="text"
          placeholder="search NFT here..."
          className="custom-placeholder bg-nft-black-2 mx-4 w-full text-white font-normal text-xs outline-none"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>
      <div
        onClick={() => setToggle((prevToggle) => !prevToggle)}
        className="hvr-box-shadow-inset py-3 relative flexBetween ml-4 sm:ml-0 sm:mt-2 min-w-190 cursor-pointer bg-nft-black-2 border border-nft-black-2 px-4 rounded-md"
      >
        <p className="font-poppins text-white font-normal text-xs">
          {activeSelect}
        </p>
        <Image src={images.arrow} width={15} height={15} alt="arrow" />
        {toggle && (
          <div className="absolute top-full left-0 right-0 w-full mt-3 z-10 bg-nft-black-2 border border-nft-black-2 px-4 rounded-md py-3">
            {[
              "recently added",
              "price (low to high)",
              "price (high to low)",
            ].map((item) => (
              <p
                onClick={() => setActiveSelect(item)}
                key={item}
                className="hvr-grow-rotate font-poppins text-white font-normal text-xs my-3 cursor-pointer"
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
