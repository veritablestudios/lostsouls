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
      <div className="hover:shadow-inner hover:shadow-neutral-950 ease-in-out duration-300 p-3 flex-1 flexCenter bg-neutral-800 rounded-md">
        <Image src={images.search} alt="search" width={20} height={20} />
        <input
          type="text"
          placeholder="search soul here..."
          className="custom-placeholder bg-neutral-800 mx-4 w-full text-white font-normal text-xs outline-none font-poppins"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>
      <div
        onClick={() => setToggle((prevToggle) => !prevToggle)}
        className="px-6 relative flexBetween ml-4 sm:ml-0 sm:mt-2 min-w-190 cursor-pointer bg-neutral-800 rounded-md py-3 hover:shadow-inner hover:shadow-neutral-950 ease-in-out duration-300"
      >
        <p className="font-poppins text-white font-normal text-xs">
          {activeSelect}
        </p>
        <Image src={images.arrow} width={15} height={15} alt="arrow" />
        {toggle && (
          <div className="absolute top-full left-0 right-0 w-full mt-3 bg-neutral-800 px-6 rounded-md py-3 z-10">
            {[
              "recently added",
              "price (low to high)",
              "price (high to low)",
            ].map((item) => (
              <p
                onClick={() => setActiveSelect(item)}
                key={item}
                className="font-poppins text-white font-normal text-xs my-4 cursor-pointer ease-in-out duration-300 hover:scale-110 hover:rotate-3 flex flex-col"
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
